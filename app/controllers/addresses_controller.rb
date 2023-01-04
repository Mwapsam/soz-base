class AddressesController < ApplicationController
  def index
    addresses ||= Address.get_address(current_user)
    render json: addresses, status: 200
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

  def update 
    address = Address.find(params[:id])
    if address.update(address_params)
      Address.update_user_address(address)
    end
  end

  private

  def address_params
      params.require(:address).permit(:city, :country, :line1, :line2, :postal_code, :state, :user_id)
  end
end