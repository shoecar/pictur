class CreateAlbumings < ActiveRecord::Migration
  def change
    create_table :albumings do |t|
      t.integer :album_id, null: false
      t.integer :photo_id, null: false

      t.timestamps null: false
    end

    add_index :albumings, [:album_id, :photo_id], unique: true

    add_column :photos, :albuming_id, :integer
  end
end
