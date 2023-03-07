class TransactionsController < ApplicationController
    def index
        customer_ids = Set.new(Stripe::Charge.list(limit: 100).map(&:customer))
        transactions = Transaction.includes(:user, :product).sorted_transactions.select { |t| customer_ids.include?(t.user.stripe_customer_id) }
      
        data = transactions.map do |transaction|
          {
            id: transaction.id,
            amount_tax: transaction.amount_tax,
            amount_discount: transaction.amount_discount,
            quantity: transaction.quantity,
            fulfilled: transaction.fulfilled,
            date: transaction.created_at,
            amount_total: (transaction.amount_total.to_i / 100),
            user_id: transaction.user_id,
            username: transaction.user.username, # Added username field
            product_id: transaction.product_id,
            product: transaction.product.name,
          }
        end
      
        render json: data, status: :ok
    end
      
      

    def fulfil_order
        customer_ids = Set.new(Stripe::Charge.list(limit: 100).map(&:customer))
        trans = Transaction.find(params[:id])
        if trans.present?
            trans.fulfilled = true
            trans.save
            if customer_ids.include?(trans.user.stripe_customer_id)
                data = {
                  id: trans.id,
                  amount_tax: trans.amount_tax,
                  amount_discount: trans.amount_discount,
                  quantity: trans.quantity,
                  fulfilled: trans.fulfilled,
                  date: trans.created_at,
                  amount_total: trans.amount_total.to_i/100,
                  user_id: trans.user_id,
                  product_id: trans.product_id,
                  product: trans.product.name,
                }
            end
            render json: data, status: 201
        else
            render json: {error: "Requets failed. Try again later!"}
        end
    end
      
    
    def get_details
        data = []
        trans = User.customers
        trans.data.each do |res|
            data << {
                id: res.id,
                amount: res.amount/100,
                name: res.billing_details.name,
                email: res.billing_details.email,
                currency: res.currency,
                receipt_url: res.receipt_url,
                status: res.status,
                created: res.created,
            }
        end
        render json: data, status: 200
    end

    def all_transactions
        data = []
        trans = User.all_customers
        trans.data.each do |res|
            data << {
                id: res.id,
                amount: res.amount/100,
                name: res.metadata,
                email: res.receipt_email,
                currency: res.currency,
                receipt_url: res.receipt_url,
                status: res.status,
                created: res.created,
                customer_id: res.customer,
            }
        end
        render json: data, status: 200
    end
end
