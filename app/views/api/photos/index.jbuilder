json.array! @photos do |photo|
  json.(photo, :id, :title, :description, :user_id, :url, :thumb_url, :created_at)
end
