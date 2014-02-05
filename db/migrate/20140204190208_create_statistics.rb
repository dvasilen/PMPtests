class CreateStatistics < ActiveRecord::Migration
  def change
    create_table :statistics do |t|
      t.integer :user_id
      t.integer :correct
      t.integer :incorrect
      t.integer :noanswer
      t.integer :time

      t.timestamps
    end
  end
end
