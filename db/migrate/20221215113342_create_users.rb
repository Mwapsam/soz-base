class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :username
      t.string :email
      t.string :password_digest
      t.string :session_token
      t.boolean :email_confirmed, default: false
      t.string :confirm_token
      t.string :role, default: 'user'

      t.timestamps
    end
  end
end
