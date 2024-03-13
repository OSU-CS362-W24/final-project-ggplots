const sortPoints = require('./sortPoints');

describe('test for correct sorting given valid input', () => {
    it('should sort an array of points by ascending X value', () => {
        
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
});

