class Address < ApplicationRecord
    belongs_to :user

    validates :city, :country, :line1, :postal_code, :state, presence: true

    scope :get_address, ->(current_user) { where(user_id: current_user.id) }

    def self.update_user_address(address)
        user = User.find_by(id: address.user_id)
        Stripe::Customer.update(
            user.stripe_customer_id, 
            address: {
                city: address.city,
                country: address.country,
                line1: address.line1,
                line2: address.line2,
                postal_code: address.postal_code,
                state: address.state
            },
        )
    end
end
