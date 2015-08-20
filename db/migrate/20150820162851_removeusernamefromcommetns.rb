class Removeusernamefromcommetns < ActiveRecord::Migration
  def change
    remove_column :comments, :username
  end
end
