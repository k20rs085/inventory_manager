import React, { useEffect, useState } from 'react';
import './AddSeries.css';

function AddInventory({ name, onClose, onSubmit = () => {} }) {
    const [authorList, setAuthorList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('');

    // データの取得
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [authorsRes, categoriesRes] = await Promise.allSettled([
                    fetch('http://localhost:3000/api/v1/authors'),
                    fetch('http://localhost:3000/api/v1/categories'),
                ]);

                if (authorsRes.status === "fulfilled") {
                    setAuthorList(await authorsRes.value.json());
                } else {
                    console.error("作者取得失敗:", authorsRes.reason);
                }

                if (categoriesRes.status === "fulfilled") {
                    setCategoryList(await categoriesRes.value.json());
                } else {
                    console.error("カテゴリ取得失敗:", categoriesRes.reason);
                }
            } catch (error) {
                console.error('データ取得全体エラー:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());
        data.owner = 'marik@90148';
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
                    id: result.inventoryId,
                    name: data.name,
                    author_id: data.author,
                    owner_id: data.owner,
                    category_id: data.category
                };
                onSubmit(new_data); // 呼び出し元に通知
                //onClose(); // モーダルを閉じる
            } else {
                console.error('送信失敗:', await response.text());
            }
        } catch (error) {
            console.error('送信中のエラー:', error);
        }
    };

    const handleAddNewOption = async (type, value, setter, apiEndpoint, list) => {
        if (!value || list.some(item => item.name === value)) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:3000/api/v1/${apiEndpoint}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ [type]: value }),
            });

            if (response.ok) {
                const newItem = await response.json();
                setter((prev) => [...prev, { id: newItem[`${type}Id`], name: newItem[`${type}Name`] }]);
            } else {
                console.error(`${type}追加失敗`);
            }
        } catch (error) {
            console.error(`${type}追加エラー:`, error);
        }
    };

    return (
        <div className="image-overlay">
            <form className="form-content" onSubmit={handleSubmit}>
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
