// src/Table.js

import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

const Table = () => {
    const [rows, setRows] = useState([]);
    const [rowId, setRowId] = useState(1);

    const addRow = () => {
        setRows([...rows, { 
            id: rowId, 
            entityName: '', 
            documentName: '', 
            sector: '', 
            year: '', 
            location: '', 
            region: '', 
            accountability: false,
            autonoma: false,
            collab: false,
            controllability: false,
            explanation: false,
            fairness: false,
            human1: false,
            human2: false,
            privacy: false,
            riskManagement: false,
            robustness: false,
            safety: false,
            security: false,
            wellBeing: false,
            accountabilityField: false,
            effectiveness: false,
            solidarity: false,
            userAssistance: false,
            pdfFile: null, // New state for PDF file
        }]);
        setRowId(rowId + 1);
    };

    const handleChange = (index, event) => {
        const { name, value } = event.target;
        const newRows = [...rows];
        newRows[index][name] = value;
        setRows(newRows);
    };

    const handleCheckboxChange = (index, field) => {
        const newRows = [...rows];
        newRows[index][field] = !newRows[index][field]; // Toggle checkbox
        setRows(newRows);
    };

    const handleFileChange = (index, event) => {
        const newRows = [...rows];
        newRows[index].pdfFile = event.target.files[0]; // Store the PDF file
        setRows(newRows);
    };

    const saveAsExcel = () => {
        // Validate that each row has a PDF file uploaded
        for (const row of rows) {
            if (!row.pdfFile) {
                alert("Please upload a PDF file for all rows before saving.");
                return;
            }
        }
    
        const exportData = rows.map(row => ({
            ID: row.id,
            'Entity Name': row.entityName,
            'Document Name': row.documentName,
            Sector: row.sector,
            Year: row.year,
            Location: row.location,
            Region: row.region,
            Accountability: row.accountability ? 'X' : '',
            Autonoma: row.autonoma ? 'X' : '',
            Collab: row.collab ? 'X' : '',
            Controllability: row.controllability ? 'X' : '',
            Explanation: row.explanation ? 'X' : '',
            Fairness: row.fairness ? 'X' : '',
            'Human 1': row.human1 ? 'X' : '',
            'Human 2': row.human2 ? 'X' : '',
            Privacy: row.privacy ? 'X' : '',
            'Risk Management': row.riskManagement ? 'X' : '',
            Robustness: row.robustness ? 'X' : '',
            Safety: row.safety ? 'X' : '',
            Security: row.security ? 'X' : '',
            'Well Being': row.wellBeing ? 'X' : '',
            'Accountability Field': row.accountabilityField ? 'X' : '',
            Effectiveness: row.effectiveness ? 'X' : '',
            Solidarity: row.solidarity ? 'X' : '',
            'User Assistance': row.userAssistance ? 'X' : '',
            'PDF Upload': row.pdfFile ? row.pdfFile.name : 'No file uploaded', // Include the PDF file name
        }));
    
        const ws = XLSX.utils.json_to_sheet(exportData);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Data');
    
        // Prompt for filename
        const filename = prompt("Please enter a filename for your Excel file:", "data");
        
        // If a filename was provided, use it; otherwise, use a default name
        const finalFilename = filename ? `${filename}.xlsx` : 'data.xlsx';
    
        // Save the workbook
        XLSX.writeFile(wb, finalFilename);
    };
    

    return (
        <div>
            <button onClick={addRow}>Add Row</button>
            <button onClick={saveAsExcel} disabled={rows.length === 0}>Save as Excel</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Entity Name</th>
                        <th>Document Name</th>
                        <th>Sector</th>
                        <th>Year</th>
                        <th>Location</th>
                        <th>Region</th>
                        <th>Accountability</th>
                        <th>Autonoma</th>
                        <th>Collab</th>
                        <th>Controllability</th>
                        <th>Explanation</th>
                        <th>Fairness</th>
                        <th>Human 1</th>
                        <th>Human 2</th>
                        <th>Privacy</th>
                        <th>Risk Management</th>
                        <th>Robustness</th>
                        <th>Safety</th>
                        <th>Security</th>
                        <th>Well Being</th>
                        <th>Accountability Field</th>
                        <th>Effectiveness</th>
                        <th>Solidarity</th>
                        <th>User Assistance</th>
                        <th>PDF Upload <span style={{ color: 'red' }}>*</span></th> {/* Required indicator */}
                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => (
                        <tr key={row.id}>
                            <td>{row.id}</td>
                            <td><input type="text" name="entityName" value={row.entityName} onChange={(event) => handleChange(index, event)} /></td>
                            <td><input type="text" name="documentName" value={row.documentName} onChange={(event) => handleChange(index, event)} /></td>
                            <td><input type="text" name="sector" value={row.sector} onChange={(event) => handleChange(index, event)} /></td>
                            <td><input type="number" name="year" value={row.year} onChange={(event) => handleChange(index, event)} /></td>
                            <td><input type="text" name="location" value={row.location} onChange={(event) => handleChange(index, event)} /></td>
                            <td><input type="text" name="region" value={row.region} onChange={(event) => handleChange(index, event)} /></td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.accountability} 
                                    onChange={() => handleCheckboxChange(index, 'accountability')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.autonoma} 
                                    onChange={() => handleCheckboxChange(index, 'autonoma')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.collab} 
                                    onChange={() => handleCheckboxChange(index, 'collab')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.controllability} 
                                    onChange={() => handleCheckboxChange(index, 'controllability')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.explanation} 
                                    onChange={() => handleCheckboxChange(index, 'explanation')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.fairness} 
                                    onChange={() => handleCheckboxChange(index, 'fairness')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.human1} 
                                    onChange={() => handleCheckboxChange(index, 'human1')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.human2} 
                                    onChange={() => handleCheckboxChange(index, 'human2')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.privacy} 
                                    onChange={() => handleCheckboxChange(index, 'privacy')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.riskManagement} 
                                    onChange={() => handleCheckboxChange(index, 'riskManagement')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.robustness} 
                                    onChange={() => handleCheckboxChange(index, 'robustness')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.safety} 
                                    onChange={() => handleCheckboxChange(index, 'safety')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.security} 
                                    onChange={() => handleCheckboxChange(index, 'security')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.wellBeing} 
                                    onChange={() => handleCheckboxChange(index, 'wellBeing')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.accountabilityField} 
                                    onChange={() => handleCheckboxChange(index, 'accountabilityField')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.effectiveness} 
                                    onChange={() => handleCheckboxChange(index, 'effectiveness')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.solidarity} 
                                    onChange={() => handleCheckboxChange(index, 'solidarity')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="checkbox" 
                                    checked={row.userAssistance} 
                                    onChange={() => handleCheckboxChange(index, 'userAssistance')} 
                                /> 
                                Yes
                            </td>
                            <td>
                                <input 
                                    type="file" 
                                    accept="application/pdf" 
                                    onChange={(event) => handleFileChange(index, event)} 
                                    required // Mark as required
                                />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
