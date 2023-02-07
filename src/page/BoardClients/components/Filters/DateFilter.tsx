import React, {useState} from 'react';
import s from "./Filterrs.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText, Paper, TextField} from "@mui/material";
import {DesktopDatePicker} from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";

const title = 'Дата'
const handleClick = () => {
}

const onChange: any = () => {
}

export const DateFilter = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const [checkedOptions, setCheckedOptions] = useState<Array<string>>([])

    const menuItemClickHandler = (option: string) => {
        const newOptions = checkedOptions.includes(option)
            ? checkedOptions.filter(opt => opt !== option)
            : [...checkedOptions, option]
        setCheckedOptions(newOptions)
        onChange && onChange(newOptions, title)
    }

    const selectAllCheckbox = () => {

    }

    const clearAllCheckbox = () => {
        const newOptions: [] = []
        setCheckedOptions(newOptions)
        onChange && onChange(newOptions, title)
    }

    const isChecked = (option: string) => {
        return checkedOptions.includes(option)
    }

    const deleteBtnHandler = () => {

    }

    const [value, setValue] = React.useState<Dayjs | null>(
        dayjs('2014-08-18T21:11:54'),
    );

    const handleChange = (newValue: Dayjs | null) => {
        setValue(newValue);
    };


    return (<>


            <div className={`${s.filterWrapper} ${checkedOptions.length ? s.filled : ''}`}>

                <Button
                    className={s.filterButton}
                    variant='outlined'
                    color={'secondary'}
                    onClick={handleClick}
                    endIcon={open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
                >

                    {title}
                </Button>

                <Menu
                    PaperProps={{sx: {width: '324px'}}}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}

                >

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={value}
                            onChange={(newValue) => {
                                setValue(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>

                </Menu>

            </div>
        </>
    );
};