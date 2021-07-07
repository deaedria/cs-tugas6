const MinimunSpanningTree = require('./mst');

let array = [
    ["A", "B", 16],
    ["A", "C", 22],
    ["A", "D", 25],
    ["B", "D", 14],
    ["B", "E", 26],
    ["C", "D", 9],
    ["C", "G", 35],
    ["D", "F", 24],
    ["E", "F", 15],
    ["E", "G", 28],
    ["F", "G", 8]
];

let hasil = new MinimunSpanningTree();
hasil.choose(array)
