class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @photos = @user.photos.includes(:votings).includes(:comments)
    @comments = @user.comments.includes(:photo)
    @votings = @user.votings.includes(:photo)
    render :show
  end
end
