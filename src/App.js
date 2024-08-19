
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Table from './Table';
import HomePage from './HomePage';
import SearchPage from './SearchPage';
import './styles.css'; // Ensure you have your styles imported

const App = () => {
    return (
        <Router basename='/Ai-ExcelTable'>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/Table" element={<Table />} />
                <Route path="/SearchPage" element={<SearchPage />} />
            </Routes>
        </Router>
    );
};

export default App;
