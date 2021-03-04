import React from "react"

export class Square extends React.Component {
    render() {
        return (
            <div style={{ width: this.props.width, height: this.props.height, backgroundColor: this.props.color }}>

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