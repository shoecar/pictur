class UsersController < ApplicationController
  def new
    @user = User.new
    @toggle = "user"
    render :new
  end

  def create
    if params[:user][:password] != params[:user][:confirm_password]
      flash.now[:errors] = ["Passwords need to match"]
      @photos = Photo.all
      @toggle = "user"
      return render "sessions/combo"
    end

    @user = User.new(user_params)
    if @user.save
      log_in!(@user)
      redirect_to root_url
    else
      flash.now[:errors] = @user.errors.full_messages
      @photos = Photo.all
      @toggle = "user"
      render "sessions/combo"
    end
  end

  private
  def user_params
    params.require(:user).permit(:username, :password)
  end
end
