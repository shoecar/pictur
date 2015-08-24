class Api::UsersController < ApplicationController
  def show
    @user = User.find(params[:id])
    @photos = @user.photos.includes(:votings).includes(:comments)
    @albums = @user.albums.includes(:photos).includes(:albumings)
    @comments = @user.comments.includes(:photo)
    @votings = @user.votings.includes(:photo)
    render :show
  end

  def update
    @user = User.find(params[:id])
    if @user.update(user_params)
      render :show
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  private
  def user_params
    params.require(:user).permit(:portrait_url)
  end
end
