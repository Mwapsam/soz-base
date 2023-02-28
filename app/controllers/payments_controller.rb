class PaymentsController < ApplicationController
  def create
    if logged_in?
      product_names = @line_items.collect {|item| item.orderables[0].product.name }.join(", ")
      if @line_items.pluck(:currency).uniq.length > 1
        render json: {message: "You can not select products with different currencies in one checkout"}
      else
        payment_intent = Stripe::PaymentIntent.create({
          amount: params[:amount] * 100,
          currency: @line_items.first.currency,
          payment_method_types: ['card'],
          receipt_email: current_user.email,
          metadata: {
            user_id: current_user.id,
            # order_id: @order.id,
            product_names: product_names
          },
          # shipping: {
          #   name: params[:shipping_name],
          #   address: {
          #     line1: params[:shipping_address_line1],
          #     line2: params[:shipping_address_line2],
          #     city: params[:shipping_address_city],
          #     state: params[:shipping_address_state],
          #     postal_code: params[:shipping_address_postal_code],
          #     country: params[:shipping_address_country]
          #   }
          # }
        })
  
        render json: {client_secret: payment_intent.client_secret}, status: :ok
      end
    else
      render json: {error: "Unauthorized action!"}, status: :unauthorized
    end  
  end
  

    def success
      Orderable.destroy_all
      if params[:session_id].present?
        @session_with_expand = Stripe::Checkout::Session.retrieve({ id: params[:session_id], expand: ['line_items'] })
        @session_with_expand.line_items.data.each do |line_item|
          product = Product.find_by(stripe_product_id: line_item.price.product)
          Transaction.create(user_id: current_user.id, product_id: product.id, amount_discount: line_item.amount_discount, amount_tax: line_item.amount_tax, amount_total: line_item.amount_total, quantity: line_item.quantity)
          product.increment!(:sales_count)
        end
      else
        redirect_to cancel_url, alert: 'No info to display'
      end
    end
  
    def cancel; end
end
