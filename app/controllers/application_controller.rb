class ApplicationController < ActionController::Base
    skip_before_action :verify_authenticity_token
    helper_method :current_user, :logged_in?
    before_action :initialize_session
    before_action :load_cart
  
    def current_user
      return nil unless session[:session_token]
      @current_user = User.find_by(session_token: session[:session_token])
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
  
    def logout!
      if logged_in?
        current_user.reset_session_token!
        session[:session_token] = nil
      end
    end

    private

  def initialize_session
    session[:cart] ||= []
  end

  def load_cart
    @cart = Product.where(id: session[:cart])
  end
end
