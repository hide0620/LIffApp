class ReservationSchedule < ApplicationRecord
  validates :date, presence: true, uniqueness: true
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :recurring_flag, inclusion: { in: [true, false] }
  DEADLINE_OPTIONS = [5, 10, 15, 30, 60, 120, 180, 240, 300, 360, 720, 1440] # 分単位
  validates :reservation_deadline, inclusion: { in: DEADLINE_OPTIONS, message: "must be one of the predefined options" }
  validate :start_time_before_end_time

  def self.create_recurring_schedules(params)
    start_date = params[:date].to_date
    end_date = start_date + 1.year

    self.transaction do
      (start_date..end_date).select { |date| date.wday == start_date.wday }.each do |date|
        self.create!(
          date: date,
          start_time: params[:start_time],
          end_time: params[:end_time],
          recurring_flag: true,
          reservation_deadline: params[:reservation_deadline]
        )
      end
    end
  end


  private

  def start_time_before_end_time
    return if start_time.blank? || end_time.blank?

    if start_time >= end_time
      errors.add(:start_time, "must be before end time")
    end
  end
end

