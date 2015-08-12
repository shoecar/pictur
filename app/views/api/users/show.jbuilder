json.(@user, :id, :username)

json.photos @user.photos, :id, :title, :description, :user_id, :url, :thumb_url ,:created_at
