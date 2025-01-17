import React, { useState } from 'react';
import './AddSeriesButton.css'; 
import FormOverlay from './FormOverlay'; // 画像表示のコンポーネントをインポート

function AddSeriesButton({ onSubmit }) {
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

      {/* フォームを表示 */}
      {isImageVisible && (
        <FormOverlay onClose={closeImage} onSubmit={onSubmit} />
      )}
    </div>
  );
}

export default AddSeriesButton;
