class Removealbumingidfromalbums < ActiveRecord::Migration
  def change
    remove_column :albums, :albuming_id
  end
end
