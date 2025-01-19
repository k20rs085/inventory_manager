import React, { useState, useEffect } from 'react';
import './Table.css';
import AddInventoryButton from './AddInventoryButton';
import DeleteButton from './DeleteButton';

function Table({ newData }) {
    const [data, setData] = useState([]);
    const [categories, setCategories] = useState([]); // categoryデータを保持
    const [expandedRows, setExpandedRows] = useState({});
    const [childData, setChildData] = useState({});

    // カテゴリデータを取得
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/categories')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch category data');
                }
                return res.json();
            })
            .then((categoryData) => {
                setCategories(categoryData);
                // console.log(categoryData);
            })
            .catch((error) => console.error('Error fetching category data: ', error));
    }, []);

    // seriesデータを取得
    useEffect(() => {
        fetch('http://localhost:3000/api/v1/series')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch series data');
                }
                return res.json();
            })
            .then((seriesData) => {
                // seriesデータとcategoryデータを照合
                const updatedData = seriesData.map((item) => {
                    const category = categories.find((cat) => cat.id === item.category_id);
                    return {
                        ...item,
                        categoryName: category ? category.name : 'Unknown', // categoryのnameを追加
                    };
                });
                setData(updatedData);
                // console.log('Series data updated with categories:', updatedData);
            })
            .catch((error) => console.error('Error fetching series data: ', error));
    }, [categories]); // categoriesが更新されたら再実行

    // 新しいデータ追加時の処理
    useEffect(() => {
        if (newData) {
            const category = categories.find((cat) => cat.id === newData.category_id);
            const updatedItem = {
                ...newData,
                categoryName: category ? category.name : 'Unknown', // categoryのnameを新データに追加
            };

            setData((prevData) => [...prevData, updatedItem]);
        }
    }, [newData]); // newDataとcategoriesが更新されたら実行

    const handleAddInventory = (newData) => {
        setChildData((prev) => {
            const seriesData = prev[newData.series] || [];
            return { ...prev, [newData.series]: [...seriesData, newData] };
        });
    };

    const handleDelete = ({ table, id }) => {
        if (table === 1) {
            // 親データを削除
            setData((prevData) => prevData.filter((item) => item.id !== id));
        } else if (table === 2) {
            // 子データを削除
            setChildData((prev) => {
                const updatedChildData = { ...prev };
                for (const key in updatedChildData) {
                    updatedChildData[key] = updatedChildData[key].filter((child) => child.id !== id);
                }
                return updatedChildData;
            });
        }
    };

    const toggleRow = async (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
        if (!childData[id]) {
            try {
                const response = await fetch('http://localhost:3000/api/v1/inventory', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });
                if (response.ok) {
                    const result = await response.json();
                    setChildData((prev) => ({ ...prev, [id]: result }));
                } else {
                    console.error('Failed to fetch child data');
                }
            } catch (error) {
                console.error('Error fetching child data:', error);
            }
        }
    };

    return (
        <div>
            <table className="table_box">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>+</th>
                        <th>−</th>
                    </tr>
                </thead>
                <tbody>
                    {data.length > 0 ? (
                        data.map((item, index) => (
                            <React.Fragment key={index}>
                                <tr>
                                    <td onClick={() => toggleRow(item.id)}>
                                        {item.name} ({item.categoryName}) {/* categoryの名前を表示 */}
                                    </td>
                                    <td>
                                        <AddInventoryButton data={{ name: item.name, series: item.id }} onSubmit={handleAddInventory} />
                                    </td>
                                    <td>
                                        <DeleteButton data={{ table: 1, id: item.id }} onDelete={handleDelete} />
                                    </td>
                                </tr>
                                {expandedRows[item.id] && childData[item.id] && (
                                    <tr>
                                        <td colSpan="3">
                                            <table className="nested-table">
                                                <colgroup>
                                                    <col style={{ width: '90%' }} />
                                                    <col style={{ width: '10%' }} />
                                                </colgroup>
                                                <tbody>
                                                    {childData[item.id].map((detail, detailIndex) => (
                                                        <tr key={detailIndex}>
                                                            <td>{detail.name}</td>
                                                            <td className="delete-btn">
                                                                <DeleteButton data={{ table: 2, id: detail.id }} onDelete={handleDelete} />
                                                            </td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading data...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
