import React, {useState} from 'react';
import Button, {ButtonProps} from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import s from './AddFilter.module.scss'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import AddIcon from '@mui/icons-material/Add';


type PropsType = {
    options: Array<string>
    setFilter: (option: string) => void
    activeFilters: Array<string>

    buttonProps?: ButtonProps
    variant: 'withIcon' | 'withOutIcon'
}

export const AddFilter: React.FC<PropsType> = (
    {
        options,
        setFilter,
        activeFilters,
        variant,
        buttonProps
    }
) => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);
    const isWithIcon = variant === 'withIcon'
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
        <div className={s.wrap}>
            <Button
                endIcon={isWithIcon ? <FilterAltIcon/> : <AddIcon/>}
                className={isWithIcon ? open ? s.withIcon : '' : open ? s.withOutIconOpen : s.withOutIcon}
                sx={{padding: '6px 16px'}}
                variant={isWithIcon ? open ? 'contained' : 'text' : undefined}
                onClick={handleClick}
                children={isWithIcon ? 'Фильтры' : 'Добавить фильтр'}
                {...buttonProps}/>
            <Menu id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                      'aria-labelledby': 'basic-button',
                  }}>
                <div style={{minWidth: '232px', maxWidth: '324px'}}>
                    {
                        options.map((menuItem, index) =>
                            <MenuItem
                                disabled={activeFilters.includes(menuItem)}
                                onClick={(event) => handleMenuItemClick(event, index)}
                                key={index}>
                                {menuItem}
                            </MenuItem>)
                    }
                </div>
            </Menu>

        </div>
    );
}
