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
        product.user_id = current_user.id
        if product.save
            render json: product, status: 200
        else
            render json: {error: "The product was not saved, please try again later"}, status: 401
        end
    end

    def product_params
        params.permit(:name, :description, :price, :currency, photos: [])
    end
end
