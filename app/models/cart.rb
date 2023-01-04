class Cart < ApplicationRecord
    has_many :orderables, dependent: :destroy
    has_many :products, through: :orderables

    def total
        orderables.to_a.sum { |orderable| orderable.total }
    end

    def total_quantity
        orderables.to_a.sum { |orderable| orderable.quantity }
    end
end
