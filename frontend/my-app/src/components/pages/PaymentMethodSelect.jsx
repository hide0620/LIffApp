import React, { useState, useEffect } from 'react';
import "../styles/PaymentMethodSelect.css"
import axios from 'axios';

export const PaymentMethodSelect = ({ onBack, onSelect, selectedDateTime }) => {
  const [paymentOption, setPaymentOption] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (paymentOption === 'クレジットカード') {
      let script = document.createElement('script');
      script.src = 'https://checkout.pay.jp/';
      script.className = 'payjp-button';
      script.dataset.key = 'pk_test_08fa497902b268abc218dceb';
      script.dataset.submitText = 'トークンを作成する';
      script.dataset.partial = 'true';
      document.body.appendChild(script);
    }
    if (paymentOption === '代引き'){
      const element = document.getElementById('payjp_checkout_box');
      if (element) {
        element.parentNode.removeChild(element);
      }
    }
  }, [paymentOption]); // paymentOptionの変更時に実行

  const handlePaymentOptionChange = (e) => {
    setPaymentOption(e.target.value);
  };

  const handleSubmit = () => {
    function getCookie(name) {
      const decodedCookie = decodeURIComponent(document.cookie);
      const cookies = decodedCookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        if (cookie.indexOf(name + "=") === 0) {
          return cookie.substring(name.length + 1);
        }
      }
      return "";
    }
    // 要素を取得
    const hiddenInput = document.querySelector('input[name="payjp-token"]');
    // value属性を取得
    const tokenValue = hiddenInput.value;
    const userId = getCookie('user_id')
    // Rails APIにデータを送信
    axios.get('http://localhost:3001/api/v1/create_creditcard',{
      params: {
        tokenValue: tokenValue,
        userId: userId,
        selectedDateTime: selectedDateTime,
      }
    })
      .then((response) => {
        if (response.ok) {
          // サーバーからの応答が成功した場合の処理
          return response.json(); // レスポンスデータをJSONとして解析
        } else {
          // サーバーからの応答がエラーの場合の処理
          throw new Error('サーバーエラー');
        }
      })
      .then((data) => {
        // サーバーからの応答データを利用して何かしらの処理
        console.log('成功:', data);
      })
      .catch((error) => {
        // エラーハンドリング
        console.log('エラー:', error);
      });
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
          <script
            type="text/javascript"
            src="https://checkout.pay.jp/"
            class="payjp-button"
            data-key="pk_test_08fa497902b268abc218dceb"
            data-submit-text="トークンを作成する"
            data-partial="true">
          </script>
        </div>
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
        {paymentOption === 'クレジットカード' && (
          <div
            className="payjp-button"
            src="https://checkout.pay.jp/"
            data-key="pk_test_08fa497902b268abc218dceb"
            data-submit-text="トークンを作成する"
            data-partial="true"
          ></div>
        )}
        <button onClick={handleSubmit}>支払い方法を確定し予約する</button>
      </div>
      <button onClick={onBack}>時間選択に戻る</button>
    </div>
  );
};

