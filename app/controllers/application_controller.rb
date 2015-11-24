class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  # @@twilio_client = Twilio::REST::Client.new ENV['ACCOUNT_SID'], ENV['AUTH_TOKEN']

  def is_authenticated?
  	unless current_user
  		flash[:danger] = "Authentication error"
  		redirect_to root_path
  	end
  end

  def current_user
  	@current_user ||= User.find_by_id(session[:user_id])
  end
end
