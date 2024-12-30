import React, { useState, useEffect } from 'react';
import './Table.css';

function Table() {
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


    return (
        <div>
            <table className="table_box">
                <thead>
                <tr>
                    <th>Item</th>
                    <th>Cat</th>
                </tr>
                </thead>
                <tbody>
                    { data.length > 0 ? (
                        data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>{item.category_id}</td>
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
