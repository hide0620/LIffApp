class CreateReservationSchedules < ActiveRecord::Migration[7.0]
  def change
    create_table :reservation_schedules do |t|
      t.date :date
      t.datetime :start_time
      t.datetime :end_time
      t.boolean :recurring_flag
      t.integer :reservation_deadline

      t.timestamps
    end
  end
end
