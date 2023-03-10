"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("./path");
var normalize_1 = require("./normalize");
describe('Path', function () {
    describe('#normalizePathData', function () {
        var paths = [
            ['M 10 10 H 20', 'M 10 10 L 20 10'],
            ['M 10 10 V 20', 'M 10 10 L 10 20'],
            [
                'M 10 20 C 10 10 25 10 25 20 S 40 30 40 20',
                'M 10 20 C 10 10 25 10 25 20 C 25 30 40 30 40 20',
            ],
            ['M 20 20 Q 40 0 60 20', 'M 20 20 C 33.33 6.67 46.67 6.67 60 20'],
            [
                'M 20 20 Q 40 0 60 20 T 100 20',
                'M 20 20 C 33.33 6.67 46.67 6.67 60 20 C 73.33 33.33 86.67 33.33 100 20',
            ],
            ['M 30 15 A 15 15 0 0 0 15 30', 'M 30 15 C 21.72 15 15 21.72 15 30'],
            ['m 10 10', 'M 10 10'],
            ['M 10 10 m 10 10', 'M 10 10 M 20 20'],
            ['M 10 10 l 10 10', 'M 10 10 L 20 20'],
            ['M 10 10 c 0 10 10 10 10 0', 'M 10 10 C 10 20 20 20 20 10'],
            ['M 10 10 z', 'M 10 10 Z'],
            ['M 10 10 20 20', 'M 10 10 L 20 20'],
            ['M 10 10 L 20 20 30 30', 'M 10 10 L 20 20 L 30 30'],
            [
                'M 10 10 C 10 20 20 20 20 10 20 0 30 0 30 10',
                'M 10 10 C 10 20 20 20 20 10 C 20 0 30 0 30 10',
            ],
            // edge cases
            ['L 10 10', 'M 0 0 L 10 10'],
            ['C 10 20 20 20 20 10', 'M 0 0 C 10 20 20 20 20 10'],
            ['Z', 'M 0 0 Z'],
            ['M 10 10 Z L 20 20', 'M 10 10 Z L 20 20'],
            ['M 10 10 Z C 10 20 20 20 20 10', 'M 10 10 Z C 10 20 20 20 20 10'],
            ['M 10 10 Z Z', 'M 10 10 Z Z'],
            ['', 'M 0 0'],
            ['X', 'M 0 0'],
            ['M', 'M 0 0'],
            ['M 10', 'M 0 0'],
            ['M 10 10 20', 'M 10 10'],
            ['X M 10 10', 'M 10 10'],
            // invalid commands interspersed with valid commands
            ['X M 10 10 X L 20 20', 'M 10 10 L 20 20'],
            ['A 0 3 0 0 1 10 15', 'M 0 0 L 10 15'],
            ['A 3 0 0 0 1 10 15', 'M 0 0 L 10 15'],
            ['A 0 0 0 0 1 10 15', 'M 0 0 L 10 15'],
            // Make sure this does not throw an error because of
            // recursion in a2c() exceeding the maximum stack size
            ['M 0 0 A 1 1 0 1 0 -1 -1'],
            ['M 14.4 29.52 a .72 .72 0 1 0 -.72 -.72 A .72 .72 0 0 0 14.4 29.52Z'],
        ];
        it('should normalize path data', function () {
            paths.forEach(function (path) {
                if (path[1]) {
                    expect((0, normalize_1.normalizePathData)(path[0])).toEqual(path[1]);
                }
                else {
                    (0, normalize_1.normalizePathData)(path[0]);
                }
            });
        });
        it('should parsed by Path', function () {
            var path1 = 'M 10 10';
            var normalizedPath1 = (0, normalize_1.normalizePathData)(path1);
            var reconstructedPath1 = path_1.Path.parse(path1).serialize();
            expect(normalizedPath1).toEqual(reconstructedPath1);
            var path2 = 'M 100 100 C 100 100 0 150 100 200 Z';
            var normalizedPath2 = (0, normalize_1.normalizePathData)(path2);
            var reconstructedPath2 = path_1.Path.parse(path2).serialize();
            expect(normalizedPath2).toEqual(reconstructedPath2);
            var path3 = 'M285.8,83V52.7h8.3v31c0,3.2-1,5.8-3,7.7c-2,1.9-4.4,2.8-7.2,2.8c-2.9,0-5.6-1.2-8.1-3.5l3.8-6.1c1.1,1.3,2.3,1.9,3.7,1.9c0.7,0,1.3-0.3,1.8-0.9C285.5,85,285.8,84.2,285.8,83z';
            var normalizedPath3 = (0, normalize_1.normalizePathData)(path3);
            var reconstructedPath3 = path_1.Path.parse(path3).serialize();
            expect(normalizedPath3).toEqual(reconstructedPath3);
        });
    });
});
//# sourceMappingURL=normalize.test.js.map