module.exports = class Graph{
    constructor(){
        this.nodes = new Map()
    }
    addNode(node){
        if (!this.nodes.has(node)) {
            this.nodes.set(node, []);
        }
    }
    addEdge(source, destination, length, edgeId){
        this.nodes.get(source).push({id: destination, length:length, edgeId: edgeId})
        this.nodes.get(destination).push({id: source, length:length, edgeId: edgeId})
    }
    getNodes() {
        let nodes = []
        for (let [node] of this.nodes) {
            if(!nodes.some(el => el.id === node.id)) {
                nodes.push(node);
            }
        }
        return nodes;
    }
    getEdges() {
        let edges = []
        for (let [node, edge] of this.nodes) {
            let temp = {id: edge[0].edgeId, length: edge[0].length, source: node.id, target: edge[0].id.id,}
            if(!edges.some(el => el.id === edge[0].edgeId)) {
                edges.push(temp);
            }
        }
        return edges;
    }
}
