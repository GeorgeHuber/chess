import React from "react";

import {Square, Row} from "./square"


export class Board extends React.Component{
    constructor(props){
        super(props);
        this.state={
            board:this.createBoard(props.width,props.height)
            
        }
    }

    createBoard = (w,h)=>{ 
        var board=[]
        for (var y=0;y<h;y++){
            var row=[];
            for (var x=0;x<w;x++){
                row.push(<Square key = {Math.random()} color={(x+y)%2==0?"orange":"black"} height={"80px"} width={"80px"}/>)
            }
            board.push(row)
        }
        return board;
    }

    
    render(){
        console.log(this.state.board);
        return(
            <div >
                {this.state.board.map((r)=><Row key={Math.random()} squares={r}/>)}
            </div>
        )
    }
} 


