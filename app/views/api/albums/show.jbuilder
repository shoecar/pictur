json.id @album.id
json.name @album.name
json.created time_ago_in_words(@album.created_at)
json.user_id @album.user.id
json.username @album.user.username

json.photos @album.photos do |photo|
  json.(photo, :id, :title, :description, :url, :thumb_url, :filters)
end

json.albumings @album.albumings do |albuming|
  json.(albuming, :id, :album_id, :photo_id)
end
