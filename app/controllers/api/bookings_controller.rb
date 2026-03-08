class Api::BookingsController < ApplicationController
  before_action :require_logged_in

  def index
    if params[:listing_id]
      @bookings = Booking.where(listing_id: params[:listing_id]).includes(:listing)
    else
      @bookings = current_user.bookings.includes(:listing)
    end
    render :index
  end

  def show
    @booking = Booking.find_by(id: params[:id])
    if @booking
      render :show
    else
      render json: { errors: ["Booking not found"] }, status: :not_found
    end
  end

  def create
    @booking = Booking.new(booking_params)
    @booking.guest_id = current_user.id
    @booking.listing_id = params[:listing_id]
    if @booking.save
      render :show
    else
      render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    @booking = Booking.find_by(id: params[:id])
    if @booking.guest_id == current_user.id
      if @booking.update(booking_params)
        render :show
      else
        render json: { errors: @booking.errors.full_messages }, status: :unprocessable_entity
      end
    else
      render json: { errors: ["You can only edit your own bookings"] }, status: :unauthorized
    end
  end

  def destroy
    @booking = Booking.find_by(id: params[:id])
    if @booking.guest_id == current_user.id
      @booking.destroy
      render json: { message: "Booking cancelled" }
    else
      render json: { errors: ["You can only cancel your own bookings"] }, status: :unauthorized
    end
  end

  private

  def booking_params
    params.require(:booking).permit(:start_date, :end_date, :num_guests)
  end
end
