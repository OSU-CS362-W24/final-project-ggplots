/**
 * @jest-environment jsdom
 */

// Import the functions to test
const {
    saveChart,
    loadAllSavedCharts,
    loadSavedChart,
    updateCurrentChartData,
    loadCurrentChartData
  } = require('./chartStorage.js'); 
  
describe('Chart data management', () => {
    beforeEach(() => {
      // Clears the localStorage before each test
      localStorage.clear();
});
  
describe('saveChart', () => {
      it('should save a new chart if idx is not provided', () => {
        // Define a chart to save
        const chart = { id: 1, data: 'Sample Chart Data' };
        saveChart(chart);
        // Load the saved chart and compare it to the original
        expect(loadAllSavedCharts()).toEqual([chart]);
      });
  
      it('should overwrite an existing chart if idx is provided', () => {
        // Save an initial chart
        const initialChart = { id: 1, data: 'Initial Chart Data' };
        // Save a new chart at the same index
        const newChart = { id: 1, data: 'New Chart Data' };
        saveChart(initialChart);
        saveChart(newChart, 0);
        // Load the saved chart and compare it to the new chart
        expect(loadAllSavedCharts()).toEqual([newChart]);
      });
});

describe('loadSavedChart', () => {
    it('should load a specific saved chart', () => {
    // Define a chart to save
      const chart = { id: 1, data: 'Sample Chart Data' };
      saveChart(chart);
      // Load the saved chart and compare it to the original
      expect(loadSavedChart(0)).toEqual(chart);
    });
  
    
    it('should return an empty object if the chart does not exist', () => {  
      expect(loadSavedChart(0)).toEqual({});
    });
});

describe('loadAllSavedCharts', () => {
    it('should load all saved charts', () => {
        // Define two charts to save
      const chart1 = { id: 1, data: 'Chart 1 Data' };
      const chart2 = { id: 2, data: 'Chart 2 Data' };
      saveChart(chart1);
      saveChart(chart2);
        // Load the saved charts and compare them to the original
      expect(loadAllSavedCharts()).toEqual([chart1, chart2]);
    });
});


describe('updateCurrentChartData', () => {
    it('should update the current chart data', () => {
    // Define a chart to save
      const currentChartData = { id: 1, data: 'Current Chart Data' };
    // Update the current chart data
      updateCurrentChartData(currentChartData);
      expect(loadCurrentChartData()).toEqual(currentChartData);
    });
});

  
});
  
