class Creditcard < ApplicationRecord
    # テーブル名を指定
    self.table_name = 'creditcard'
  
    # 主キーを指定（通常は不要です）
    self.primary_key = 'id' # これはデフォルトの'id'です
  
    # 患者との関連付け
    belongs_to :patient, class_name: 'User', foreign_key: 'patient_id'
  
    # バリデーションルールを設定
    validates :payjp_id, presence: true
    validates :patient_id, presence: true
  end