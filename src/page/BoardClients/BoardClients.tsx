import React from 'react';
import {FiltersComponent} from "./components/Filters/FiltersComponent";
import {ClientsTable} from "./components/tabe/ClientsTable";

export const BoardClients = () => {
    return (
        <>
            <FiltersComponent/>
            <ClientsTable/>
        </>
    );
}
