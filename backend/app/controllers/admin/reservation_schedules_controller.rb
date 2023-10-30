require 'payjp'

class Admin::ReservationSchedulesController < ApplicationController

  def create
    if params[:reservation_schedule][:recurring_flag] == '1'
      ReservationSchedule.create_recurring_schedules(reservation_schedule_params)
    else
      ReservationSchedule.create!(reservation_schedule_params)
    end

    redirect_to admin_reservation_schedules_path, notice: '予約枠を保存しました。'
  end

  def edit
    @reservation_schedule = ReservationSchedule.find_or_initialize_by(date: params[:id])
  end

  def update
    if params[:reservation_schedule][:recurring_flag] == '1'
      if ReservationSchedule.update_recurring_schedules(reservation_schedule_params)
        redirect_to admin_reservation_schedules_path, notice: '予約枠を一括更新しました。'
      else
        render :edit
      end
    else
      @reservation_schedule = ReservationSchedule.find(params[:id])
      if @reservation_schedule.update(reservation_schedule_params)
        redirect_to admin_reservation_schedules_path, notice: '予約枠を更新しました。'
      else
        render :edit
      end
    end
  end

  def destroy
    Payjp.api_key = 'sk_test_7f1d769ec5709713a860b835'
    Payjp.open_timeout = 30 # optionally
    Payjp.read_timeout = 90 # optionally
    
    # ex, create charge
    charge = Payjp::Charge.create(
      :amount => 999,
      :card => 'tok_7ee563916ab1a1603957f91c8429',
      :currency => 'jpy',
    )
    @reservation_schedule = ReservationSchedule.find(params[:id])
    @reservation_schedule.destroy
    redirect_to admin_reservation_schedules_path, notice: '指定した日の予約枠を削除しました。'
  end

  private

  def reservation_schedule_params
    params.require(:reservation_schedule).permit(:date, :start_time, :end_time, :recurring_flag, :reservation_deadline)
  end

end
