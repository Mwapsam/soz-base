class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?, :signed_in_user
    before_action :initialize_session
    before_action :load_cart
  
    def current_user
      return nil unless session[:session_token]
      @current_user ||= User.find_by(session_token: session[:session_token])
      return @current_user
    end
  
    def logged_in?
      !!current_user
    end
  
    def login!(user)
      session[:session_token] = user.session_token
      @current_user = user
      return session[:session_token]
    end

    def signed_in_user
      return nil unless session[:session_token]
      @current_user = User.find_by(session_token: session[:session_token])
      return @current_user.role
    end
  
    def logout!
      if logged_in?
        current_user.reset_session_token!
        session[:session_token] = nil
      end
    end

    private

  def initialize_session
    session[:cart_id] ||= []
  end

  def load_cart
    @cart ||= Cart.find_by(id: session[:cart_id])
    if @cart.present?
      @line_items ||= @cart.products.all.includes(:orderables)
    end

    if @cart.nil?
      @cart = Cart.create
      session[:cart_id] = @cart.id
    end
  end
end
