class Api::AlbumingsController < ApplicationController
  def create
    @albuming = Albuming.new(albuming_params)
    if @albuming.save
      render :show
    else
      render json: @albuming.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @albuming = Albuming.find(params[:id])
    if @albuming.delete
      render :show
    else
      render json: @albuming.errors, status: :unprocessable_entity
    end
  end

  private
  def albuming_params
    params.require(:albuming).permit(:album_id, :photo_id)
  end
end
