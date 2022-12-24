class PaymentsController < ApplicationController
    def create
        @session = Stripe::Checkout::Session.create({
            customer: current_user.stripe_customer_id,
            payment_method_types: ['card'],
            line_items: @cart.collect.with_index { |item, index| item.to_builder(params[:cartItems][index]['cartQuantity']).attributes! },
            allow_promotion_codes: true,
            mode: 'payment',
            success_url: "#{success_url}?session_id={CHECKOUT_SESSION_ID}",
            cancel_url: cancel_url
          })
          render json: @session.url, status: 201
    end

    private 

    def success
      if params[:session_id].present?
        @session_with_expand = Stripe::Checkout::Session.retrieve({ id: params[:session_id], expand: ['line_items'] })
        @session_with_expand.line_items.data.each do |line_item|
          Product.find_by(stripe_product_id: line_item.price.product)
        end
      else
        redirect_to cancel_url, alert: 'No info to display'
      end
    end
  
    def cancel; end
end
