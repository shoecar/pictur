class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @photos = @user.photos
    @albums = @user.albums.includes(:photos)
    @comments = @user.comments
    @votings = @user.votings.includes(:photo)
    render :show
  end
end
