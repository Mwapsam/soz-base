class AddUserIdToCarts < ActiveRecord::Migration[7.0]
  def change
    add_reference :carts, :user, foreign_key: true, unique: true
  end
end
