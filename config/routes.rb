Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  resources :users, only: [:create, :index]
  resources :sessions, only: [:create, :destroy]
  resources :products, only: [:create, :index] do
    get :photos, on: :member
  end

  get 'getuser', to: "users#getUser"
  get 'home/index'
  root 'home#index'
end
