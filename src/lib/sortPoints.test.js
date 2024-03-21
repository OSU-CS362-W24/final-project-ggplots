const sortPoints = require('./sortPoints');

describe('sorting points: normal cases', () => {
    it('should correctly sort points with positive ints', () => {
        // arrange input points
        const points = [
            { x: 3, y: 5 },
            { x: 1, y: 2 },
            { x: 4, y: 7 },
            { x: 2, y: 3 },
        ];
        
        // act on the input
        const sortedPoints = sortPoints(points);

        // assert the result
        expect(sortedPoints).toEqual([
            { x: 1, y: 2 },
            { x: 2, y: 3 },
            { x: 3, y: 5 },
            { x: 4, y: 7 },
        ]);
    });
	
	it('should correctly sort points with positive and negative ints', () => {
        // arrange input points
        const points = [
            { x: 10, y: 0 },
            { x: -3, y: 2 },
            { x: -1, y: -1 },
            { x: 8, y: 4 },
            { x: -2, y: -10 },
            { x: 0, y: 6 },
        ];
        
        // act on the input
        const sortedPoints = sortPoints(points);

        // assert the result
        expect(sortedPoints).toEqual([
            { x: -3, y: 2 },
            { x: -2, y: -10 },
            { x: -1, y: -1 },
            { x: 0, y: 6 },
            { x: 8, y: 4 },
            { x: 10, y: 0 },
        ]);
    });
	
	it('should correctly sort points with decimals', () => {
        // arrange input points
        const points = [
            { x: 0.5, y: -4 },
            { x: 0, y: 5 },
            { x: -0.25, y: 1 },
        ];
        
        // act on the input
        const sortedPoints = sortPoints(points);

        // assert the result
        expect(sortedPoints).toEqual([
            { x: -0.25, y: 1 },
            { x: 0, y: 5 },
            { x: 0.5, y: -4 },
        ]);
    });
});


describe('sorting points: edge cases', () => {
    it('should return an empty array', () => {
        // arrange input points
        const points = [];
        
        // act on the input
        const sortedPoints = sortPoints(points);

        // assert the result
        expect(sortedPoints).toEqual([]);
    });
	
	it('should return an array with one point', () => {
        // arrange input points
        const points = [{ x: 1, y: 2 }];
        
        // act on the input
        const sortedPoints = sortPoints(points);

        // assert the result
        expect(sortedPoints).toEqual([{ x: 1, y: 2 }]);
    });
});


