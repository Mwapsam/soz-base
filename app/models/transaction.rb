class Transaction < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :product
  validates :user_id, :product_id, :amount_total, :quantity, presence: true

  monetize :amount_total, as: :price_cents

  scope :sorted_transactions, ->{ order(created_at: :desc) }
end
