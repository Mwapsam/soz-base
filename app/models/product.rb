class Product < ApplicationRecord
  has_many_attached :photos

  validates :name, presence: true, uniqueness: true, length: { maximum: 150 }
  validates :description, presence: true, length: { maximum: 1000 }
  validates :price, presence: true, :numericality => { :greater_than => 0, only_integer: true }

  scope :sorted, ->{ order(created_at: :asc) }

  def photos_urls
    photos.map do |photo|
      Rails.application.routes.url_helpers.rails_blob_path(photo, only_path: true)
    end
  end

  def to_builder(qty)
    Jbuilder.new do |product|
      product.price stripe_price_id
      product.quantity qty
    end
  end

  # create stripe product and assign to this product
  after_create do
    listing = Stripe::Product.create(name: name)
    price = Stripe::Price.create(product: listing, unit_amount: self.price * 100, currency: currency, tax_behavior: 'exclusive')
    update(stripe_product_id: listing.id, stripe_price_id: price.id)
  end

  after_update :create_and_assign_new_stripe_price, if: :saved_change_to_price?
  after_update :create_and_assign_new_stripe_price, if: :saved_change_to_currency?

  def create_and_assign_new_stripe_price
    price = Stripe::Price.create(product: stripe_product_id, unit_amount: self.price * 100, currency: currency, tax_behavior: 'exclusive')
    update(stripe_price_id: price.id)
  end
end
