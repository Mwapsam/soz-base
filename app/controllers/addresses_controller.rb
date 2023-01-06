class AddressesController < ApplicationController
  def index
    if logged_in?
      addresses ||= Address.get_address(current_user)
      render json: addresses, status: 200
    else
      render json: {error: "Unauthorized action!"}, status: 401
    end
  end

  def create_address
    if logged_in?
      address = Address.new(address_params)
      
      if address.save!
        Address.update_user_address(address)
        render json: address, status: 200
      else
        render json: {error: 'Address not created, try again later!'}, status: 401
      end
    else
      render json: {error: "Unauthorized action!"}, status: 401
    end
  end

  def update 
    if logged_in?
      address = Address.find(params[:id])
      if address.update(address_params)
        Address.update_user_address(address)
      end
    else
      render json: {error: "Unauthorized action!"}, status: 401
    end
  end

  private

  def address_params
      params.require(:address).permit(:city, :country, :line1, :line2, :postal_code, :state, :user_id)
  end
end