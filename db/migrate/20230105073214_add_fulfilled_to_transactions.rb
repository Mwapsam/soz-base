class AddFulfilledToTransactions < ActiveRecord::Migration[7.0]
  def change
    add_column :transactions, :amount_total, :integer
    add_column :transactions, :amount_tax, :integer
    add_column :transactions, :quantity, :integer
    add_column :transactions, :amount_discount, :integer
    add_column :transactions, :fulfilled, :boolean, default: false
  end
end
