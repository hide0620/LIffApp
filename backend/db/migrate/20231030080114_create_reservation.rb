class CreateReservation < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.date :date
      t.time :start_time
      t.time :start_to
      
      t.timestamps
    end
  end
end
