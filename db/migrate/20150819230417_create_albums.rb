class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.string :name, null: false
      t.integer :user_id, null: false
      t.integer :albuming_id, null: false

      t.timestamps null: false
    end

    add_index :albums, :user_id
    add_index :albums, :albuming_id
  end
end
