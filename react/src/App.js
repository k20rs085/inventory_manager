import React from 'react';
import './App.css';
import Header from './components/Header';
import Table from './components/Table';
import AddButton from './components/AddButton';

function App() {
  return (
    <div>
      <Header />
      <AddButton />
      <Table />
    </div>
  );
}

export default App;
