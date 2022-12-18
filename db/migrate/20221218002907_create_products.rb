class CreateProducts < ActiveRecord::Migration[7.0]
  def change
    create_table :products do |t|
      t.string :name
      t.text :description
      t.integer :price
      t.string :stripe_price_id
      t.string :stripe_product_id
      t.string :currency, default: "USD"
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
