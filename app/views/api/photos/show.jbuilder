json.(@photo, :id, :title, :description, :user_id, :created_at)

json.user @photo.user, :id, :username
