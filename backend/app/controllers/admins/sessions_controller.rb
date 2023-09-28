# frozen_string_literal: true

class Admins::SessionsController < Devise::SessionsController
  # before_action :configure_sign_in_params, only: [:create]

  # def new
  #   super
  # end

  # def create
  #   super
  # end

  # def destroy
  #   super
  # end

  protected
  def after_sign_out_path_for(resource_or_scope)
    new_admin_session_path
  end

  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
