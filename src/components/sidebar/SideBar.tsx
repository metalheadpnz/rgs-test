import React from 'react';
import s from './SideBar.module.scss'
import {Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ListAltIcon from '@mui/icons-material/ListAlt';
import HelpCenterIcon from '@mui/icons-material/HelpCenter';

const menuItems = [
    {menuTitle: 'Главная', icon: HomeIcon},
    {menuTitle: 'Клиенты', icon: PeopleAltIcon},
    {menuTitle: 'Договоры', icon: WidgetsIcon},
    {menuTitle: 'Задачи', icon: ListAltIcon},
]

export const SideBar = () => {
    return (
        <div className={s.wrap}>
            <Box
                // sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
                sx={{width: '240px'}}
                role="presentation"
                // onClick={toggleDrawer(anchor, false)}
                // onKeyDown={toggleDrawer(anchor, false)}
            >
                <ListItem className={s.logo}>
                    <h2>РОСГОССТРАХ</h2>
                </ListItem>

                <List>
                    {menuItems.map((menuItem, index) => (
                        <ListItem key={menuItem.menuTitle} className={index === 1 ? s.menuItemSelected : ''}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <menuItem.icon/>
                                </ListItemIcon>
                                <ListItemText primary={menuItem.menuTitle}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Box>

            <List>
                <ListItem className={s.bottomMenu}>
                    <ListItemIcon>
                        <HelpCenterIcon/>
                    </ListItemIcon>
                    <Typography>
                        Нужна помощь
                    </Typography>
                </ListItem>
            </List>
        </div>
    );
};