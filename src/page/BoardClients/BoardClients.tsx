import React from 'react';
import {FiltersComponent} from "./components/Filters/FiltersComponent";
import {ClientsTable} from "./components/tabe/ClientsTable";

export const BoardClients = () => {
    return (
        <div style={{width: '100%'}}>
            <FiltersComponent/>
            <ClientsTable/>
        </div>
    );
}
