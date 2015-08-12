class Api::PhotosController < ApplicationController
  def index
    @photos = Photo.all
    render :index
  end

  def show
    @photo = Photo.find(params[:id])
    render :show
  end

  def create
    @photo = Photo.new(photo_params)
    if @photo.save
      render :show
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @photo = Photo.find(params[:id])
    if @photo.delete
      render :show
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  def update
    @photo = Photo.find(params[:id])
    if @photo.update(photo_params)
      render :show
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  private
  def photo_params
    params.require(:photo).permit(:title, :description, :user_id, :url, :thumb_url)
  end
end
