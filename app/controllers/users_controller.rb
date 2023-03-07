class UsersController < ApplicationController
  def index
    data = users_with_addresses
    render json: data, status: :ok
  end

  def create
    @user = User.new(user_params)
    @user.password = params[:password]

    if @user.save
      login!(@user)
      render json: @user, status: :ok
    else
      render json: { error: @user.errors.full_messages }, status: :unauthorized
    end
  end

  def create_address
    address = Address.new(address_params)

    if address.save
      Address.update_user_address(address)
      render json: address, status: :ok
    else
      render json: { error: 'Address not created, try again later!' }, status: :unauthorized
    end
  end

  def getUser
    user = current_user
    if user.present?
      render json: user, status: :ok
    else
      render json: { error: 'You need to login to access this page!' }, status: :unauthorized
    end
  end

  private

  def user_params
    params.require(:user).permit(:email, :username, :password, :photo)
  end

  def address_params
    params.require(:address).permit(:city, :country, :line1, :postal_code, :user_id)
  end

  def users_with_addresses
    Rails.cache.fetch('users_with_addresses', expires_in: 5.minutes) do
      User.includes(:addresses).map do |user|
        address = user.addresses.last
        {
          id: user.id,
          username: user.username,
          email: user.email,
          city: address&.city,
          country: address&.country,
          line1: address&.line1,
          postal_code: address&.postal_code
        }
      end
    end
  end  
end
