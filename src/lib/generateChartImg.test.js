const generateChartImg = require('./generateChartImg.js');

describe('generateChartImg Function line chart test', () => {
    test('successfully generates a line chart image URL', async () => {
        const type = 'line';
        const data = [{x: 1, y: 2}, {x: 2, y: 3}, {x: 3, y: 5}];
        const xLabel = 'X Axis';
        const yLabel = 'Y Axis';
        const title = 'Test Line Chart';
        const color = '#FF0000';

        const result = await generateChartImg(type, data, xLabel, yLabel, title, color);
        expect(result).toMatch(/^blob:/); // Check if the result is a blob URL (the correct format for an image)
    });
});



