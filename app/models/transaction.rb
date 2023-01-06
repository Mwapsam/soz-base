class Transaction < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :product

  monetize :amount_total, as: :price_cents

  scope :sorted_transactions, ->{ order(created_at: :desc) }
end
