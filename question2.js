const getFromToNodeVertex = (nodeVertex) => {
  const nodes = nodeVertex.split(":");
  const countOfNodes = nodes.length;
  const from = nodes[0];
  const to = nodes[countOfNodes - 1];

  return { from, to };
};

const checkNodeVertexExisted = (listNodeVertex, nodeVertex) => {
  let check = listNodeVertex.find(x => x == nodeVertex);

  return check ? true : false;
};

const clearDuplicateNodeVertex = (listNodeVertex) => {
  let newList = [];

  for (let nodeVertex of listNodeVertex) {
    if (!checkNodeVertexExisted(newList, nodeVertex)) {
      newList.push(nodeVertex);
    }
  }

  return newList;
};

const checkNodeIsExistedInVertex = (nodeVerTex, nodeCheck) => {
  const listNode = nodeVerTex.split(":");
  let check = listNode.find(x => x == nodeCheck);

  return check ? true : false;
};

const totalHeightVertex = (nodeHeight, vertex) =>  {
  let listNode = vertex.split(":");
  let total = 0;

  for (let node of listNode) {
    total = total + nodeHeight[node];
  }
  
  return total;
};

const ListNodeVertexWithHeight = (listNodeVertex, nodeHeight) => {
  let newResult = [];

  for (let vertex of listNodeVertex) {
    let vertexHeight = totalHeightVertex(nodeHeight, vertex);

    newResult.push({
      vertex, vertexHeight
    });
  }

  return newResult;
};

const generateAllVertex =  (nodeHeigh, nodeVertex) => {
  let listNodeVertex = [...nodeVertex];
  const maxNode = Object.keys(nodeHeigh).length;

  for (let nodeCount = 3; nodeCount <= maxNode; nodeCount++) {
    const listNewNodeVertex = [];
    for (let nodeVertex of listNodeVertex) {
      let stockNodeVertex = getFromToNodeVertex(nodeVertex);
      let listNodeStock = nodeVertex.split(":");
      let newNodeVertex = stockNodeVertex.from;

      for (let i = 1; i < listNodeStock.length; i++) {
        if (i < listNodeStock.length - 1) {
          newNodeVertex = `${newNodeVertex}:${listNodeStock[i]}`;
        }
      }

      for (let nodeVertexCheck of listNodeVertex) {
        let checkingNodeVertex = getFromToNodeVertex(nodeVertexCheck);

        if (stockNodeVertex.to == checkingNodeVertex.from) {
          const nodes = nodeVertexCheck.split(":");

          for (let node of nodes) {
            if (!checkNodeIsExistedInVertex(newNodeVertex, node)) {
              newNodeVertex = `${newNodeVertex}:${node}`;
            }
          }

          if (!checkNodeVertexExisted(listNewNodeVertex, newNodeVertex)) {
            listNewNodeVertex.push(newNodeVertex);
          }
        }
      }
    }

    listNodeVertex = [...listNodeVertex, ...listNewNodeVertex];
  }

  listNodeVertex = clearDuplicateNodeVertex(listNodeVertex);

  return ListNodeVertexWithHeight(listNodeVertex, nodeHeigh);
};

const findMax = (nodeVertex, nodeHeigh) => {
  const listVertex = generateAllVertex(nodeHeigh, nodeVertex);
  let listNode = Object.keys(nodeHeigh);

  let listFoundVertex = [];
  for (let vertexObject of listVertex) {
    let vertex = vertexObject.vertex;
    let found = true;

    for (let node of listNode) {
      if (!checkNodeIsExistedInVertex(vertex, node)) {
        found = false;
        break;
      }
    }

    if (found) {
      listFoundVertex.push(vertexObject);
    }
  }

  let found = {};
  let maxHeight = 0;
  for (let vertexObject of listFoundVertex) {
    if (vertexObject.vertexHeight > maxHeight) {
      maxHeight = vertexObject.vertexHeight;
      found = vertexObject;
    }
  }

  return found;
};

module.exports = {
  findMax
}
