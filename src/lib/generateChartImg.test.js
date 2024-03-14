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

describe('generateChartImg Function bar chart test', () => {
    test('successfully generates a bar chart with default color', async () => {
        const type = 'bar';
        const data = [{x: 'A', y: 20}, {x: 'B', y: 30}, {x: 'C', y: 40}];
        const xLabel = 'Category';
        const yLabel = 'Value';
        const title = 'Test Bar Chart';

        const result = await generateChartImg(type, data, xLabel, yLabel, title);
        expect(result).toMatch(/^blob:/); // Check if the result is a blob URL (the correct format for an image)
    });

});

describe('generateChartImg Function error thrown test', () => {
    test('handles API error gracefully', async () => {
        const type = 'undefined'; // Invalid chart type should cause an error
        const data = [{x: 10, y: 20}, {x: 20, y: 30}];
        const xLabel = 'Error Case X';
        const yLabel = 'Error Case Y';
        const title = 'Error Case Chart';

        await expect(generateChartImg(type, data, xLabel, yLabel, title)).rejects.toThrow();
    });

    
});