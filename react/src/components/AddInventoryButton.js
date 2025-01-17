import React, { useState } from 'react';
import './AddInventoryButton.css'; 
import FormOverlay from './FormOverlay'; // 画像表示のコンポーネントをインポート

function AddInventoryButton({ onSubmit }) {
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
      <a className="button04" onClick={handleClick}> + </a>

      {/* フォームを表示 */}
      {isImageVisible && (
        <FormOverlay onClose={closeImage} onSubmit={onSubmit} />
      )}
    </div>
  );
}

export default AddInventoryButton;
