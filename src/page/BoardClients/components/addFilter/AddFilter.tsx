import React, {useState} from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

type PropsType = {
    options: Array<string>
    setFilter: (option: string) => void
    activeFilters: Array<string>
}

export const AddFilter: React.FC<PropsType> = ({options, setFilter, activeFilters}) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenuItemClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>, index: number) => {
        handleClose()
        setFilter && setFilter(options[index])
    }

    return (
        <>
            <Button
                onClick={handleClick}
            >
                Фильтры
            </Button>

            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                {
                    options.map((menuItem, index) =>
                        <MenuItem
                            disabled={activeFilters.includes(menuItem)}
                            onClick={(event) => handleMenuItemClick(event, index)}
                            key={index}>
                            {menuItem}
                        </MenuItem>)
                }
            </Menu>
        </>
    );
}