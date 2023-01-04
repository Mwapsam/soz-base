class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :session_token, :role, :total_sales
  has_many :addresses
end
