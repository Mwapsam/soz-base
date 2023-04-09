class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :currency, :sales_count, :publish, :photos_urls, :total, :total_rating

  has_many :orderables
  has_many :carts
  has_many :reviews
end
