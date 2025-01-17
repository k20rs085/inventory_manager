import React, { useState, useEffect } from 'react';
import './Table.css';
import AddInventoryButton from './AddInventoryButton';

function Table({newData}) {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3000/api/v1/test')
            .then((res) => {
                if(!res.ok){
                    throw new Error('Failed to fetch data');
                }
                return res.json()
            })
            .then((data) => setData(data))
            .catch((error) => console.error('Error fetching data: ', error));
    }, []);

    useEffect(() => {
        // 新しいデータを追加
        if (newData) {
          setData((prevData) => [...prevData, newData]);
        }
    }, [newData]);

    const test = (id) => {
        console.log(id);
    };

    return (
        <div>
            <table className="table_box">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Add</th>
                </tr>
                </thead>
                <tbody>
                    { data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td onClick={() => test(item.id)}>{item.name}</td>
                                <td> <AddInventoryButton /> </td>
                            </tr>
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
