class Addfiltersfieldtouser < ActiveRecord::Migration
  def change
    add_column :photos, :filters, :string
  end
end
