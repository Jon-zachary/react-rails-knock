class CreateJuices < ActiveRecord::Migration[5.1]
  def change
    create_table :juices do |t|
      t.string :name
      t.integer :sugar

      t.timestamps
    end
  end
end
