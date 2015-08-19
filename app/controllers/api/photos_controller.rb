class Api::PhotosController < ApplicationController
  def index
    order = params[:ascend] == "true" ? "ASC" : "DESC"
    sort_type = params[:sort_type] ? params[:sort_type] : "time"
    if params[:user_id] != "0" && params[:user_id]
      user_id = "photos.user_id = #{params[:user_id]}"
    else
      user_id = "photos.user_id > 0"
    end

    case sort_type
    when 'time'
      @photos = Photo.order("created_at #{order}").where(user_id).page(params[:page]).per(25)
    when 'num_comments'
      @photos = Photo.select("photos.*, count(comments.id) AS comments_count").
        joins("LEFT OUTER JOIN comments ON photos.id = comments.photo_id").
        group("photos.id").
        order("comments_count #{order}").
        where(user_id).
        page(params[:page]).per(25)
    when 'votings_score'
      @photos = Photo.select("photos.*, count(votings.id) AS votings_count").
        joins("LEFT OUTER JOIN votings ON photos.id = votings.photo_id").
        group("photos.id").
        order("votings_count #{order}").
        where(user_id).
        page(params[:page]).per(25)
    end

    @page = params[:page]
    render :index
  end

  def show
    @photo = Photo.includes(:user).includes(:comments).includes(:votings).find(params[:id])
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
