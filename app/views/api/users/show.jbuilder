json.(@user, :id, :username, :portrait_url)
json.member_since "#{I18n.t("date.month_names")[@user.created_at.month]} #{@user.created_at.year}"

json.photos @photos do |photo|
  json.id photo.id
  json.title photo.title
  json.description photo.description
  json.user_id photo.user_id
  json.url photo.url
  json.thumb_url photo.thumb_url
  json.filters photo.filters
  json.created time_ago_in_words(photo.created_at)
  json.comments photo.comments.length
  json.likes photo.sum_score
end

json.comments @comments do |comment|
  json.id comment.id
  json.body comment.body
  json.photo_id comment.photo_id
  json.user_id comment.user_id
  json.username @user.username
  json.created_at comment.created_at
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
  next unless voting.photo
  json.id voting.id
  json.voting_created time_ago_in_words(voting.created_at)
  json.photo_id voting.photo.id
  json.title voting.photo.title
  json.description voting.photo.description
  json.user_id voting.photo.user_id
  json.url voting.photo.url
  json.thumb_url voting.photo.thumb_url
  json.filters voting.photo.filters
  json.photo_created time_ago_in_words(voting.photo.created_at)
  # json.comments voting.photo.comments.length
  # json.likes voting.photo.sum_score
end

json.albums @albums do |album|
  json.id album.id
  json.name album.name
  json.user_id album.user_id
  json.created time_ago_in_words(album.created_at)
  json.photos album.photos do |photo|
    json.(photo, :id, :title, :description, :url, :thumb_url, :filters)
  end
end
