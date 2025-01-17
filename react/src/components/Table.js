import React, { useState, useEffect } from 'react';
import './Table.css';
import AddInventoryButton from './AddInventoryButton';
import DeleteInventoryButton from './DeleteInventoryButton';

function Table({ newData }) {
    const [data, setData] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [childData, setChildData] = useState({}); // 各行の追加データ

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/test')
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch data');
                }
                return res.json();
            })
            .then((data) => {setData(data); console.log(data);})
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    useEffect(() => {
        if (newData) {
            setData((prevData) => [...prevData, newData]);
        }
    }, [newData]);

    const toggleRow = async (id) => {
        setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
        if (!childData[id]) {
            try {
                const response = await fetch(`http://localhost:3000/api/v1/test`);
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
                                    <td onClick={() => toggleRow(item.id)}>{item.name}</td>
                                    <td>
                                        <AddInventoryButton name={item.name} />
                                    </td>
                                    <td>
                                        <DeleteInventoryButton name={item.name} />
                                    </td>
                                </tr>
                                {expandedRows[item.id] && childData[item.id] && (
                                    <tr>
                                        <td colSpan="3">
                                            <table className="nested-table">
                                                <tbody>
                                                    {childData[item.id].map((detail, detailIndex) => (
                                                        <tr key={detailIndex}>
                                                            <td>{detail.name}</td>
                                                            <td>
                                                                <DeleteInventoryButton name={item.id} />
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
                            <td colSpan="2">Loading data...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default Table;
