class SessionsController < ApplicationController
    def create
      @user = User.find_by_credentials(params[:email], params[:password])
      if @user
        login!(@user)
        render json: @user, status: 200
      else
        render json: {error: 'Incorrect username/password combo. Please try again.'}, status: 401
      end
    end
  
    def destroy
      if current_user
        logout!
        render json: {}
      else
        render json: {error: "No currently logged in user"}, status: 401
      end
    end
end