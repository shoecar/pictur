json.page_number @page
json.total_pages @photos.total_pages
json.models @photos do |photo|
  json.(photo, :id, :title, :description, :user_id, :url, :thumb_url, :created_at, :filters)
  json.created time_ago_in_words(photo.created_at)
  json.num_comments photo.comments.length
  json.votings_score photo.sum_score

  json.user photo.user, :id, :username
end
