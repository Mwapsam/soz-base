class ProductsController < ApplicationController
    def index
        products = Product.all
        if products.present?
            render json: products, status: 200
        else
            render json: {error: 'There are no products at the moment'}, status: 401
        end
    end

    def create
        product = Product.new(product_params)
        if product.save!
            render json: product, status: 200
        else
            render json: {error: "The product was not saved, please try again later"}, status: 401
        end
    end

    def get_cart
        render json: @cart
    end

    def add_to_cart
        id = params[:id].to_i
        session[:cart] << id unless session[:cart].include?(id)
        render json: @cart, status: 200
    end

    def remove_from_cart
        id = params[:id].to_i
        session[:cart].delete(id)
        render json: @cart, status: 200
    end

    def product_params
        params.permit(:name, :description, :price, :currency, photos: [])
    end
end
