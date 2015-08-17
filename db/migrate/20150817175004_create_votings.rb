class CreateVotings < ActiveRecord::Migration
  def change
    create_table :votings do |t|
      t.integer :user_id, null: false
      t.integer :photo_id, null: false
      t.integer :score, null: false

      t.timestamps null: false
    end

    add_index :votings, :user_id
    add_index :votings, :photo_id
  end
end
