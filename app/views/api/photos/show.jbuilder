json.(@photo, :id, :title, :description, :user_id, :url, :thumb_url, :created_at)

json.user @photo.user, :id, :username
