import React, { useState } from 'react';
import './AddSeriesButton.css'; 
import AddSeries from './AddSeries'; // 画像表示のコンポーネントをインポート

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
        <AddSeries onClose={closeImage} onSubmit={onSubmit} />
      )}
    </div>
  );
}

export default AddSeriesButton;
