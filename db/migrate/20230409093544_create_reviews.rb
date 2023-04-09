class CreateReviews < ActiveRecord::Migration[7.0]
  def change
    create_table :reviews do |t|
      t.integer :rating
      t.text :comment
      t.references :user, null: false, foreign_key: true, index: true
      t.references :product, null: false, foreign_key: true, index: true

      t.timestamps
    end
  end
end
