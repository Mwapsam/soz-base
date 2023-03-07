class PaymentsController < ApplicationController
  before_action :require_login, only: [:create]

  def create
    handle_payment(current_user.stripe_customer_id, current_user.email, current_user.username)
  end

  def success
    session_id = params[:session_id]
    if session_id.present?
      process_payment(session_id)
    else
      render json: { error: 'No session id provided' }, status: :bad_request
    end
  end

  def confirm_payment
    payment_intent_id = params[:payment_intent_id]
    intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
    intent.confirm
    render json: { success: true }, status: :ok
  rescue Stripe::StripeError => e
    render json: { error: e.message }, status: :bad_request
  end

  private

  def require_login
    unless logged_in?
      customer = Stripe::Customer.create(name: params[:name], email: params[:email])
      handle_payment(customer.id, params[:email], customer.name)
    end
  end

  def handle_payment(customer, receipt_email, shipping_name)
    if @line_items.pluck(:currency).uniq.length > 1
      render json: { message: 'You cannot select products with different currencies in one checkout' }, status: :bad_request
      return
    end

    session_params = {
      customer: customer,
      payment_method_types: ['card'],
      line_items: @line_items.map { |item| item.to_builder(item.orderables[0].quantity).attributes! },
      metadata: {
        user_name: params[:name],
        user_email: params[:email],
        order_id: rand.to_s[2..11],
        line1: params[:line1],
        line2: params[:line2],
        city: params[:city],
        state: params[:state],
        postal_code: params[:postal_code],
        country: params[:country],
        customer: customer
      },
      allow_promotion_codes: true,
      mode: 'payment',
      success_url: "#{success_url}?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancel_url
    }
    @session = Stripe::Checkout::Session.create(session_params)

    payment_intent_params = {
      amount: params[:amount] * 100,
      customer: customer,
      receipt_email: receipt_email,
      currency: @line_items.first.currency,
      payment_method_types: ['card'],
      metadata: {
        user_name: params[:name],
        user_email: params[:email],
        order_id: rand.to_s[2..11],
        line1: params[:line1],
        line2: params[:line2],
        city: params[:city],
        state: params[:state],
        postal_code: params[:postal_code],
        country: params[:country]
      },
    }
    payment_intent = Stripe::PaymentIntent.create(payment_intent_params)

    render json: { payment_intent_id: payment_intent.id, clientSecret: payment_intent['client_secret'], session_id: @session.id }, status: :ok
  end

  def process_payment(session_id)
    Orderable.destroy_all
    session = Stripe::Checkout::Session.retrieve({ id: session_id, expand: ['line_items'] })
    user_email = session.metadata.user_email
    user_name = session.metadata.user_name
    line_items = session.line_items.data
    customer_id = session.metadata.customer
    line1 = session.metadata.line1
    line2 = session.metadata.line2
    city = session.metadata.city
    state = session.metadata.state
    postal_code = session.metadata.postal_code
    country = session.metadata.country
  
    ActiveRecord::Base.transaction do
      line_items.each do |line_item|
        product = Product.find_by(stripe_product_id: line_item.price.product)
  
        if product.blank?
          raise StandardError, "Product with stripe_product_id #{line_item.price.product} not found"
        end
  
        @user = User.find_or_initialize_by(email: user_email)
  
        if @user.new_record?
          @user.username = user_name
          @user.password = SecureRandom.hex(8)
          @user.stripe_customer_id = customer_id
  
          unless @user.save
            raise StandardError, "Unable to save user: #{@user.errors.full_messages.to_sentence}"
          end
        end
  
        transaction = Transaction.find_by(
          user: @user,
          product: product,
          quantity: line_item.quantity
        )
  
        if transaction.nil?
          transaction = Transaction.new(
            user: @user,
            product: product,
            amount_discount: line_item.amount_discount,
            amount_tax: line_item.amount_tax,
            amount_total: line_item.amount_total,
            quantity: line_item.quantity
          )
  
          unless transaction.save
            raise StandardError, "Unable to save transaction: #{transaction.errors.full_messages.to_sentence}"
          end
  
          product.increment!(:sales_count)
        end
  
        if city.present? && country.present? && line1.present? && postal_code.present? && state.present?
          if @user.addresses.nil?
            Address.create(
              city: city,
              country: country,
              line1: line1,
              line2: line2,
              postal_code: postal_code,
              state: state,
              user_id: @user.id
            )
          end
        else
          raise StandardError, "Missing address attribute: #{session.metadata}"
        end
      end
    end
  
    render json: session
  end
  
   
end
