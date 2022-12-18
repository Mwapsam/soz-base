Rails.application.routes.draw do
  resources :products
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :users, only: [:create, :index]
  resources :sessions, only: [:create, :destroy]

  get 'getuser', to: "users#getUser"
  get 'home/index'
  root 'home#index'
end
