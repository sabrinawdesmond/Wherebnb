class CreateBookings < ActiveRecord::Migration[7.0]
  def change
    create_table :bookings do |t|
      t.references :guest, null: false, foreign_key: { to_table: :users }
      t.references :listing, null: false, foreign_key: true
      t.date :start_date, null: false
      t.date :end_date, null: false
      t.integer :num_guests, null: false, default: 1

      t.timestamps
    end
  end
end
