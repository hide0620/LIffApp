class UserAuthController < ApplicationController
    skip_before_action :verify_authenticity_token
    require 'rest-client'
    require 'json'

    def check_user
        access_token = params[:access_token]
        line_user_id = get_line_user_id(access_token)

        user = User.find_by(line_user_id: line_user_id)

        if user.nil?
        render json: { is_new_user: true }
        else
        render json: { is_new_user: false }
        end
    end

    private

    def get_line_user_id(access_token)
        response = RestClient.get 'https://api.line.me/v2/profile', { Authorization: "Bearer #{access_token}" }
        json_response = JSON.parse(response.body)
        json_response['userId']
    end
end
