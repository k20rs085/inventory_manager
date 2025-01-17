import React, { useState } from 'react';
import './DeleteInventoryButton.css'; 

function DeleteInventoryButton({ name, onSubmit }) {
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
            <a className="button05" onClick={handleClick}> − </a>
        </div>
    );
}

export default DeleteInventoryButton;
