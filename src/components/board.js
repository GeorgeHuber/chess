import React from "react";

import {Square, Row} from "./square"
import Piece, {StartingPieces} from "./pieces"

export class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board:this.createPieceArray(this.props.width,this.props.height),
            selected:null,
            turn:"white",
            turnList:[]
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

    isLegalMove = (p,x,y,board,h,w,turn,turnList,manualOveride)=>{
        if(manualOveride){
            return true
        }
        //checks for correct turns
        if(p.color!=turn){
            return false;
        }
    
        //checks pawn movement
        if(p.type=="pawn"){
            //checks attack
            var square=board[y][x];
            if(square.piece&&square.piece.color!=p.color){
                if(Math.abs(p.x-x)!=1 || y-p.y!=(p.color=="white"?1:-1)){
                    return false
                }
                return true
            }
            //todo enpassant check
            var previous=turnList[turnList.length-1]
            if (Math.abs(p.x-x)==1) {
                if (y-p.y==(p.color=="white"?1:-1)) {
                    if (previous.piece.type=="pawn") {
                        if (Math.abs(previous.piece.y-previous.y)==2) {
                            if (Math.abs(previous.piece.x==x)==1){
                                board[p.y][p.x].isSelected=false;
                                board[p.y][p.x].piece=null;
                                p.move(x,p.y);
                                board[p.y][p.x].piece=p;
                                this.setState({
                                    board:board
                                })
                                return true
                            }
                        }
                    }
                }
            }
            //checks movement
            if(p.x!=x){
                return false
            }
            if(p.color=="white" && ((y-p.y!=1) && !(y==3 && p.y==1))){
                return false
            }
            if(p.color=="black" && ((y-p.y!=-1) && !(y==h-4 && p.y==h-2))){
                return false
            }
        }
        if(p.type=="knight"){
            if((x-p.x)**2+(y-p.y)**2!=5){
                return false
            }
            return true
        }
    
        if(p.type=="king"){
            if(Math.abs(p.x-x)>1 || Math.abs(p.y-y)>1){
                return false
            }
            return true;
        }
    
        if(p.type=="rook"){
            //checks to make sure area is clear
            if(p.x-x!=0 && p.y-y!=0){
                return false
            }

            //castling support
            if(p.y-y==0 && (p.y==0 || p.y==7)){
                if(p.x==0 && x==2){
                    if(!board[p.y][1].piece && !board[p.y][2].piece){
                        if(board[p.y][3].piece && board[p.y][3].piece.type=="king"){
                            var k= board[p.y][3].piece;
                            board[p.y][3].piece=null;
                            board[p.y][p.x].isSelected=false;
                            k.move(1,p.y);
                            board[k.y][k.x].piece=k;
                            this.setState({
                                board:board
                            })
                            
                            return true
                        }
                    }
                }
                if(p.x==7 && x==4){
                    if(!board[p.y][4].piece && !board[p.y][5].piece && !board[p.y][6].piece){
                        if(board[p.y][3].piece && board[p.y][3].piece.type=="king"){
                            var k= board[p.y][3].piece;
                            board[p.y][3].piece=null;
                            board[p.y][p.x].isSelected=false;
                            k.move(5,p.y);
                            board[k.y][k.x].piece=k;
                            this.setState({
                                board:board
                            })
                            
                            return true
                        }
                    }
                }
            }


            if(p.x-x!=0){
                var tx=p.x;
                tx+=(tx<x?1:-1)
                while(tx!=x){
                    if(board[p.y][tx].piece){
                        return false
                        
                    }
                    tx+=(tx<x?1:-1)
                }
            }
            else if(p.y-y!=0){
                var ty=p.y;
                ty+=(ty<y?1:-1)
                while(ty!=y){
                    if(board[ty][p.x].piece){
                        return false
                    }
                    ty+=(ty<y?1:-1)
                }
            }
            return true
        }
        
        if(p.type=="bishop"){
            //checks to make sure area is clear
            if(Math.abs(p.x-x)!=Math.abs(p.y-y)){
                return false
            }
            //diagonals
            else{
                var tx=p.x;
                var ty=p.y
                tx+=(tx<x?1:-1)
                ty+=(ty<y?1:-1)
                while(tx!=x){
                    if(board[ty][tx].piece){
                        return false
                    }
                    tx+=(tx<x?1:-1)
                    ty+=(ty<y?1:-1)
                }
            }
            
            return true
        }
        if(p.type=="queen"){
            if(Math.abs(p.x-x)!=Math.abs(p.y-y)){
                if(p.x-x!=0 && p.y-y!=0){
                    return false
                }
                if(p.x-x!=0){
                    var tx=p.x;
                    tx+=(tx<x?1:-1)
                    while(tx!=x){
                        if(board[p.y][tx].piece){
                            return false
                            
                        }
                        tx+=(tx<x?1:-1)
                    }
                }
                else if(p.y-y!=0){
                    var ty=p.y;
                    ty+=(ty<y?1:-1)
                    while(ty!=y){
                        if(board[ty][p.x].piece){
                            return false
                        }
                        ty+=(ty<y?1:-1)
                    }
                }
            } else{
                var tx=p.x;
                var ty=p.y
                tx+=(tx<x?1:-1)
                ty+=(ty<y?1:-1)
                while(tx!=x){
                    if(board[ty][tx].piece){
                        return false
                    }
                    tx+=(tx<x?1:-1)
                    ty+=(ty<y?1:-1)
                }
            }
            return true
        }
        return true;
    }



    move = (p,x,y) =>{
        if(p){
            var temp=this.state.board;
            if(this.isLegalMove(p,x,y,temp,this.props.width,this.props.height,this.state.turn, this.state.turnList)){


                var tempTurns=this.state.turnList;
                tempTurns.push({
                    x:p.x,
                    y:p.y,
                    piece:p
                })
                this.setState({turnList:tempTurns})


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


