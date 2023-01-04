class TransactionsController < ApplicationController
    def index
        transactions ||= Transaction.sorted_transactions
        render json: transactions, status: 200
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
            }
        end
        render json: data, status: 200
    end
end
