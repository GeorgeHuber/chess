import React from "react"

export class Square extends React.Component {
    constructor(props){
        super(props);
        this.state={
            
        }
    }
    
    render() {
        var isSelected=this.props.isSelected;
        return (
            <div 
            style={{ 
                width: isSelected?"calc( "+this.props.width+" - 8px)":this.props.width, 
                height: isSelected?"calc( "+this.props.height+" - 8px)":this.props.height, 
                backgroundColor: this.props.color,
                display:"flex",alignItems:"center",
                justifyContent:"space-around",
                borderStyle: isSelected?"solid":"none",
                borderWidth:"4px"
                }}
            onClick={()=>{
                if(this.props.piece){
                    this.props.handleClick(this.props.piece.x,this.props.piece.y);
                }
            }}
            >
                {this.props.piece && <img width={"80%"} height={"80%"} alt="" src={this.props.piece.img}/>}
            </div>
        )
    }
}

export class Row extends React.Component {

    render() {
        return (
            <div style={{display:"flex",flexDirection:"row"}}>
                {this.props.squares}
            </div>
        )
    }
}