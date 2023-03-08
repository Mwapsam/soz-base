class ProductsController < ApplicationController
    def index
        return @products if defined?(@products)
        begin
          @products = Product.includes(:transactions).sorted
          if @products.present?
            render json: @products, include: :transactions, status: 200
          else
            render json: { error: 'There are no products at the moment' }, status: 404
          end
        rescue StandardError => e
          render json: { error: e.message }, status: 500
        end
    end
      

    def create
        if logged_in?
            product = Product.new(product_params)
            if product.save!
                render json: product, status: 200
            else
                render json: {error: "The product was not saved, please try again later"}, status: 401
            end
        else
            render json: {error: "Unauthorized action!"}, status: 401
        end
    end

    def update
        if logged_in?
            product = Product.find(params[:id])
            if product.update(product_params)
                render json: product, status: 200
            else
                render json: {error: "The product was not updated, please try again later"}, status: 401
            end
        else
            render json: {error: "Unauthorized action!"}, status: 401
        end
    end

    def destroy
        if logged_in?
            product = Product.find(params[:id])
            if product.destroy
                render json: {error: "The product was successfully deleted!"}, status: 401
            else
                render json: {error: "The product was not deleted, please try again later"}, status: 401
            end
        else
            render json: {error: "Unauthorized action!"}, status: 401
        end
    end

    def make_public
        product = Product.find(params[:id])
        if product.publish
            product.publish = false
        else
            product.publish = true
        end
        if product.save!
            render json: product, status: 200
        end
    end

    
    def admin_products
        return @products if defined?(@products)
      
        if logged_in?
          @products = Product.includes(:transactions, :orderables, :carts).all
          if @products.present?
            render json: @products, status: 200
          else
            render json: {error: 'There are no products at the moment'}, status: 401
          end
        else
          render json: {error: "Unauthorized action!"}, status: 401
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
        params.require(:product).permit(:name, :description, :price, :currency, photos: [])
    end
end
