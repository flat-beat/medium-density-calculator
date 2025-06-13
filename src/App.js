import React, { useState, useEffect, useRef } from 'react';
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Container,
  Typography,
  Box
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './App.css';

const temperatureOptions = Array.from({ length: 27 }, (_, i) => `${i * 10 - 10} - ${i * 10} ℃`);
const mediumOptions = ['Wasser', 'Kühlwasser mit Frostschutz', 'Wärmeträgeröl', 'Other'];
  
  const densityValues = {
    'Wasser': {
    '0 ℃': 1000,
    '20 ℃': 998,
    '40 ℃': 992,
    '60 ℃': 983,
    '80 ℃': 972,
    '100 ℃': 958,
    '120 ℃': 943,
    '140 ℃': 926,
    '150 ℃': 917,
    '160 ℃': 907,
    '170 ℃': 897,
    '180 ℃': 887,
    '190 ℃': 876,
    '200 ℃': 865,
    '210 ℃': 853,
    '220 ℃': 840,
    '230 ℃': 826,
    '240 ℃': 814,
  },
  'Kühlwasser mit Frostschutz': {
    '0 ℃': 889,
    '20 ℃': 876,
    '40 ℃': 863,
    '60 ℃': 850,
    '80 ℃': 837,
    '100 ℃': 824,
    '120 ℃': 811,
    '160 ℃': 784,
    '200 ℃': 758,
    '220 ℃': 745,
    '240 ℃': 732,
    '280 ℃': 706,
    '320 ℃': 680,
  },
  'Wärmeträgeröl': {
    '0 ℃': 1000,
    '20 ℃': 998,
    '40 ℃': 992,
    '60 ℃': 983,
    '80 ℃': 972,
    '100 ℃': 958,
    '120 ℃': 943,
    '140 ℃': 926,
    '150 ℃': 917,
    '160 ℃': 907,
    '170 ℃': 897,
    '180 ℃': 887,
    '190 ℃': 876,
    '200 ℃': 865,
    '210 ℃': 853,
    '220 ℃': 840,
    '230 ℃': 826,
    '240 ℃': 814,
  },
    'Other': {
      '0 ℃': 1000,
      '10 ℃': 1000,
      '20 ℃': 999,
      '30 ℃': 998,
      '40 ℃': 996,
      '50 ℃': 992,
      '60 ℃': 990,
      '70 ℃': 983,
      '80 ℃': 975,
      '90 ℃': 972,
      '100 ℃': 965,
      '110 ℃': 958,
      '120 ℃': 950,
      '130 ℃': 943,
      '140 ℃': 935,
      '150 ℃': 926,
      '160 ℃': 917,
      '170 ℃': 907,
      '180 ℃': 897,
      '190 ℃': 887,
      '200 ℃': 876,
      '210 ℃': 865,
      '220 ℃': 853,
      '230 ℃': 840,
      '240 ℃': 826,
      '250 ℃': 814,
    },
  };

  function App() {
    const theme = useTheme();
    const [temperature, setTemperature] = useState('');
    const [medium, setMedium] = useState('');
    const [density, setDensity] = useState('');
    const [helperText, setHelperText] = useState('');
    const densityInputRef = useRef(null);
  
    useEffect(() => {
      if (medium && temperature) {
        if (medium !== 'Other') {
          const updatedDensity = densityValues[medium][temperature] || '';
          if (updatedDensity !== density) {
            setDensity(updatedDensity);
            setHelperText('Density updated automatically based on selection.');
          }
        }
        densityInputRef.current.focus();
      }
    }, [medium, temperature]);
  
    const handleMediumChange = (event) => {
      setMedium(event.target.value);
      setTemperature('');
      setDensity('');
      setHelperText('');
    };
  
    const handleDensityChange = (event) => {
      const value = event.target.value;
      if (!isNaN(value) && value >= 0) {
        setDensity(value);
        setHelperText('');
      }
    };
  
    const getAvailableTemperatureOptions = () => {
  if (!medium) return [];
  return Object.keys(densityValues[medium]);
};
  
    return (
      <Container maxWidth="sm" sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Medium
        </Typography>
        <Typography variant="body1" gutterBottom>
          Select the medium and temperature to see the corresponding density. You can also adjust the density manually if needed.
        </Typography>
  
        <Box component="form" noValidate autoComplete="off">
          <FormControl fullWidth margin="normal" variant="standard">
            <InputLabel shrink>Medium (required)</InputLabel>
            <Select
              value={medium}
              onChange={handleMediumChange}
              sx={{ backgroundColor: '#fff' }}
              displayEmpty
            >
              <MenuItem value="" disabled>Select a medium</MenuItem>
              {mediumOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <FormControl fullWidth margin="normal" variant="standard" disabled={!medium}>
            <InputLabel shrink>Medium Temperature (required)</InputLabel>
            <Select
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              sx={{ backgroundColor: '#fff' }}
              displayEmpty
            >
              <MenuItem value="" disabled>Select approximate</MenuItem>
              {getAvailableTemperatureOptions().map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
  
          <TextField
            label="Medium Density in kg/m³ (required)"
            value={density}
            onChange={handleDensityChange}
            fullWidth
            margin="normal"
            variant="standard"
            helperText={helperText}
            FormHelperTextProps={{
              style: { color: theme.palette.text.primary || 'black' },
            }}
            inputRef={densityInputRef}
          />
        </Box>
      </Container>
    );
  }
  
  export default App;