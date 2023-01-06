class TransactionsController < ApplicationController
    def index
        data = []
        trans = User.all_customers
        transactions ||= Transaction.sorted_transactions

        transactions.map do |train|
            user = User.find_by(id: train.user_id)
            product = Product.find_by(id: train.product_id)
            trans.data.each do |res|
                if user.stripe_customer_id == res.customer
                    data << {
                        amount_tax: train.amount_tax,
                        amount_discount: train.amount_discount,
                        quantity: train.quantity,
                        fulfilled: train.fulfilled,
                        date: train.created_at,
                        amount_total: train.amount_total.to_i/100,
                        id: res.id,
                        amount: res.amount/100,
                        name: res.billing_details.name,
                        email: res.billing_details.email,
                        product: product.name,
                        currency: res.currency,
                        receipt_url: res.receipt_url,
                        status: res.status,
                    }
                end
            end
        end
        render json: data, status: 200
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
                name: res.billing_details.name,
                email: res.billing_details.email,
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
