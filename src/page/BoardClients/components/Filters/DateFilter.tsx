import React from 'react';
import Button from "@mui/material/Button";
import s from "./Filterrs.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const title = 'Дата'
const handleClick = () => {
}

export const DateFilter = () => {
    return (
        <>
            <Button
                className={s.filterButton}
                variant='outlined'
                color={'secondary'}
                onClick={handleClick}
                // endIcon={open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                endIcon={false ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            >
                {title}
            </Button>
        </>
    );
};