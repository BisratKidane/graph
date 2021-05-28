const lineReader = require('linebyline');
const Node = require('./node');
const Edge = require('./edge');
const Graph = require('./graph');

const nodes = [];
const edges = [];
const cables = [];

let graph = new Graph();
let root = new Node('root', 'central');

nodes.push(root);
lr = lineReader('./cable_table.csv');

lr.on('line', (line, lineCount) => {
    if (lineCount > 1) {
        let cableInfo = line.split(',');
        let source = new Node(cableInfo[2], cableInfo[3]);
        let target = new Node(cableInfo[4], cableInfo[5]);
        if(!nodes.some(el => el.id === source.id)) {
            nodes.push(source);
        }
        if(!nodes.some(el => el.id === target.id)) {
            nodes.push(target);
        }
        let edge = new Edge(cableInfo[0], cableInfo[1], source.id, target.id);
        edges.push(edge);
        let cable = {
            id : cableInfo[0], length : cableInfo[1], startNodeId : cableInfo[2],
            startNodeType : cableInfo[3], endNodeId : cableInfo[4], endNodeType : cableInfo[5]}
        cables.push(cable);
    }
})
.on('close', () => {
    let isEndNode = true;
    const temp = [];
    for (let i = 0; i < edges.length; i++) {
        for (let j = 0; j < edges.length; j++) {
           if(edges[i].source === edges[j].target) {
               isEndNode = false;
           }
        }
        if (isEndNode) {
            let edge = {
                id : 'c' + (edges.length + temp.length +1), length : 1, startNodeId :  root.id,
                startNodeType : root.type, endNodeId : edges[i].source, endNodeType : edges[i]
            }
            temp.push(edge)
        }
    }
    let final = cables.concat(temp);
    final.forEach((elem) => {
        let source = new Node(elem.startNodeId, elem.startNodeType);
        let target = new Node(elem.endNodeId, elem.endNodeType);
        graph.addNode(source);
        graph.addNode(target);
        graph.addEdge(source, target, elem.length, elem.id);
    });
    let topology = {
        nodes : graph.getNodes(),
        edges : graph.getEdges()
    };
    console.log(topology);
})
.on('error', (err) => {
    console.log(err.message);
});
