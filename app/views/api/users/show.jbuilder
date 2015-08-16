json.(@user, :id, :username)

json.photos @user.photos, :id, :title, :description, :user_id, :url, :thumb_url ,:created_at

json.comments @user.comments, :id, :body, :photo_id, :user_id, :username
