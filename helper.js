function findRootsNodes(root, edges) {
    const roots = [];
    for (let i = 0; i < edges.length; i++) {
        let isEndNode = true;
        for (let j = 0; j < edges.length; j++) {
            if(edges[i].source === edges[j].target) {
                isEndNode = false;
            }
        }
        if (isEndNode) {
            roots.push(edges[i])
        }
    }
    return roots;
}

module.exports.findRootsNodes = findRootsNodes;
