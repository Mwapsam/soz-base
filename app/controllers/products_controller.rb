class ProductsController < ApplicationController
    before_action :require_admin, only: [:create, :update, :destroy, :make_public, :admin_products]

    def index
        @products = Product.includes(:transactions, :carts, :orderables).sorted
    
        if @products.present?
          render json: @products, include: :transactions, status: :ok
        else
          render json: { error: 'There are no products at the moment' }, status: :not_found
        end
    rescue StandardError => e
        render json: { error: e.message }, status: :internal_server_error
    end

    def latest_products
      @products = Product.includes(:transactions, :carts, :orderables).latest
  
      if @products.present?
        render json: @products, include: :transactions, status: :ok
      else
        render json: { error: 'There are no products at the moment' }, status: :not_found
      end
    rescue StandardError => e
      render json: { error: e.message }, status: :internal_server_error
    end
    
    def create
        product = Product.new(product_params)
    
        if product.save
          render json: product, status: :ok
        else
          render json: { error: 'The product was not saved, please try again later' }, status: :unauthorized
        end
    end
    
    def update
        product = Product.find(params[:id])
    
        if product.update(product_params)
          render json: product, status: :ok
        else
          render json: { error: 'The product was not updated, please try again later' }, status: :unauthorized
        end
    end
    
    def destroy
        product = Product.find(params[:id])
    
        if product.destroy
          render json: { message: 'The product was successfully deleted!' }, status: :ok
        else
          render json: { error: 'The product was not deleted, please try again later' }, status: :unauthorized
        end
    end
    
    def make_public
        product = Product.find(params[:id])
    
        product.toggle!(:publish)
    
        render json: product, status: :ok
    end
    
    def admin_products
        @products = Product.includes(:transactions, :orderables, :carts).all
    
        if @products.present?
          render json: @products, status: :ok
        else
          render json: { error: 'There are no products at the moment' }, status: :not_found
        end
    end

    def orders 
        orders ||= Orderable.get_orders(@cart)
        render json: orders, status: 200
    end

    def get_cart
        render json: @line_items
    end

    def add_to_cart
        @product = Product.find_by(id: params[:id])
        quantity = params[:quantity].to_i
        current_orderable = @cart.orderables.find_or_initialize_by(product_id: @product.id)
      
        if quantity > 0
          current_orderable.update(quantity: quantity)
        else
          current_orderable.destroy
        end
      
        if current_orderable.persisted?
          render json: @product, status: 200
        else
          render json: { error: "Product could not be added to cart" }, status: 422
        end
    end 

    def remove_from_cart
        order = Orderable.find_by(product_id: params[:id])
        order.destroy!
    end

    def increment_func
        order = Orderable.find(params[:id])
        Orderable.increase_quantity(order)
        product = Product.find_by(id: order.product_id)
        render json: product, status: 200
    end

    def decrease_func
        order = Orderable.find(params[:id])
        Orderable.decrease_quantity(order)
        product = Product.find_by(id: order.product_id)
        render json: product, status: 200
    end

    def search
        if params[:query].present?
            @search_results = Product.product_search(params[:query])
            render json: @search_results
        else
            @search_results = []
        end
    end

    private

    def product_params
        params.permit(:name, :description, :price, :currency, photos: [])
    end

    def require_admin
        render json: { error: "Unauthorized action!" }, status: :unauthorized unless current_user&.role == 'admin'
    end
end
