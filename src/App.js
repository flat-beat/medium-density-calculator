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
      '-10 - 0 ℃': 1034,
      '0 - 10 ℃': 1032,
      '10 - 20 ℃': 1026,
      '20 - 30 ℃': 1018,
      '30 - 40 ℃': 1007,
      '40 - 50 ℃': 994,
      '50 - 60 ℃': 980,
      '60 - 70 ℃': 970,
      '70 - 80 ℃': 960,
      '80 - 90 ℃': 950,
      '90 - 100 ℃': 940,
      '100 - 110 ℃': 930,
      '110 - 120 ℃': 920,
    },
    'Kühlwasser mit Frostschutz': {
      '0 - 10 ℃': 889,
      '10 - 20 ℃': 880,
      '20 - 30 ℃': 876,
      '30 - 40 ℃': 870,
      '40 - 50 ℃': 863,
      '50 - 60 ℃': 857,
      '60 - 70 ℃': 850,
      '70 - 80 ℃': 845,
      '80 - 90 ℃': 837,
      '90 - 100 ℃': 830,
      '100 - 110 ℃': 824,
      '110 - 120 ℃': 818,
      '120 - 130 ℃': 811,
      '130 - 140 ℃': 800,
      '140 - 150 ℃': 790,
      '150 - 160 ℃': 780,
      '160 - 170 ℃': 784,
      '170 - 180 ℃': 770,
      '180 - 190 ℃': 760,
      '190 - 200 ℃': 750,
      '200 - 210 ℃': 758,
      '210 - 220 ℃': 750,
      '220 - 230 ℃': 745,
      '230 - 240 ℃': 740,
      '240 - 250 ℃': 732,
    },
    'Wärmeträgeröl': {
      '0 - 10 ℃': 1000,
      '10 - 20 ℃': 999,
      '20 - 30 ℃': 998,
      '30 - 40 ℃': 996,
      '40 - 50 ℃': 992,
      '50 - 60 ℃': 990,
      '60 - 70 ℃': 983,
      '70 - 80 ℃': 975,
      '80 - 90 ℃': 972,
      '90 - 100 ℃': 965,
      '100 - 110 ℃': 958,
      '110 - 120 ℃': 950,
      '120 - 130 ℃': 943,
      '130 - 140 ℃': 935,
      '140 - 150 ℃': 926,
      '150 - 160 ℃': 917,
      '160 - 170 ℃': 907,
      '170 - 180 ℃': 897,
      '180 - 190 ℃': 887,
      '190 - 200 ℃': 876,
      '200 - 210 ℃': 865,
      '210 - 220 ℃': 853,
      '220 - 230 ℃': 840,
      '230 - 240 ℃': 826,
      '240 - 250 ℃': 814,
    },
    'Other': {
      '0 - 10 ℃': 1000,
      '10 - 20 ℃': 999,
      '20 - 30 ℃': 998,
      '30 - 40 ℃': 996,
      '40 - 50 ℃': 992,
      '50 - 60 ℃': 990,
      '60 - 70 ℃': 983,
      '70 - 80 ℃': 975,
      '80 - 90 ℃': 972,
      '90 - 100 ℃': 965,
      '100 - 110 ℃': 958,
      '110 - 120 ℃': 950,
      '120 - 130 ℃': 943,
      '130 - 140 ℃': 935,
      '140 - 150 ℃': 926,
      '150 - 160 ℃': 917,
      '160 - 170 ℃': 907,
      '170 - 180 ℃': 897,
      '180 - 190 ℃': 887,
      '190 - 200 ℃': 876,
      '200 - 210 ℃': 865,
      '210 - 220 ℃': 853,
      '220 - 230 ℃': 840,
      '230 - 240 ℃': 826,
      '240 - 250 ℃': 814,
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
      if (medium === 'Other') return temperatureOptions;
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
              <MenuItem value="" disabled>Select a range</MenuItem>
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