import React, { useState } from 'react';
import * as XLSX from 'xlsx';
import { Link } from 'react-router-dom';
import './OtherPage.css'; // Import the CSS file

const OtherPage = () => {
    const [data, setData] = useState([]);
    const [fileName, setFileName] = useState('');
    const [filterType, setFilterType] = useState('category'); // Default to category filter
    const [categoryFilter, setCategoryFilter] = useState('');
    const [idFilter, setIdFilter] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const binaryStr = e.target.result;
                const workbook = XLSX.read(binaryStr, { type: 'binary' });
                const firstSheetName = workbook.SheetNames[0];
                const worksheet = workbook.Sheets[firstSheetName];

                // Convert the sheet to JSON while maintaining original formatting
                const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1, defval: '' });
                setData(jsonData);
            };
            reader.readAsBinaryString(file);
        }
    };

    // Extract unique categories from the first row (excluding the header)
    const categories = [...new Set(data[0])]; // Assuming the first row contains category headers

    // Filter the data based on selected category and ID
    const filteredData = data.filter((row, index) => {
        // Skip the header row (index 0)
        if (index === 0) return false; // Don't include the header in the filtered results

        // Filter by selected category
        if (filterType === 'category' && categoryFilter) {
            const categoryIndex = data[0].indexOf(categoryFilter); // Find the index of the selected category
            // Show the row if the selected category is not empty in this row
            return row[categoryIndex] !== '';
        }

        // Filter by ID if selected
        const matchesId = filterType === 'id' && idFilter
            ? row[0].toString().includes(idFilter) // Assuming ID is in the first column
            : true;

        return matchesId; // If not filtering by category, only filter by ID
    });

    return (
        <div className="excel-upload">
            <header className="upload-header">
                <h1>Excel File Upload</h1>
                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileUpload}
                />
            </header>
            <nav className="upload-nav">
                <ul>
                    <li><Link className="nav-link" to="/">Home Page</Link></li>
                    <li><Link className="nav-link" to="/Table">Create Excel Page</Link></li>
                </ul>
            </nav>
            {fileName && <p className="uploaded-file">Uploaded File: {fileName}</p>}
            {data.length > 0 && (
                <div>
                    <div className="filter-controls">
                        <label>
                            <input
                                type="radio"
                                value="category"
                                checked={filterType === 'category'}
                                onChange={() => {
                                    setFilterType('category');
                                    setIdFilter(''); // Reset ID filter
                                }}
                            />
                            Filter by Category
                        </label>
                        <label>
                            <input
                                type="radio"
                                value="id"
                                checked={filterType === 'id'}
                                onChange={() => {
                                    setFilterType('id');
                                    setCategoryFilter(''); // Reset category filter
                                }}
                            />
                            Filter by ID
                        </label>

                        {filterType === 'category' && (
                            <div className="filter-category">
                                <label htmlFor="categoryFilter">Select Category:</label>
                                <select 
                                    id="categoryFilter" 
                                    value={categoryFilter} 
                                    onChange={(e) => setCategoryFilter(e.target.value)}
                                >
                                    <option value="">All</option>
                                    {categories.map((category, index) => (
                                        <option key={index} value={category}>
                                            {category || 'Empty'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}

                        {filterType === 'id' && (
                            <div className="filter-id">
                                <label htmlFor="idFilter">Filter by ID:</label>
                                <input 
                                    id="idFilter" 
                                    type="text" 
                                    value={idFilter} 
                                    onChange={(e) => setIdFilter(e.target.value)} 
                                    placeholder="Enter ID" 
                                />
                            </div>
                        )}
                    </div>
                    <div className="table-container">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    {data[0].map((header, index) => (
                                        <th key={index}>{header || 'Empty'}</th> // Show 'Empty' for empty headers
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((row, rowIndex) => (
                                    <tr key={rowIndex}>
                                        {row.map((value, colIndex) => (
                                            <td key={colIndex}>{value}</td> // Keep the original value or empty
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OtherPage;
