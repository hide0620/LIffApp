class Reservation < ApplicationRecord
    # テーブル名を指定
    self.table_name = 'reservations'
  
    # 主キーを指定（通常は不要です）
    self.primary_key = 'id' # これはデフォルトの'id'です
  
    # 患者との関連付け
    belongs_to :patient, class_name: 'User', foreign_key: 'patient_id'
    
    attribute :date, :date
    
    # start_timeとstart_toを時間属性として定義
    attribute :start_time, :time
    attribute :start_to, :time
  end