import React, { useEffect, useState } from 'react';
import './FormOverlay.css';

function FormOverlay({ onClose, onSubmit }) {
    const [seriesList, setSeriesList] = useState([]);
    const [authorList, setAuthorList] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [newSeries, setNewSeries] = useState('');
    const [newAuthor, setNewAuthor] = useState('');
    const [newCategory, setNewCategory] = useState('');

    // バックエンドからシリーズ、作者、カテゴリを取得
    useEffect(() => {
        const fetchOptions = async () => {
            try {
                const [seriesResponse, authorsResponse, categoriesResponse] = await Promise.all([
                    fetch('http://localhost:3000/api/v1/series'),
                    fetch('http://localhost:3000/api/v1/authors'),
                    fetch('http://localhost:3000/api/v1/categories'),
                ]);

                if (!seriesResponse.ok || !authorsResponse.ok || !categoriesResponse.ok) {
                    throw new Error('データ取得エラー');
                }

                setSeriesList(await seriesResponse.json());
                setAuthorList(await authorsResponse.json());
                setCategoryList(await categoriesResponse.json());
            } catch (error) {
                console.error('データ取得エラー:', error);
            }
        };

        fetchOptions();
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const data = Object.fromEntries(formData.entries());

        // 新しい選択肢が追加された場合、それをフォームデータに含める
        if (newSeries) data.series = newSeries;
        if (newAuthor) data.author = newAuthor;
        if (newCategory) data.category = newCategory;

        onSubmit(data);
        onClose();
    };

    const addNewSeries = () => {
        if (newSeries && !seriesList.includes(newSeries)) {
            setSeriesList([...seriesList, newSeries]);
            setNewSeries('');
        }
    };

    const addNewAuthor = () => {
        if (newAuthor && !authorList.includes(newAuthor)) {
            setAuthorList([...authorList, newAuthor]);
            setNewAuthor('');
        }
    };

    const addNewCategory = () => {
        if (newCategory && !categoryList.includes(newCategory)) {
            setCategoryList([...categoryList, newCategory]);
            setNewCategory('');
        }
    };

    return (
        <div className="image-overlay">
            <form className="form-content" onSubmit={handleSubmit}>
                <h2>Add Item</h2>
                <label>
                    名前:
                    <input type="text" name="name" required />
                </label>
                <label>
                    シリーズ:
                    <select name="series" required>
                        <option value="">選択してください</option>
                        {seriesList.map((series, index) => (
                            <option key={index} value={series.name}>
                                {series.name}
                            </option>
                        ))}
                    </select>
                    <div className="add-option">
                        <input
                        type="text"
                        placeholder="新しいシリーズを追加"
                        value={newSeries}
                        onChange={(e) => setNewSeries(e.target.value)}
                        />
                        <button type="button" onClick={addNewSeries}>+</button>
                    </div>
                </label>
                <label>
                    作者:
                    <select name="author" required>
                        <option value="">選択してください</option>
                        {authorList.map((author, index) => (
                            <option key={index} value={author.name}>
                                {author.name}
                            </option>
                        ))}
                    </select>
                    <div className="add-option">
                        <input
                        type="text"
                        placeholder="新しい作者を追加"
                        value={newAuthor}
                        onChange={(e) => setNewAuthor(e.target.value)}
                        />
                        <button type="button" onClick={addNewAuthor}>+</button>
                    </div>
                </label>
                <label>
                    カテゴリ:
                    <select name="category" required>
                        <option value="">選択してください</option>
                        {categoryList.map((category, index) => (
                            <option key={index} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <div className="add-option">
                        <input
                        type="text"
                        placeholder="新しいカテゴリを追加"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value)}
                        />
                        <button type="button" onClick={addNewCategory}>+</button>
                    </div>
                </label>
                <div className="form-buttons">
                    <button type="submit">送信</button>
                    <button type="button" onClick={onClose}>閉じる</button>
                </div>
            </form>
        </div>
    );
}

export default FormOverlay;
