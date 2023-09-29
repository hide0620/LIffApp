module Api
  module V1
    class ReservationSchedulesController < ApplicationController
      def index
        reservation_schedules = ReservationSchedule.all
        render json: reservation_schedules
      end
    end
  end
end
