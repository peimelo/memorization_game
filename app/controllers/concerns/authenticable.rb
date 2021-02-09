module Authenticable
  private

  def authenticate_with_token
    @token ||= request.headers['Authorization']

    unless valid_token?
      render json: { errors: 'Unauthorized' },
             status: :unauthorized
    end
  end

  def valid_token?
    @token.present? && @token.size >= 10 && @token == Rails.application.credentials.token
  end
end
