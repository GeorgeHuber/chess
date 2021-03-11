import React from "react";

import {Board} from "../components/board"
class Home extends React.Component{

    constructor(props){
        super(props);
        this.state={
            t:0,
            x:Math.round(window.innerWidth/2).toString(),
        }
        this.timer=null;
        this.child = React.createRef();
        this.myBoard=<Board ref={this.child} size={{x:this.state.x,y:this.state.x}} width={8} height={8} color1={"white"} color2={"transparent"}/>
    }

    updateSize=()=>{
        var x=Math.round(window.innerWidth/2).toString();
        this.setState({
            x:x
        });
        this.child.current.updateSize(x,x)
    }

    componentDidMount(){
        this.timer=setInterval(()=>{
            this.setState({
                t:this.state.t+1
            })
        },51)
        window.addEventListener('resize', this.updateSize);
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateSize);
        return this.timer;
    }

    r(t){
        var res=Math.sin(t/255)*100+50;
        return Math.round(res)%255
    }
    g(t){
        var res=Math.sin(t*4/255)*100+50;
        return Math.round(res)%255
    }
    b(t){
        var res=Math.sin(t*6/255)*100+50;
        return Math.round(res)%255
    }

    
    render(){
        var t=this.state.t;
        return(
            <div style={{
                width:"100vw",
                height:"100vh",
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                justifyContent:"space-around",
                backgroundColor:"rgb("+this.r(t).toString()+","+this.g(t).toString()+","+this.b(t).toString()+")"
                }}>
                {this.myBoard}
            </div>
        )
    }

}




export default Home;