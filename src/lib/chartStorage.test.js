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
        const chart = { id: 1, data: 'Sample Chart Data' };
        saveChart(chart);
        expect(loadAllSavedCharts()).toEqual([chart]);
      });
  
      it('should overwrite an existing chart if idx is provided', () => {
        const initialChart = { id: 1, data: 'Initial Chart Data' };
        const newChart = { id: 1, data: 'New Chart Data' };
        saveChart(initialChart);
        saveChart(newChart, 0);
        expect(loadAllSavedCharts()).toEqual([newChart]);
      });
});

describe('loadSavedChart', () => {
    it('should load a specific saved chart', () => {
      const chart = { id: 1, data: 'Sample Chart Data' };
      saveChart(chart);
      expect(loadSavedChart(0)).toEqual(chart);
    });
  
    it('should return an empty object if the chart does not exist', () => {
      expect(loadSavedChart(0)).toEqual({});
    });
});

describe('loadAllSavedCharts', () => {
    it('should load all saved charts', () => {
      const chart1 = { id: 1, data: 'Chart 1 Data' };
      const chart2 = { id: 2, data: 'Chart 2 Data' };
      saveChart(chart1);
      saveChart(chart2);
      expect(loadAllSavedCharts()).toEqual([chart1, chart2]);
    });
});


describe('updateCurrentChartData', () => {
    it('should update the current chart data', () => {
      const currentChartData = { id: 1, data: 'Current Chart Data' };
      updateCurrentChartData(currentChartData);
      expect(loadCurrentChartData()).toEqual(currentChartData);
    });
});

  
});
  
