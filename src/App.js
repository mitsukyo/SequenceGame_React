import React, { useState, useEffect } from 'react';
import { Grid, Paper, Snackbar, Alert } from '@mui/material';

const defaultColors = [
    '#f032e6', '#4263d8', '#e41a4a',
    '#f68232', '#44d3f4', '#3db44b',
    '#bfef45', '#fee118', '#911cb4',
  ];

const SquenceAssessment = () => {
  const [sequence, setSequence] = useState([]);
  const [selectedIndexes, setSelectedIndexes] = useState([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const shuffledSequence = shuffleArray();
    setSequence(shuffledSequence);
  }, []);

  const shuffleArray = () => {
    const array = [];
    for (let i = 0; i < 9; i++) {
      array.push(i);
    }
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  

  const handleBoxClick = (index) => {
    if (index === parseInt(sequence[selectedIndexes.length])) {
      setSelectedIndexes([...selectedIndexes, index]);
      if (selectedIndexes.length ===  8) {
        setOpen(true);
      }
    } else {
      setSelectedIndexes([]);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedIndexes([]);
    setSequence(shuffleArray());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginBottom: '20px', display: 'flex' }}>
        {sequence.map((color, index) => (
          <Paper
            key={index}
            style={{
              backgroundColor: defaultColors[color],
              padding: '20px',
              transition: 'background-color  0.2s ease',
              borderRadius: 0,
            }}
          />
        ))}
      </div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          You finished the game!
        </Alert>
      </Snackbar>
      <Grid container spacing={1} sx={{ maxWidth: '500px' }}>
        {sequence.map((_, index) => (
          <Grid item xs={4} key={index}>
            <Paper
              style={{
                backgroundColor: selectedIndexes.includes(index) ? defaultColors[index] : 'pink',
                cursor: 'pointer',
                padding: '30px',
                height: '10px',
                transition: 'background-color  0.2s ease',
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = 'magenta'}
              onMouseLeave={(e) => e.target.style.backgroundColor = selectedIndexes.includes(index) ? defaultColors[index] : 'pink'}
              onClick={() => handleBoxClick(index)}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};


export default SquenceAssessment;