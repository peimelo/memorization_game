class ApplicationController < ActionController::API
  include Authenticable

  def index
    render file: 'public/index.html'
  end
end
