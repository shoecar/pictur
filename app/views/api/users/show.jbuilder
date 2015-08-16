json.(@user, :id, :username)

json.photos @user.photos do |photo|
  json.id photo.id
  json.title photo.title
  json.description photo.description
  json.user_id photo.user_id
  json.url photo.url
  json.thumb_url photo.thumb_url
  json.created time_ago_in_words(photo.created_at)
end

json.comments @user.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.photo_id comment.photo_id
  json.user_id comment.user_id
  json.username comment.username
  json.created time_ago_in_words(comment.created_at)
end
