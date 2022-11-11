
export default function dijkstra (matrix, start,end){
    start.distance = 0 
    const unvisitedNodes= getAllBoxes(matrix)
    const  visitedNodes = []

    while(unvisitedNodes.length>0){
      let orderedUnvisitedNodes = unvisitedNodes.sort(sortByDistance)
      let currentNode = orderedUnvisitedNodes.shift()
      if (currentNode.isWall) continue
      if (currentNode.distance === Infinity) return visitedNodes
      currentNode.isVisited = true
      visitedNodes.push(currentNode)
      if (currentNode === end) return visitedNodes
      updateDistanceFromNeighbours(currentNode,matrix)  
    }
  }
 
 
 function getAllBoxes(matrix){
  const graph = []
  let node
    for(let j = 0 ; j<matrix.length; j++){
      for (let i = 0 ; i < matrix[j].length; i++){
         node= matrix[j][i]
         graph.push(node) 
      }
    }
    return graph
  }
  
  function getNeighbours (node,matrix){
    const neighbours = []
    let rowNode = node.row
    let colNode = node.col
    
  
    if (colNode >= 0 && colNode < matrix.length - 1) neighbours.push(matrix[colNode + 1][rowNode]) 
    if (colNode > 0 && colNode <= matrix.length - 1) neighbours.push(matrix[colNode - 1][rowNode])
    if (rowNode >= 0 && rowNode < matrix[colNode].length-1) neighbours.push(matrix[colNode][rowNode+1])
    if (rowNode > 0 && rowNode <= matrix[colNode].length-1) neighbours.push(matrix[colNode][rowNode-1])
      
    
    return neighbours.filter(node=> node.isVisited===false)
  }
  
  function updateDistanceFromNeighbours(node,matrix){
    const neighbours = getNeighbours(node,matrix)
     for (let neighbour of neighbours){
        neighbour.isVisited=true
        neighbour.distance = node.distance+1
        neighbour.previousNode = node 
     }
  }
  
  function sortByDistance(node1,node2){
    return node1.distance - node2.distance
  }
  
  

  