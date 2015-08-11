json.array! @photos do |photo|
  json.(photo, :id, :title, :description, :user_id)
end
