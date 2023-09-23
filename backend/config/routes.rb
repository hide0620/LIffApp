Rails.application.routes.draw do
	post 'api/check_user', to: 'user_auth#check_user'
end
