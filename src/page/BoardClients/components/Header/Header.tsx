import React from 'react';
import {Toolbar, Typography, IconButton, Avatar, Badge} from '@mui/material';
import {AccountCircle} from "@mui/icons-material";
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';

type Props = {}

type userData = {
    userName: string;
    userPic: string;
    userID: number;
    userStatus: string;
}

const userData: userData = {
    userName: 'Петров Алексей',
    userPic: 'https://mui.com/static/images/avatar/1.jpg',
    userID: 133722452,
    userStatus: 'Агент',
}

export const Header: React.FC<Props> = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'end'}}>
            <Toolbar style={{paddingRight: 0}}>

                <div style={{display: 'flex', flexDirection: 'column', alignItems: 'end'}}>
                    <Typography variant={'body1'}>
                        {userData.userName}
                    </Typography>
                    <Typography variant={'body2'} display={'block'}>
                        {userData.userID} {userData.userStatus}
                    </Typography>
                </div>

                <IconButton color="inherit">
                    <Avatar src={userData.userPic}>
                        {!userData.userPic && <AccountCircle/>}
                    </Avatar>
                </IconButton>

                <IconButton>
                    <Badge badgeContent={4} color="primary">
                        <NotificationsNoneIcon color="action"/>
                    </Badge>
                </IconButton>

            </Toolbar>
        </div>
    );
}