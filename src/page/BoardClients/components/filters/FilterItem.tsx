import React from 'react';
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText} from "@mui/material";
import s from './Filterrs.module.scss'

type PropsType = {
    title: string
    options: OptionType[]
    setOptions: React.Dispatch<React.SetStateAction<OptionType[]>>
    removeSelf: (filter: string) => void
}

export type OptionType = {
    name: string
    id: number
    checked: boolean
}

export const FilterItem: React.FC<PropsType> = (
    {
        options,
        setOptions,
        title,
        removeSelf
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

    const menuItemClickHandler = (id: number) => {
        setOptions(prev => prev.map((opt) =>
            opt.id === id ? {...opt, checked: !opt.checked} : opt
        ))
    }

    const selectAllCheckbox = () => {
        setOptions(prev => prev.map(opt => (
            {...opt, checked: true}
        )))
    }

    const clearAllCheckbox = () => {
        setOptions(prev => prev.map(opt => (
            {...opt, checked: false}
        )))
    }

    const selectedCheckBoxAmount = options.reduce((acc, item) => {
        return acc + (item.checked ? 1 : 0)

    }, 0)


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
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                {options.map(option =>
                    <MenuItem
                        key={option.id}
                        value={option.name}
                        onClick={() => menuItemClickHandler(option.id)}>
                        <Checkbox checked={option.checked}/>
                        <ListItemText primary={option.name}/>
                    </MenuItem>
                )}
                <Divider/>
                <div className={s.bottomItemMenu}>
                    <MenuItem disabled={selectedCheckBoxAmount === options.length}
                              onClick={selectAllCheckbox}>Выбрать все</MenuItem>
                    {selectedCheckBoxAmount
                        ? <MenuItem onClick={clearAllCheckbox}>Сбросить ({selectedCheckBoxAmount})</MenuItem>
                        : <MenuItem onClick={() => removeSelf(title)}>Удалить</MenuItem>}
                </div>
            </Menu>

        </div>
    );
};