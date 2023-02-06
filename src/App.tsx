import React from 'react';
import {BoardClients} from "./page/BoardClients/BoardClients";
import {SideBar} from "./components/sidebar/SideBar";
import {Header} from "./page/BoardClients/components/Header/Header";
import {Typography} from "@mui/material";

function App() {

    return (
        <div style={{display: 'flex', margin: '0 20px 0 0'}}>
            <SideBar/>
            <div style={{width: '100%'}}>
                <Header/>
                <Typography variant={'h3'} color={'secondary'}>
                    Клиенты
                </Typography>
                <BoardClients/>
            </div>
        </div>
    );
}

export default App;
