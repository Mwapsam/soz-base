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
    session[:cart_id] ||= Cart.create.id
  end

  def load_cart
    @cart = Cart.includes(products: :orderables).find_by(id: session[:cart_id]) || Cart.create.tap { |cart| session[:cart_id] = cart.id }
    @line_items = @cart.products.order(created_at: :desc) if @cart.present?
  end
end
