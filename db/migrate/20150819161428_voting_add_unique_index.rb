class VotingAddUniqueIndex < ActiveRecord::Migration
  def change
    add_index :votings, [:user_id, :photo_id], unique: true
  end
end
