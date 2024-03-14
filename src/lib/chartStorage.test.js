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
  

  
});
  
