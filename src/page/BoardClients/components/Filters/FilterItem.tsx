import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText, Paper} from "@mui/material";
import s from './Filterrs.module.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


type PropsType = {
    title: string
    options: Array<string>
    removeSelf: (filter: string) => void
    onChange: (checkedOptions: string[], filterName: string) => void
}

export const FilterItem: React.FC<PropsType> = (
    {
        title,
        removeSelf,
        options,
        onChange
    }
) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    console.log(anchorEl)
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
        const newOptions = [...options]
        setCheckedOptions(newOptions)
        onChange && onChange(newOptions, title)
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
        removeSelf(title)
    }

    return (
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
                <Paper>
                    111
                </Paper>
            </Menu>

            <Menu
                PaperProps={{sx: {width: '324px'}}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >


                {
                    options.map(option => <MenuItem
                        key={option}
                        onClick={() => menuItemClickHandler(option)}
                    >
                        <Checkbox checked={isChecked(option)}/>
                        <ListItemText primary={option}/>
                    </MenuItem>)
                }
                <Divider/>
                <div className={s.bottomItemMenu}>
                    <MenuItem disabled={checkedOptions.length === options.length}
                              onClick={selectAllCheckbox}>Выбрать все</MenuItem>
                    {checkedOptions.length
                        ? <MenuItem onClick={clearAllCheckbox}>Сбросить ({checkedOptions.length})</MenuItem>
                        : <MenuItem onClick={deleteBtnHandler}>Удалить</MenuItem>}
                </div>
            </Menu>


        </div>
    );
};