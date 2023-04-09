class Cart < ApplicationRecord
    belongs_to :user, optional: true
    has_many :orderables, dependent: :destroy
    has_many :products, through: :orderables

    def total
        orderables.to_a.sum { |orderable| orderable.total }
    end

    def total_quantity
        orderables.to_a.sum { |orderable| orderable.quantity }
    end

    scope :guest_carts, -> { where(guest: true) }

    def self.for(user)
      if user.present?
        user.cart || user.build_cart
      else
        Cart.guest_carts.last || Cart.create
      end
    end  
end
