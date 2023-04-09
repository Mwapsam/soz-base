class ApplicationController < ActionController::Base
  skip_before_action :verify_authenticity_token
  helper_method :current_user, :logged_in?, :signed_in_user
  before_action :initialize_session, :load_cart

  def current_user
    @current_user ||= User.find_by(session_token: session[:session_token]) if session[:session_token]
  end

  def logged_in?
    !!current_user
  end

  def login!(user)
    session[:session_token] = user.session_token
    @current_user = user
  end

  def signed_in_user
    current_user&.role
  end

  def logout!
    if logged_in?
      current_user.reset_session_token!
      session[:session_token] = nil
    end
  end

  private

  def initialize_session
    unless Cart.exists?(id: session[:cart_id])
      session[:cart_id] = Cart.create(guest: true).id
    end
  end  

  def load_cart
    if logged_in?
      @cart = Cart.includes(products: :orderables).find_or_create_by(user_id: current_user.id, guest: false)
    else
      @cart = Cart.includes(products: :orderables).find_or_create_by(id: session[:cart_id], guest: true)
      session[:cart_id] = @cart.id if @cart.new_record?
    end
    @line_items = @cart.products.order(created_at: :desc) if @cart.present?
  end
  
end
