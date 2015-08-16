class Addusernametocomments < ActiveRecord::Migration
  def change
    add_column :comments, :username, :string, null: false
  end
end
