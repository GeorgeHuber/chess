import React from "react";

import {Square, Row} from "./square"
import {StartingPieces} from "./pieces"

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board:this.createBoard(props.width,props.height),
            pieces:StartingPieces
        }
    }

    createBoard = (w,h)=>{ 
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push(<Square key = {Math.random()} color={(x+y)%2===0?this.props.color1:this.props.color2} piece={null} height={this.props.size.y/h+"px"} width={this.props.size.x/w+"px"}/>)
            }
            board.push(row)
        }
        return board;
    }

    renderPiece = (p,temp) =>{
        var cur=temp[p.y][p.x].props
        temp[p.y][p.x]=<Square key={Math.random()} color={cur.color} piece={p} height={cur.height} width={cur.width}/>
        return temp;
    }

    componentDidMount(){
        var temp=this.state.board;
        for (var i=0;i<this.state.pieces.length;i++){
            temp = this.renderPiece(this.state.pieces[i],temp)
        }
        console.log(temp)
        this.setState({board:temp})
    }

    render(){
        return(
            <div style={{width:this.props.size.x+"px", height:this.props.size.y+"px"}}>
                {this.state.board.map((r)=><Row key={Math.random()} squares={r}/>)}
            </div>
        )
    }
} 


