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

    private

    def user_params
        params.permit(:email, :username, :password, :photo)
    end
end
