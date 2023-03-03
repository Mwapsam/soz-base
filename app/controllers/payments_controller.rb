class PaymentsController < ApplicationController
  def create
    if logged_in?
      if @line_items.pluck(:currency).uniq.length > 1
        render json: {message: "You can not select products with different currencies in one checkout"}
      else
        @session = Stripe::Checkout::Session.create({
          customer: current_user.stripe_customer_id,
          payment_method_types: ['card'],
          line_items: @line_items.collect {|item| item.to_builder(item.orderables[0].quantity).attributes!},
          metadata: {
            user_id: current_user.id,
            order_id: rand.to_s[2..11],
          },
          allow_promotion_codes: true,
          mode: 'payment',
          success_url: "#{success_url}?session_id={CHECKOUT_SESSION_ID}",
          cancel_url: cancel_url
        })
        
        # Create a Payment Intent separately
        payment_intent = Stripe::PaymentIntent.create({
          amount: params[:amount] * 100,
          customer: current_user.stripe_customer_id,
          receipt_email: current_user.email,
          currency: @line_items.first.currency,
          payment_method_types: ['card'],
          metadata: {
            user_id: current_user.id,
            oreder_id: rand.to_s[2..11],
          },
          shipping: {
            address: {
              line1: params[:line1],
              line2: params[:line2],
              city: params[:city],
              state: params[:state],
              postal_code: params[:postal_code],
              country: params[:country]
            },
            name: current_user.username
          }
        })
        
        render json: {payment_intent_id: payment_intent.id, clientSecret: payment_intent['client_secret'], session_id: @session.id}, status: :ok       
      end
    else
      render json: {error: "Unauthorized action!"}, status: 401
    end  
  end
  

  def success
    if params[:session_id].present?
      Orderable.destroy_all
      @session_with_expand = Stripe::Checkout::Session.retrieve({ id: params[:session_id], expand: ['line_items'] })
      @session_with_expand.line_items.data.each do |line_item|
        product = Product.find_by(stripe_product_id: line_item.price.product)
        Transaction.create(user_id: current_user.id, product_id: product.id, amount_discount: line_item.amount_discount, amount_tax: line_item.amount_tax, amount_total: line_item.amount_total, quantity: line_item.quantity)
        product.increment!(:sales_count)
      end
      render json: @session_with_expand
    else
      render json: { error: 'No info to display' }
    end
  end 
  

  def confirm_payment
    payment_intent_id = params[:payment_intent_id]
    begin
      intent = Stripe::PaymentIntent.retrieve(payment_intent_id)
      intent.confirm
      render json: {success: true}, status: :ok
    rescue Stripe::StripeError => e
      render json: {error: e.message}, status: :bad_request
    end
  end  
  
  def good; end
  def cancel_url; end
end
