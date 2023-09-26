module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :verify_authenticity_token

      def create
        # アクセストークンを取得
        access_token = params[:access_token]

        # LINE APIを使用してユーザー情報を取得
        line_user_id = get_line_user_id(access_token)

        # ユーザー情報とともに新規ユーザーを作成または更新
        user = User.find_or_initialize_by(line_user_id: line_user_id)
        user.update(user_params)

        if user.save
          render json: { message: 'User registered successfully' }, status: :created
        else
          render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:patient_name, :patient_name_kana, :gender, :birthday, :phone_number, :post_number, :address, :email)
      end

      def get_line_user_id(access_token)
        response = RestClient.get 'https://api.line.me/v2/profile', { Authorization: "Bearer #{access_token}" }
        json_response = JSON.parse(response.body)
        json_response['userId']
      end
    end
  end
end
