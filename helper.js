const Node = require('./node');

function findRootsNodes(root, edges, cables, graph) {
    const roots = [];
    for (let i = 0; i < edges.length; i++) {
        let isEndNode = true;
        for (let j = 0; j < edges.length; j++) {
            if (edges[i].source === edges[j].target) {
                isEndNode = false;
            }
        }
        if (isEndNode) {
            roots.push(edges[i])
        }
    }
    mergeRootNodes(root, roots, cables, graph);
}

function mergeRootNodes(root, roots, cables, graph) {
    cables.forEach((elem) => {
        let isRoot = false;
        for (let i = 0; i < roots.length; i++) {
            if (roots[i].source === elem.startNodeId) {
                isRoot = true;
            }
        }
        if (isRoot) {
            let target = new Node(elem.endNodeId, elem.endNodeType);
            if (!graph.nodes.has(target)) {
                graph.addNode(target);
            }
            graph.addEdge(root, target, elem.length, elem.id);
        } else {
            let source = new Node(elem.startNodeId, elem.startNodeType);
            let target = new Node(elem.endNodeId, elem.endNodeType);
            graph.addNode(source);
            graph.addNode(target);
            graph.addEdge(source, target, elem.length, elem.id);
        }
    });
}

module.exports.findRootsNodes = findRootsNodes;
