import React, { useState } from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import AddSeriesButton from './components/AddSeriesButton';

function App() {
  const [submittedData, setSubmittedData] = useState(null); // 新しく送信されたデータを管理

  // フォームからのデータ送信後に呼ばれる関数
  const handleFormSubmit = (new_data) => {
    console.log('Appで受け取った送信データ:', new_data);
    setSubmittedData(new_data); // 新しいデータを保存
  };

  return (
    <div>
      <div className="app-header-container"> {/* クラス名を追加 */}
        < Header />
      </div>
      <AddSeriesButton onSubmit={handleFormSubmit} />
      <div className="app-table-container"> {/* クラス名を追加 */}
        <Table newData={submittedData}/>
      </div>
    </div>
  );
}

export default App;
