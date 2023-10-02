import React, { useState } from 'react';
import "../styles/PaymentMethodSelect.css"

export const PaymentMethodSelect = ({ onBack, onSelect, selectedDateTime }) => {
  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleSubmit = () => {
    if (paymentOption === 'クレジットカード') {
      if (!/^\d+$/.test(cardNumber) || !/^\d{2}\/\d{2}$/.test(expiryDate) || !/^\d+$/.test(securityCode)) {
        setError('入力が正しくありません。クレジットカード番号、期限、セキュリティコードは半角数字のみを入力してください。期限はMM/YYの形式で入力してください。');
        return;
      }
      setError('');
      onSelect({
        paymentOption,
        cardDetails: {
          cardNumber,
          expiryDate,
          securityCode
        }
      });
    } else {
      setError('');
      onSelect(paymentOption);
    }
  };

  return (
    <div>
      <h4>選択した予約日時：{selectedDateTime}</h4>
      <div className="payment-selection">
        <h4>お支払い方法の選択</h4>
        <div>
          <label>
            <input
              type="radio"
              value="クレジットカード"
              checked={paymentOption === 'クレジットカード'}
              onChange={handlePaymentOptionChange}
            />
            クレジットカード払い
          </label>
        </div>
        {paymentOption === 'クレジットカード' && (
          <div className="credit-card-details">
            <div className="input-group">
              <label>カード番号:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                className="inputField"
              />
            </div>
            <div className="input-group">
              <label>期限:</label>
              <input
                type="text"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                placeholder="MM/YY"
                className="inputField"
              />
            </div>
            <div className="input-group">
              <label>セキュリティコード:</label>
              <input
                type="text"
                value={securityCode}
                onChange={(e) => setSecurityCode(e.target.value)}
                className="inputField"
              />
            </div>
            {error && <p className="error-message">{error}</p>}
          </div>
        )}
        <div>
          <label>
            <input
              type="radio"
              value="代引き"
              checked={paymentOption === '代引き'}
              onChange={handlePaymentOptionChange}
            />
            代引き払い
          </label>
        </div>
        <button onClick={handleSubmit}>支払い方法を確定し予約する</button>
      </div>
      <button onClick={onBack}>時間選択に戻る</button>
    </div>
  );
};

