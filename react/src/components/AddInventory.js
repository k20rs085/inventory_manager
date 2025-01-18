import React, { useRef } from 'react';
import './AddSeries.css';

function AddInventory({ data, onClose, onSubmit = () => {} }) {
    const {name, series} = data;
    const formRef = useRef(null);
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.owner = 'marik@90148';
        data.series = series;
        console.log('送信データ:', data);

        try {
            const response = await fetch('http://localhost:3000/api/v1/submitInventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                const result = await response.json();
                console.log('送信成功:', result);
                const new_data = {
                    id: result.id,  // result.messageをidに使用
                    name: data.name,
                    owner: data.owner,
                    series: data.series
                };
                console.log(new_data);
                onSubmit(new_data); // 呼び出し元に通知
                
                formRef.current.reset();
                //onClose(); // モーダルを閉じる
            } else {
                console.error('送信失敗:', await response.text());
            }
        } catch (error) {
            console.error('送信中のエラー:', error);
        }
    };

    return (
        <div className="image-overlay">
            <form ref={formRef} className="form-content" onSubmit={handleSubmit}>
                <h2>{name}</h2>

                <label>
                    巻号、巻名:
                    <input type="text" name="name" required />
                </label>

                <div className="form-buttons">
                    <button type="submit">送信</button>
                    <button type="button" onClick={onClose}>閉じる</button>
                </div>
            </form>
        </div>
    );
}

export default AddInventory;
