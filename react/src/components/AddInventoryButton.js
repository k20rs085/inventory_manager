import React, { useState } from 'react';
import './AddInventoryButton.css'; 
import AddInventory from './AddInventory'; // 画像表示のコンポーネントをインポート

function AddInventoryButton({ name, onSubmit }) {
    const [isImageVisible, setIsImageVisible] = useState(false);

    // 画像を表示する関数
    const handleClick = () => {
        setIsImageVisible(true);
        console.log(name);
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
                <AddInventory onClose={closeImage} onSubmit={onSubmit} name={name} />
            )}
        </div>
    );
}

export default AddInventoryButton;
