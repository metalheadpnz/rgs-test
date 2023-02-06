import React from 'react';
import {BoardClients} from "./page/BoardClients/BoardClients";
import {SideBar} from "./components/sidebar/SideBar";

function App() {

    return (
        <div style={{display: 'flex'}}>
            <SideBar/>
            <BoardClients/>
        </div>
    );
}

export default App;
