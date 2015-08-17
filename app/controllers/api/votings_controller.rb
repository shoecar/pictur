class Api::VotingsController < ApplicationController
  def create
    @voting = Voting.new(voting_params)
    if @voting.save
      render :show
    else
      render json: @voting.errors, status: :unprocessable_entity
    end
  end

  def destroy
    @voting = Voting.find(params[:id])
    if @voting.delete
      render :show
    else
      render json: @voting.errors, status: :unprocessable_entity
    end
  end

  private
  def voting_params
    params.require(:voting).permit(:user_id, :photo_id, :score)
  end
end
