class CreateUsers < ActiveRecord::Migration[7.0]
  def change
    create_table :users do |t|
      t.string :patient_name, null: false
      t.string :patient_name_kana, null: false
      t.string :gender, null: false
      t.date :birthday, null: false
      t.string :phone_number, null: false
      t.string :post_number, null: false
      t.string :address, null: false
      t.string :email, null: false, unique: true
      t.string :line_user_id, null: false, unique: true
      t.timestamps
    end
  end
end
