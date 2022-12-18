class UsersController < ApplicationController
    def create
        @user = User.new(user_params)
    
        if @user.save
          login!(@user)
          render json: @user, status: 200
        else
          render json: @user.errors.full_messages, status: 401
        end
    end

    def getUser
      user = current_user
      if user.present?
        render json: user, status: 200
      else
        render json: {error: 'You need to login to access this page!'}, status: 401
      end
    end

    private

    def user_params
        params.require(:user).permit(:email, :username, :password, :photo)
    end
end
