import React, {useState} from 'react';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText} from "@mui/material";
import s from './Filterrs.module.scss'

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
        <div>
            <Button
                variant='outlined'
                id="basic-button"
                onClick={handleClick}
            >
                {title}
            </Button>

            <Menu
                PaperProps={{sx: {width: '324px'}}}
                // id="basic-menu"
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