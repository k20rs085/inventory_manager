import React from 'react';
import './DeleteButton.css'; 

function DeleteButton({ data, onDelete }) {
    const { table, id } = data;

    const handleClick = async (event) => {
        event.preventDefault();

        // 削除確認
        const isConfirmed = window.confirm('本当に削除しますか？');
        if (!isConfirmed) {
            return; // ユーザーがキャンセルを押した場合、処理を中断
        }

        try {
            const response = await fetch('http://localhost:3000/api/v1/deleteItem', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                // console.log('削除成功:', result);

                // 削除成功時に親へ通知
                if (onDelete) {
                    onDelete({ table, id });
                }
            } else {
                console.error('削除失敗:', await response.text());
            }
        } catch (error) {
            console.error('削除中のエラー:', error);
        }
    };

    return (
        <div>
            <a className="button05" onClick={handleClick}> − </a>
        </div>
    );
}

export default DeleteButton;
