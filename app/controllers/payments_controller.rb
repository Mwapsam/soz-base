class PaymentsController < ApplicationController
    def create
      if @line_items.pluck(:currency).uniq.length > 1
        render json: {message: "You can not select products with different currencies in one checkout"}
      else
        @session = Stripe::Checkout::Session.create({
            customer: current_user.stripe_customer_id,
            payment_method_types: ['card'],
            line_items: @line_items.collect {|item| item.to_builder(item.orderables[0].quantity).attributes!},
            allow_promotion_codes: true,
            mode: 'payment',
            invoice_creation: {enabled: true},
            success_url: "#{success_url}?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: cancel_url
          })
          render json: @session.url, status: 201
      end
        
    end

    def success
      Orderable.destroy_all
      if params[:session_id].present?
        @session_with_expand = Stripe::Checkout::Session.retrieve({ id: params[:session_id], expand: ['line_items'] })
        @session_with_expand.line_items.data.each do |line_item|
          product = Product.find_by(stripe_product_id: line_item.price.product)
          Transaction.create(user_id: current_user.id, product_id: product.id)
          product.increment!(:sales_count)
        end
      else
        redirect_to cancel_url, alert: 'No info to display'
      end
    end
  
    def cancel; end
end
