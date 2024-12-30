// AddButton.js
import React, { useState } from 'react';
import './AddButton.css'; 
import FormOverlay from './FormOverlay'; // 画像表示のコンポーネントをインポート

function AddButton() {
  const [isImageVisible, setIsImageVisible] = useState(false);

  // 画像を表示する関数
  const handleClick = () => {
    setIsImageVisible(true);
  };

  // 画像を非表示にする関数
  const closeImage = () => {
    setIsImageVisible(false);
  };

  return (
    <div>
      <button className="button_plus" onClick={handleClick} />

      {/* 画像が表示される */}
      {isImageVisible && (
        <FormOverlay onClose={closeImage} />
      )}
    </div>
  );
}

export default AddButton;
