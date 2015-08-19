json.(@user, :id, :username)

json.photos @photos do |photo|
  json.id photo.id
  json.title photo.title
  json.description photo.description
  json.user_id photo.user_id
  json.url photo.url
  json.thumb_url photo.thumb_url
  json.created time_ago_in_words(photo.created_at)
  json.num_comments photo.comments.length
  json.votings_score photo.sum_score
end

json.comments @comments do |comment|
  json.id comment.id
  json.body comment.body
  json.photo_id comment.photo_id
  json.user_id comment.user_id
  json.username comment.username
  json.created time_ago_in_words(comment.created_at)
  if comment.photo
    json.photo_url comment.photo.url
    json.photo_title comment.photo.title
  else
    json.photo_url false
    json.photo_title "deleted"
  end
end

json.votings @votings do |voting|
  json.id voting.photo.id
  json.title voting.photo.title
  json.description voting.photo.description
  json.user_id voting.photo.user_id
  json.url voting.photo.url
  json.thumb_url voting.photo.thumb_url
  json.created time_ago_in_words(voting.photo.created_at)
  json.num_comments voting.photo.comments.length
  json.votings_score voting.photo.sum_score
end
