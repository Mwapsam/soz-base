class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :currency, :sales_count, :photos_urls

  has_many :orderables
  has_many :carts
end
