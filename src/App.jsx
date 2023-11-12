import React, { useState } from 'react';
import { TextField, Button, Table, TableHead, TableRow, TableCell, TableBody, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

function App() {
  const [note, setNote] = useState('');
  const [folder, setFolder] = useState('');
  const [folders, setFolders] = useState([]);
  const [openFolders, setOpenFolders] = useState({});
  const [notes, setNotes] = useState([]); // Define 'notes' state here

  const handleClick = () => {
    const newNote = {
      id: notes.length,
      note: note,
      creationDate: new Date().toLocaleString(),
    };

    const existingFolderIndex = folders.findIndex((f) => f.name === folder);
    if (existingFolderIndex !== -1) {
      const updatedFolders = [...folders];
      updatedFolders[existingFolderIndex].notes.push(newNote);
      setFolders(updatedFolders);
    } else {
      const newFolder = {
        name: folder,
        notes: [newNote],
      };
      setFolders([...folders, newFolder]);
      setOpenFolders({ ...openFolders, [folder]: true });
    }

    setNotes([...notes, newNote]); // Update 'notes' state
    setNote('');
    setFolder('');
  };

  const handleChange = (e) => {
    setNote(e.target.value);
  };

  const handleFolderChange = (e) => {
    setFolder(e.target.value);
  };

  const handleFolderToggle = (folderName) => {
    setOpenFolders({ ...openFolders, [folderName]: !openFolders[folderName] });
  };

  return (
    <>
      <div style={{ display: 'flex' }}>
        <TextField
          label="Folder"
          variant="outlined"
          value={folder}
          onChange={handleFolderChange}
          fullWidth
          margin="normal"
          style={{ flexGrow: 1, marginRight: '8px' }}
        />
        <TextField
          label="Note"
          variant="outlined"
          value={note}
          onChange={handleChange}
          fullWidth
          margin="normal"
          style={{ flexGrow: 1, marginRight: '8px' }}
        />
        <Button variant="contained" color="primary" onClick={handleClick} style={{ width: '100px' }}>
          Add Note
        </Button>
      </div>

      {folders.map((folder) => (
        <div key={folder.name}>
          <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => handleFolderToggle(folder.name)}>
            {openFolders[folder.name] ? <ExpandMoreIcon /> : <ChevronRightIcon />}
            <h2 style={{ margin: '0' }}>{folder.name}</h2>
          </div>
          <Collapse in={openFolders[folder.name]}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Note</TableCell>
                  <TableCell>Creation Date</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {folder.notes.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.note}</TableCell>
                    <TableCell>{row.creationDate}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Collapse>
        </div>
      ))}
    </>
  );
}

export default App;
