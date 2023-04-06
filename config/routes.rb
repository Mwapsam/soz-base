Rails.application.routes.draw do
  get 'payments/create'
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  
  resources :users, only: [:create, :index]
  resources :transactions, only: [:index]
  resources :sessions, only: [:create, :destroy]
  resources :webhooks, only: [:create]
  resources :addresses, only: [:index, :update]
  resources :products, only: [:create, :index, :update, :destroy] do
    get :search, on: :collection
    get :photos, on: :member
    get :admin_products, on: :collection
  end

  post '/create-checkout-session', to: "payments#create"
  post '/create-address', to: 'addresses#create_address'
  post "products/add_to_cart/:id", to: "products#add_to_cart", as: "add_to_cart"
  post "products/remove_from_cart/:id", to: "products#remove_from_cart"
  post "make_public/:id", to: "products#make_public"
  
  get "products/get_cart", to: "products#get_cart"
  get "get_orders", to: "products#orders"
  get "success/:session_id", to: "payments#success"
  get "success", to: "payments#good"
  get "cancel", to: "payments#cancel"
  post "/confirm-payment", to: "payments#confirm_payment"

  get "customers", to: "transactions#get_details"
  get "all_transactions", to: "transactions#all_transactions"
  get "latest_products", to: "products#latest_products"
  post '/increment-quantity/:id', to: "products#increment_func"
  post '/decrement-quantity/:id', to: "products#decrease_func"
  post '/order-fulfilment/:id', to: "transactions#fulfil_order"

  get 'getuser', to: "users#getUser"
  get 'home/index'
  root 'home#index'
end