module.exports = class Graph {
    constructor() {
        this.nodes = new Map()
    }

    addNode(node) {
        if (!this.nodes.has(node)) {
            this.nodes.set(node, []);
        }
    }

    addEdge(source, destination, length, edgeId) {
        this.nodes.get(source).push({id: destination, length: length, edgeId: edgeId})
    }

    getNodes() {
        let nodes = []
        for (let [node] of this.nodes) {
            if (!nodes.some(el => el.id === node.id)) {
                nodes.push(node);
            }
        }
        return nodes;
    }

    getEdges() {
        let edges = [];
        for (let [node, neighbors] of this.nodes) {
            let edge = null;
            for (let i = 0; i < neighbors.length; i++) {
                edge = {
                    id: neighbors[i].edgeId,
                    length: neighbors[i].length,
                    source: node.id,
                    target: neighbors[i].id.id
                }
                edges.push(edge);
            }
        }
        return edges;
    }
}
