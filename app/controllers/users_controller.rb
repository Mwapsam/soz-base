class UsersController < ApplicationController
    def index
      data = []
      users = User.all
      users.each do |user|
        if user.addresses.size != 0
          data << {
            id: user.id,
            username: user.username,
            email: user.email,   
            city: user.addresses.last.city,
            country: user.addresses.last.country,
            line1: user.addresses.last.line1,
            postal_code: user.addresses.last.postal_code
          }
        end
      end
      render json: data, status: 200
    end

    def create
        @user = User.new(user_params)
    
        if @user.save
          login!(@user)
          render json: @user, status: 200
        else
          render json: @user.errors.full_messages, status: 401
        end
    end

    def create_address
      address = Address.new(address_params)
      
      if address.save!
        Address.update_user_address(address)
        render json: address, status: 200
      else
        render json: {error: 'Address not created, try again later!'}, status: 401
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
