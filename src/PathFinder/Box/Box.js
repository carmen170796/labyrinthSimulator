import React from 'react'
import './Box.css'

class Box extends React.Component{
    render(){
        const {col,row,startBox,endBox,isWall,isVisited} = this.props.data
        const onClickTo = this.props.handleOnClick
        const handleMouseEnter = this.props.handleMouseEnter
        const handleMouseUp = this.props.handleMouseUp
        const extraclass= startBox ? "startBox" 
        : endBox ? "endBox" 
        : isWall ? "isWall"
        :isVisited ? "isVisited" : ""

        return (
        <div
            onClick = {() => onClickTo(col, row,startBox, endBox,isWall)}
            onMouseUp = {() => handleMouseUp()}
            onMouseEnter = {() => handleMouseEnter(col, row)}
            id={`${col}-${row}`} 
            className= {`box ${extraclass}`}>
        </div>
        )
    }
}

export default Box