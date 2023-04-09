class ReviewsController < ApplicationController
  def index
    reviews = Review.all
    render json: reviews, status: 200
  end

  def create
    review = Review.new(reviews_params)
    if review.save
      render json: review, status: :created
    else
      render json: review.errors.full_messages.to_sentence, status: :unprocessable_entity
    end
  end

  def destroy
    review = Review.find(params[:id])
    if review.destroy
      render json: {message: "Review successfully deleted!"}
    else
      render json: review.errors.full_messages.to_sentence, status: :unprocessable_entity
    end
  end

  private

  def reviews_params
    params.require(:review).permit(:rating, :comment, :user_id, :product_id);
  end
end
