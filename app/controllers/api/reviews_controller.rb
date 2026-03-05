class Api::ReviewsController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index
    @reviews = Review.where(listing_id: params[:listing_id]).includes(:reviewer)
    render :index
  end

  def show
    @review = Review.find_by(id: params[:id])
    if @review
      render :show
    else
      render json: { errors: ["Review not found"] }, status: :not_found
    end
  end

  def create
    @review = Review.new(review_params)
    @review.reviewer_id = current_user.id
    @review.listing_id = params[:listing_id]
    if @review.save
      render :show
    else
      render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @review = Review.find_by(id: params[:id])
    if @review.reviewer_id == current_user.id
      if @review.update(review_params)
        render :show
      else
        render json: { errors: @review.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["You must be the author to edit this review"] }, status: :unauthorized
    end
  end

  def destroy
    @review = Review.find_by(id: params[:id])
    if @review.reviewer_id == current_user.id
      @review.destroy
      render json: { message: "Review deleted" }
    else
      render json: { errors: ["You must be the author to delete this review"] }, status: :unauthorized
    end
  end

  private

  def review_params
    params.require(:review).permit(:body, :overall, :cleanliness, :accuracy, :communication, :location, :check_in, :value)
  end
end