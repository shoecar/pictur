class Api::AlbumsController < ApplicationController
  def index
    @albums = Album.includes(:user).includes(:albumings).includes(:photos).all
    render :index
  end

  def show
    @album = Album.includes(:user).includes(:albumings).includes(:photos).find(params[:id])
    render :show
  end

  def create
    @album = Album.new(album_params)
    if @album.save
      render :show
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @album = Album.find(params[:id])
    if @album.delete
      render :show
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  def update
    @album = Album.find(params[:id])
    if @album.update(album_params)
      render :show
    else
      render json: @album.errors, status: :unprocessable_entity
    end
  end

  private
  def album_params
    params.require(:album).permit(:name, :user_id, :albuming_id)
  end
end
