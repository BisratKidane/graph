const lineReader = require('linebyline');
const Node = require('./node');
const Edge = require('./edge');
const Graph = require('./graph');
const helper = require('./helper');

const edges = [];
const cables = [];

let graph = new Graph();
let root = new Node('root', 'central');
graph.addNode(root);

lr = lineReader('./cable_table.csv');

lr.on('line', (line, lineCount) => {
    if (lineCount > 1) {
        let cableInfo = line.split(',');
        let source = new Node(cableInfo[2], cableInfo[3]);
        let target = new Node(cableInfo[4], cableInfo[5]);
        let edge = new Edge(cableInfo[0], cableInfo[1], source.id, target.id);
        edges.push(edge);
        // cable object used to find root nodes that should be replaced by the real root (central)
        let cable = {
            id: cableInfo[0],
            length: cableInfo[1],
            startNodeId: cableInfo[2],
            startNodeType: cableInfo[3],
            endNodeId: cableInfo[4],
            endNodeType: cableInfo[5]
        };
        cables.push(cable);
    }
})
.on('close', () => {
    // helper function for finding the nodes that should be replaced by central root
    // and insert nodes and edges to the graph
    helper.findRootNodes(root, edges, cables, graph);
    let topology = {
        nodes: graph.getNodes(),
        edges: graph.getEdges()
    };
    console.log(topology);
})
.on('error', (err) => {
    console.log(err.message);
});
