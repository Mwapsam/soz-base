class Orderable < ApplicationRecord
  belongs_to :product
  belongs_to :cart

  scope :get_orders, ->(cart) { where(cart_id: cart.id) }
  scope :increase_quantity, -> (item) {item.increment!(:quantity)}
  scope :decrease_quantity, -> (item) {item.decrement!(:quantity)}
  
  def total
    product.price * quantity
  end
end
