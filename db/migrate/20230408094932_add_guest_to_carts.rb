class AddGuestToCarts < ActiveRecord::Migration[7.0]
  def change
    add_column :carts, :guest, :boolean
  end
end
