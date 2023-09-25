Rails.application.routes.draw do
  namespace :admin do
    root 'home#index'
  end
  devise_for :admins, controllers: { sessions: 'admins/sessions' }
  post 'api/check_user', to: 'user_auth#check_user'
  post 'api/register', to: 'users#create'
end

