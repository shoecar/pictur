class PhotoUpdate < ActiveRecord::Migration
  def change
    add_column :photos, :url, :string, null: false
    add_column :photos, :thumb_url, :string, null: false
  end
end
