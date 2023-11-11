import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';

function App() {
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState([]);

  const handleClick = () => {
    setNotes([...notes, value]);
    setValue('');
  };

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <>
    <div style={{ display: 'flex' }}>
      <TextField
        label="Note"
        variant="outlined"
        value={value}
        onChange={handleChange}
        fullWidth
        margin="normal"
        style={{ flexGrow: 1, marginRight: '8px' }}
      />
      <Button variant="contained" color="primary" onClick={handleClick} style={{ width: '100px' }}>
        Add Note
      </Button>
      </div>

      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {notes.map((row, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>{row}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}

export default App;
