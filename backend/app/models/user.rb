class User < ApplicationRecord
  # ユーザー名の存在性と長さのバリデーション
  validates :patient_name, presence: true, length: { maximum: 50 }

  # カナの存在性と長さのバリデーション
  validates :patient_name_kana, presence: true, length: { maximum: 50 }, format: { with: /\A[\p{katakana}\p{blank}ー－]+\z/, message: "カナ文字以外登録できません" }

  # 性別の存在性と許可された値のバリデーション
  validates :gender, presence: true, inclusion: { in: %w[male female], message: "%{value} is not a valid gender" }

  # 生年月日の存在性のバリデーション
  validates :birthday, presence: true

  # 電話番号のフォーマットと長さのバリデーション
  validates :phone_number, presence: true, format: { with: /\A\d{10,11}\z/, message: "10、11以内で入力して下さい" }

  # 郵便番号のフォーマットのバリデーション
  validates :post_number, presence: true, format: { with: /\A\d{7}\z/, message: "ハイフンは含みません。" }

  # 住所の存在性と長さのバリデーション
  validates :address, presence: true, length: { maximum: 255 }

  # メールアドレスのフォーマットのバリデーション
  validates :email, presence: true, format: { with: URI::MailTo::EMAIL_REGEXP }, uniqueness: true
end
