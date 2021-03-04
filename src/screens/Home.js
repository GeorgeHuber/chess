import React from "react";

import {Board} from "../components/board"
class Home extends React.Component{
    render(){
        return(
            <div>
                <h1>Hello this is my home page</h1>
                <Board width={8} height={8}/>
            </div>
        )
    }

}




export default Home;