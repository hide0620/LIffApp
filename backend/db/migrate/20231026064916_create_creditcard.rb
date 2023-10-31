class CreateCreditcard < ActiveRecord::Migration[7.0]
  def change
    create_table :creditcard do |t|
      t.string :payjp_id
      t.integer :patient_id
      
      t.timestamps
    end
  end
end
