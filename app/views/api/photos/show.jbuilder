json.(@photo, :id, :title, :description, :user_id, :url, :thumb_url, :filters)
json.created time_ago_in_words(@photo.created_at)
json.num_comments @photo.comments.length
json.num_likes @photo.sum_score

json.user @photo.user, :id, :username

json.votings @photo.votings, :id, :user_id, :photo_id, :score

json.comments @photo.comments do |comment|
  json.id comment.id
  json.body comment.body
  json.photo_id comment.photo_id
  json.user_id comment.user_id
  json.username comment.user.username
  json.created time_ago_in_words(comment.created_at)
  json.created_at comment.created_at
end
