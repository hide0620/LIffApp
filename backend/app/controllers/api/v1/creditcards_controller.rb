module Api
    module V1
      class CreditcardsController < ApplicationController
        def create_creditcard

          datetime_string = params[:selectedDateTime]
          # 空白文字で文字列を分割
          date_and_time_parts = datetime_string.split(" ")
          # 日付は最初の要素
          date = date_and_time_parts[0]
          # 時間帯は2番目の要素
          time_range = date_and_time_parts[1]
          # 時間帯をハイフンで分割
          start_time, end_time = time_range.split("-")

          tokenValue = params[:tokenValue]
          userId = params[:userId]
          # Creditcard レコードを作成して保存
          @creditcard = Creditcard.new(payjp_id: tokenValue, patient_id: userId)
          puts(date, start_time, end_time)
          # Reservation レコードを作成して保存
          @reservation  = Reservation.new(date: date, start_time: start_time, start_to: end_time)
          if @creditcard.save and @reservation.save
            render json: { success: true }
          else
            render json: { success: false }
          end
        end
      end
    end
  end
  