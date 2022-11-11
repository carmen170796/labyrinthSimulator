import React from 'react';
import Box from "./Box/Box";
import dijkstra from "../algorithms/dijkstra"
import './PathFinder.css'


class PathFinder extends React.Component {
    constructor(){
        super()
        this.state={
            matrix: [],
            startRow: 0,
            startCol: 0,
            endRow: 2,
            endCol: 2,
            addWalls:false,
            size:window.innerWidth,
        }
    }

componentDidMount(){
    const newMatrix = this.setMatrix()
    this.setState({matrix:newMatrix})
}

setSizeOfBoard(){
  const size = this.state.size
  const columnAmount = Math.floor(0.80*size/30)  
  return columnAmount
}

setMatrix(){
    const newMatrix =[]
    const columnAmount = this.setSizeOfBoard()
    const rowSize = 17
    for(let col = 0; col < columnAmount; col++){
        const currentRow = []
        for(let row = 0; row < rowSize; row++){
            currentRow.push(this.createABox(col,row))
        }
        newMatrix.push(currentRow)
    }
    return newMatrix
}

createABox(col,row){
    return{
        col,
        row,
        startBox: col === this.state.startCol && row === this.state.startRow ? true : false, 
        endBox: col === this.state.endCol && row === this.state.endRow ? true : false, 
        distance: Infinity,
        isWall: false, 
        isVisited: false
    }
}

handleOnClick(col, row,startBox, endBox,isWall){
    if (this.state.addWalls===true) return 
     if (startBox) {
        this.setState({startCol:'',startRow:''})
         const newMatrix = this.updateProperty(col,row,this.state.matrix,'startBox')
         this.setState({matrix:newMatrix})
     }

     if (endBox) {
        this.setState({endCol:'',endRow:''})
         const newMatrix = this.updateProperty(col,row,this.state.matrix,'endBox')
         this.setState({matrix:newMatrix})
     }

     if(!isWall ){
        if(this.state.endCol === ""){
            this.setState({endCol:col,endRow:row})
            const newMatrix = this.updateProperty(col,row,this.state.matrix,'endBox')
            this.setState({matrix:newMatrix})
        }

        if(this.state.startCol === ""){
            this.setState({startCol:col,startRow:row})
            const newMatrix = this.updateProperty(col,row,this.state.matrix,'startBox')
            this.setState({matrix:newMatrix})
        }
     }

     else return 
}

updateProperty(col,row,matrix,propertyToChange){
    const newMatrix = matrix.slice()
    const node = newMatrix[col][row]
    const newNode = {
        ...node,
        [propertyToChange]: !node[propertyToChange],
    }
    newMatrix[col][row]=newNode
    return newMatrix
}

animationDijkstra(){
this.setState({addWalls:false})
const {matrix,startCol,startRow,endCol,endRow} = this.state
let animations = dijkstra(matrix, matrix[startCol][startRow],matrix[endCol][endRow])
const shortestPath= this.shortestPath()
if (!shortestPath) return 
console.log(shortestPath)
for (let i=0; i < animations.length; i++){
    if (i === animations.length-1){
        setTimeout(()=>{
        for (let j=0; j < shortestPath.length; j++){
            const row = shortestPath[j].row
            const col = shortestPath[j].col
            const currentBox = document.getElementById(`${col}-${row}`)
            setTimeout(()=>{
                currentBox.classList.add("shortestPath")
                    },j* 25)
            }
        }
        , i*20)}
    const row = animations[i].row
    const col = animations[i].col
    const currentBox = document.getElementById(`${col}-${row}`)
    setTimeout(()=>{
        currentBox.classList.add("isVisited")
    },i*15)


    }

}

shortestPath(){
    const {matrix,startCol,startRow,endCol,endRow} = this.state
    let visitedNodesArray = dijkstra(matrix, matrix[startCol][startRow],matrix[endCol][endRow])
    let end = visitedNodesArray.pop()
    if (end  !== matrix[endCol][endRow]){
        alert("Sorry, it is not possible to make it to target")
        return
    }
    let shortestPath =[]
        while(end){
            shortestPath.unshift(end)
            end = end.previousNode
        }

    return shortestPath
    }


handleAddWallsBtn(){
    this.setState({addWalls: true})
}

handleMouseEnter(col,row){
    if (this.state.addWalls === false) return 
    if (this.state.matrix[col][row].startBox) return
    if (this.state.matrix[col][row].endBox) return  

    const newMatrix = this.updateProperty(col,row,this.state.matrix,"isWall")
    this.setState({matrix:newMatrix})

}

handleMouseUp(){
    if (this.state.addWalls === false) return 
    this.setState({addWalls:false})

}

componentDidUpdate(){

}
resetEverything(){
    const boxesArray=document.getElementsByClassName('box')
    for (let i= 0; i<boxesArray.length;i++){
        boxesArray[i].classList.remove('isVisited',"shortestPath")
    } 
    console.log(this.state)
    const newMatrix=this.setMatrix()
    this.setState({
        matrix: newMatrix,
        addWalls:false,
    })
}



render() {
        const matrix = this.state.matrix
        return(
            <div className='pathFinder'>
                <div className="banner-div">
                    <h1 className="banner-text">Labyrinth Simulator</h1>
                    <div className='buttons-container'>
                        <button className='visualize' onClick={()=> this.animationDijkstra()}>Find path</button>
                        <button onClick= {()=>this.handleAddWallsBtn()}> Add Walls </button>
                        <button onClick= {()=> this.resetEverything()}> Reset </button>
                    </div>
                </div>
                <div className='matrix-container'>
                    {matrix.map((col, colIndex) =>{
                        return(
                        <div key={colIndex} className="col">
                            {col.map((box,boxIndex) => {
                                return(
                                    <Box 
                                        handleOnClick={(col, row,startBox, endBox,isWall,event)=>this.handleOnClick(col, row,startBox, endBox,isWall,event)} 
                                        handleMouseEnter={(col,row,event)=>this.handleMouseEnter(col,row,event)} 
                                        handleMouseUp={(event)=>this.handleMouseUp(event)} 
                                        data={box} 
                                        key={boxIndex}>
                                    </Box>)}
                            )}
                        </div>)}
                    )}
                </div>
            </div>
        )
    }
} 




export default PathFinder 