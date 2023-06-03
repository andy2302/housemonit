import React, { useState, useEffect } from 'react';
import './Settings.css';

const serverIP = process.env.REACT_APP_SERVER_IP;
console.log(`Server IP: ${serverIP}`);

const Settings = () => {
    const savedAddress = JSON.parse(localStorage.getItem('selectedAddress')) || {};
    const [address, setAddress] = useState('');
    const [ownerName, setOwnerName] = useState('');
    const [numInhabitants, setNumInhabitants] = useState('');
    const [selectedEntry, setSelectedEntry] = useState(savedAddress);
    const [allEntries, setAllEntries] = useState([]);
  
    useEffect(() => {
      fetch(`http://${serverIP}:5000/api/settings`)
        .then(response => response.json())
        .then(data => setAllEntries(data))
        .catch((error) => console.error('Error:', error));
    }, []);
  
    useEffect(() => {
      localStorage.setItem('selectedAddress', JSON.stringify(selectedEntry));
    }, [selectedEntry]);
  
  const handleSubmit = (event) => {
    event.preventDefault();
  
    const settingsData = {
      address,
      ownerName,
      numInhabitants: Number(numInhabitants),
    };
  
    fetch(`http://${serverIP}:5000/api/settings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(settingsData)
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setSelectedEntry(data);
      })
      .catch((error) => console.error('Error:', error));
  };

  const handleSelect = (entry) => {
    fetch(`http://${serverIP}:5000/api/settings/${entry._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            setSelectedEntry(data);
        })
        .catch((error) => console.error('Error:', error));
  };

  return (
    <div className='settings-container'>
        <form onSubmit={handleSubmit} className='form'>
            <div className='left-half'>
            <label className='label-settings'>
                Home Address:
                <input className='input-field' type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
            </label>
            <label className='label-settings'>
                Owner Name:
                <input className='input-field' type="text" value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            </label>
            <label className='label-settings'>
                Number of Inhabitants:
                <input className='input-field' type="number" value={numInhabitants} onChange={(e) => setNumInhabitants(e.target.value)} />
            </label>
            <input className='input-button' type="submit" value="Submit" />
            </div>
        </form>
        <div className='last-entry'>
            <h2>Selected Address</h2>
            <p>Address: {selectedEntry.address}</p>
            <p>Owner Name: {selectedEntry.ownerName}</p>
            <p>Number of Inhabitants: {selectedEntry.numInhabitants}</p>
        </div>
        <div className='all-entries'>
            <h2>All Adresses</h2>
            <ul>
                {allEntries.map((entry, index) => (
                  <li key={index} onClick={() => handleSelect(entry)}>
                    {entry.address}, {entry.ownerName}, {entry.numInhabitants}
                  </li>
                ))}
            </ul>
        </div>
    </div>
  );
};

export default Settings;
