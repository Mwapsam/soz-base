class Transaction < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :product

  scope :sorted_transactions, ->{ order(created_at: :asc) }
end
