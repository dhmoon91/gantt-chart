class CreateTasks < ActiveRecord::Migration[5.0]
  def change
    create_table :tasks do |t|
      t.string :title
      t.integer :position
      t.date :startDate
      t.date :endDate
      t.timestamps
    end
  end
end
