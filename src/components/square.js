import React from "react"

export class Square extends React.Component {
    render() {
        return (
            <div style={{ width: this.props.width, height: this.props.height, backgroundColor: this.props.color,display:"flex",alignItems:"center",justifyContent:"space-around" }}>
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