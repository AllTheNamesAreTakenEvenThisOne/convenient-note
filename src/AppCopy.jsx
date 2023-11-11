import React, { useState } from 'react';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [submittedValues, setSubmittedValues] = useState([]);
  const [reverseOrder, setReverseOrder] = useState(false);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== '') {
      const newSubmittedValue = {
        id: submittedValues.length + 1,
        value: inputValue.trim(),
      };
      setSubmittedValues([...submittedValues, newSubmittedValue]);
      setInputValue('');
    }
  };

  const handleToggleOrder = () => {
    setReverseOrder(!reverseOrder);
  };

  const tableRows = reverseOrder
    ? submittedValues.slice().reverse()
    : submittedValues;

  return (
    <div>
      <div>
        <input type="text" value={inputValue} onChange={handleInputChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div>
        <button onClick={handleToggleOrder}>Toggle Order</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Value Entered</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;