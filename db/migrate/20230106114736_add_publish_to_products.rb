class AddPublishToProducts < ActiveRecord::Migration[7.0]
  def change
    add_column :products, :publish, :boolean, default: false
  end
end
