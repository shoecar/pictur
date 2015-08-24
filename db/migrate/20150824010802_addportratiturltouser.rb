class Addportratiturltouser < ActiveRecord::Migration
  def change
    add_column :users, :portrait_url, :string
  end
end
