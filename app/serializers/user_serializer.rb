class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :email, :session_token, :role, :total_sales, :user_address, :password_digest
  has_many :addresses
end
