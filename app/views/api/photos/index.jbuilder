json.array! @photos do |photo|
  json.(photo, :id, :title, :description, :user_id, :url, :thumb_url, :created_at)
  json.created time_ago_in_words(photo.created_at)
  json.num_comments photo.comments.length
  json.num_likes -1

  json.user photo.user, :id, :username
end
