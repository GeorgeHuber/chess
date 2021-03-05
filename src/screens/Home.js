import React from "react";

import {Board} from "../components/board"
class Home extends React.Component{
    render(){
        return(
            <div style={{width:"100vw",height:"100vh",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-around"}}>
                
                <Board size={{x:"1000",y:"1000"}} width={8} height={8} color1={"white"} color2={"red"}/>
            </div>
        )
    }

}




export default Home;