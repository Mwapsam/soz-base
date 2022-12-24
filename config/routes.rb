Rails.application.routes.draw do
  get 'payments/create'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  
  resources :users, only: [:create, :index]
  resources :sessions, only: [:create, :destroy]
  resources :webhooks, only: [:create]
  resources :products, only: [:create, :index] do
    get :search, on: :collection
    get :photos, on: :member
  end

  post '/create-checkout-session', to: "payments#create"
  post "products/add_to_cart/:id", to: "products#add_to_cart", as: "add_to_cart"
  delete "products/remove_from_cart/:id", to: "products#remove_from_cart"
  get "products/get_cart", to: "products#get_cart"
  get "success", to: "checkout#success"
  get "cancel", to: "checkout#cancel"

  get 'getuser', to: "users#getUser"
  get 'home/index'
  root 'home#index'
end
