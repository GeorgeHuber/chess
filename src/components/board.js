import React from "react";

import {Square, Row} from "./square"
import Piece, {StartingPieces, isLegalMove} from "./pieces"

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board:this.createPieceArray(this.props.width,this.props.height),
            selected:null,
            turn:"white"
        }
    }


    handleClick=(piece,x,y)=>{
        if(piece && this.state.selected && this.state.selected.piece && this.state.selected.piece.color!=piece.color){
            this.move(this.state.selected.piece,x,y);
        }else{
            if (piece){
                var temp=this.state.board;
                if( this.state.selected && this.state.selected.x==x && this.state.selected.y==y) {
                    temp[this.state.selected.y][this.state.selected.x].isSelected=false;
                    this.setState({
                        board:temp,
                        selected:null
                    })
                } else{
                    if(this.state.selected){
                        temp[this.state.selected.y][this.state.selected.x].isSelected=false;
                    }
                    temp[y][x].isSelected=true;
                    this.setState({
                        board:temp,
                        selected:temp[y][x]
                    })
                }
            } else{
                if(this.state.selected){
                    this.move(this.state.selected.piece,x,y)
                }
            }
        }   
    }


    createBoard = (w,h)=>{ 
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push(<Square 
                    x={x}
                    y={y}
                    handleClick={(piece,x,y)=>this.handleClick(piece,x,y)} 
                    key = {Math.random()} 
                    color={(x+y)%2===0?this.props.color1:this.props.color2} 
                    piece={this.state.board[y][x].piece} 
                    height={this.props.size.y/h+"px"} 
                    width={this.props.size.x/w+"px"} 
                    isSelected={this.state.board[y][x].isSelected}/>)
            }
            board.push(row)
        }
        return board;
    }

    createPieceArray = (w,h) => {
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push({x:x,y:y,isSelected:false,piece:null})
            }
            board.push(row)
        }
        return board;
    }

    renderPiece = (p, pieces) =>{
        pieces[p.y][p.x].piece=p;
    }

    move = (p,x,y) =>{
        if(p){
            var temp=this.state.board;
            if(isLegalMove(p,x,y,temp,this.props.width,this.props.height,this.state.turn)){
                temp[p.y][p.x].piece=null;
                temp[p.y][p.x].isSelected=false;
                p.move(x,y);
                temp[p.y][p.x].piece=p;
                this.setState({
                    board:temp,
                    turn:this.state.turn=="white"?"black":"white"
                })
            }
        }
    }

    componentDidMount(){
        var board=this.state.board;
        
        for (var i=0;i<StartingPieces.length;i++){
            this.renderPiece(StartingPieces[i],board);
        }
        this.setState({
            board:board
        })
        console.log(board);
    }

    render(){
        var boardRender=this.createBoard(this.props.width,this.props.height);
        return(
            <div style={{width:this.props.size.x, height:this.props.size.y}}>
                {boardRender.map((r)=><Row key={Math.random()} squares={r}/>)}
            </div>
        )
    }
} 


