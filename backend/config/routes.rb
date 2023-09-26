Rails.application.routes.draw do
  namespace :admin do
    root 'home#index'
  end
  devise_for :admins, controllers: { sessions: 'admins/sessions' }

  # API用のルーティング
  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      post 'check_user', to: 'user_auth#check_user'
      post 'register', to: 'users#create'
    end
  end
end
