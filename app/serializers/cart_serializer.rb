class CartSerializer < ActiveModel::Serializer
  attributes :id, :total, :total_quantity

  has_many :orderables
end
