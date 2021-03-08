import React from "react";

import {Board} from "../components/board"
class Home extends React.Component{
    render(){
        return(
            <div style={{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                
                <Board size={{x:"800",y:"800"}} width={8} height={8} color1={"white"} color2={"grey"}/>
            </div>
        )
    }

}




export default Home;