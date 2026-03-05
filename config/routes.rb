Rails.application.routes.draw do
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html
  post 'api/test', to: 'application#test'
  # Defines the root path route ("/")
  # root "articles#index"


  namespace :api, defaults: { format: :json } do
    resources :users, only: [:create]
    resource :session, only: [:show, :create, :destroy]
    resources :listings, only: [:index, :show, :create, :update, :destroy] do
      resources :reviews, only: [:index, :create]
      resources :bookings, only: [:index, :create]
    end
    resources :reviews, only: [:show, :update, :destroy]
    resources :bookings, only: [:show, :update, :destroy]
  end

  get '*path', to: "static_pages#frontend_index"
end
