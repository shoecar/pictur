class Phototitle < ActiveRecord::Migration
  def change
    change_column :photos, :title, :string, null: true
  end
end
