class Api::ListingsController < ApplicationController
  before_action :require_logged_in, only: [:create, :update, :destroy]

  def index
    @listings = Listing.all
    render :index
  end

  def show
    @listing = Listing.find_by(id: params[:id])
    if @listing
      render :show
    else
      render json: { errors: ["Listing not found"] }, status: :not_found
    end
  end

  def create
    @listing = Listing.new(listing_params)
    @listing.host_id = current_user.id
    if @listing.save
      render :show
    else
      render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @listing = Listing.find_by(id: params[:id])
    if @listing.host_id == current_user.id
      if @listing.update(listing_params)
        render :show
      else
        render json: { errors: @listing.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["You must be the host to edit this listing"] }, status: :unauthorized
    end
  end

  def destroy
    @listing = Listing.find_by(id: params[:id])
    if @listing.host_id == current_user.id
      @listing.destroy
      render json: { message: "Listing deleted" }
    else
      render json: { errors: ["You must be the host to delete this listing"] }, status: :unauthorized
    end
  end

  private

  def listing_params
    params.require(:listing).permit(:title, :description, :address, :city, :country, :price, :num_beds, :num_rooms, :num_bathrooms, :longitude, :latitude, :photo, :photo_url)
  end
end