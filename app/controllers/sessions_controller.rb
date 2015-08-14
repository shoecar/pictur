class SessionsController < ApplicationController
  def new
    @photos = Photo.all
    @toggle = "session"
    render :combo
  end

  def create
    user = User.find_by_creds(params[:session][:username], params[:session][:password])
    if user
      log_in!(user)
      redirect_to root_url
    else
      flash.now[:errors] = ["Invalid Username or Password"]
      @photos = Photo.all
      @toggle = "session"
      render :combo
    end
  end

  def destroy
    log_out!
    redirect_to root_url
  end
end
