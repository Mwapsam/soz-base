class OrderableSerializer < ActiveModel::Serializer
  attributes :id, :quantity, :product_id, :cart_id, :total, :created_at
end
