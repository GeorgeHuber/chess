import React from "react";

import {Square, Row} from "./square"
import Piece, {StartingPieces} from "./pieces"

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board:[],
            pieces:this.createPieceArray(this.props.width,this.props.height)
        }
    }

    createBoard = (w,h)=>{ 
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push(<Square key = {Math.random()} color={(x+y)%2===0?this.props.color1:this.props.color2} piece={this.state.pieces[y][x]} height={this.props.size.y/h+"px"} width={this.props.size.x/w+"px"}/>)
            }
            board.push(row)
        }
        return board;
    }

    refreshBoard = () =>{
    this.setState({
        board:this.createBoard(this.props.width,this.props.height)
    });
    }

    createPieceArray = (w,h) => {
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push(null)
            }
            board.push(row)
        }
        return board;
    }

    renderPiece = (p, pieces) =>{
        pieces[p.y][p.x]=p;
    }

    componentDidMount(){
        var pieces=this.state.pieces;
        
        for (var i=0;i<StartingPieces.length;i++){
            this.renderPiece(StartingPieces[i],pieces);
        }
        this.setState({
            pieces:pieces
        })

        this.refreshBoard();
    }

    render(){
        return(
            <div style={{width:this.props.size.x, height:this.props.size.y}}>
                {this.state.board.map((r)=><Row key={Math.random()} squares={r}/>)}
            </div>
        )
    }
} 


