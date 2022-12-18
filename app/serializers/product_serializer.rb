class ProductSerializer < ActiveModel::Serializer
  attributes :id, :name, :description, :price, :currency, :photos_urls
end
