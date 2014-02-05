class UsersController < ApplicationController
  before_action :signed_in_user, only: [:index, :edit, :update, :destroy]
  before_action :correct_user,   only: [:edit, :update]
  before_action :admin_user,     only: :destroy

  def index
    @users = User.paginate(page: params[:page])
  end

  def show
    @user = User.find(params[:id])
    @statistics = @user.statistics.paginate(page: params[:page])

  	auxTime = User.find(current_user).statistics.map{|x| x.time}.sum
  	@totaltime = (auxTime / 3600).to_s + "h " + (auxTime / 60 % 60).to_s + "m " + (auxTime % 60).to_s + "s"
  	@totalcorrect = User.find(current_user).statistics.map{|x| x.correct}.sum
  	@totalincorrect = User.find(current_user).statistics.map{|x| x.incorrect}.sum
  	@totalnoanswer = User.find(current_user).statistics.map{|x| x.noanswer}.sum
  	@totalquest = User.find(current_user).statistics.map{|x| x.total}.sum
  	@totalscore = (@totalcorrect.to_f / @totalquest.to_f).round(2) * 100
	
  end

  def new
    @user = User.new
  end

  def edit
  end

  def update
    if @user.update_attributes(user_params)
      flash[:success] = "Profile updated"
      redirect_to @user
    else
      render 'edit'
    end
  end

  def create
    @user = User.new(user_params)
    if @user.save
      sign_in @user
      flash[:success] = "Welcome to the PMP Exam App!"
      redirect_to root_url
    else
      render 'new'
    end
  end

  def destroy
    User.find(params[:id]).destroy
    flash[:success] = "User deleted."
    redirect_to users_url
  end

  private

    def user_params
      params.require(:user).permit(:name, :email, :password,
                                   :password_confirmation)
    end

    # Before filters

    def signed_in_user
      unless signed_in?
        store_location
        redirect_to signin_url, notice: "Please sign in."
      end
    end

    def correct_user
      @user = User.find(params[:id])
      redirect_to(root_url) unless current_user?(@user)
    end
    
    def admin_user
      redirect_to(root_url) unless current_user.admin?
    end
end
