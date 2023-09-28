class ReservationSchedule < ApplicationRecord
  validates :date, presence: true, uniqueness: true
  validate :date_cannot_be_in_the_past
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :recurring_flag, inclusion: { in: [true, false] }

  DEADLINE_OPTIONS = [5, 10, 15, 30, 60, 120, 180, 240, 300, 360, 720, 1440] # 分単位
  validates :reservation_deadline, inclusion: { in: DEADLINE_OPTIONS, message: "must be one of the predefined options" }
  validate :start_time_before_end_time

  def self.create_recurring_schedules(params)
    start_date = params[:date].to_date
    end_date = start_date + 1.year

    start_time = Time.zone.local(params["start_time(1i)"].to_i, params["start_time(2i)"].to_i, params[:date].to_date.day, params["start_time(4i)"].to_i, params["start_time(5i)"].to_i)
    end_time = Time.zone.local(params["end_time(1i)"].to_i, params["end_time(2i)"].to_i, params[:date].to_date.day, params["end_time(4i)"].to_i, params["end_time(5i)"].to_i)

    created_schedules = []

    self.transaction do
      (start_date..end_date).select { |date| date.wday == start_date.wday }.each do |date|
        schedule = self.new(
          date: date,
          start_time: combine_date_and_time(date, start_time),
          end_time: combine_date_and_time(date, end_time),
          recurring_flag: true,
          reservation_deadline: params[:reservation_deadline]
        )

        if schedule.save
          created_schedules << schedule
        else
          Rails.logger.error("Failed to save schedule for date #{date}: #{schedule.errors.full_messages.join(', ')}")
          raise ActiveRecord::Rollback
        end
      end
    end

    created_schedules.any?
  end


  private

  def self.combine_date_and_time(date, time)
    Time.zone.local(date.year, date.month, date.day, time.hour, time.min, time.sec)
  end

  def start_time_before_end_time
    return if start_time.blank? || end_time.blank?

    if start_time >= end_time
      errors.add(:start_time, "終了時刻は開始時刻より後の時間を設定してください。")
    end
  end

  def date_cannot_be_in_the_past
    if date.present? && date < Date.today
      errors.add(:date, "は過去の日付に設定できません。")
    end
  end

end

