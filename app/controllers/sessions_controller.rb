class SessionsController < ApplicationController
  def new
    render :new
  end

  def create
    user = User.find_by_creds(params[:session][:username], params[:session][:password])
    if user
      log_in!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username or Passowrd"]
      render :new
    end
  end

  def destroy
    log_out!
    redirect_to root_url
  end
end
