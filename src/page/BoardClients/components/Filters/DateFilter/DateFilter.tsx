import React, {useState} from 'react';
import s from "./DateFilter.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {FormControlLabel, TextField, Typography} from "@mui/material";
import dayjs, {Dayjs} from 'dayjs';
import {LocalizationProvider, StaticDatePicker} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {styled} from "@mui/material/styles";
import Switch from '@mui/material/Switch';

const StyledMenuItem = styled(MenuItem)(() => ({
    justifyContent: "center",
    padding: "12px 0",
}))

type PropsType = {
    removeSelf: (filter: string) => void
    title: string
}

export const DateFilter: React.FC<PropsType> = (
    {
        removeSelf,
        title
    }) => {

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const deleteBtnHandler = () => {
        removeSelf && removeSelf(title)
    }

    const setToday = () => {
        setDate(dayjs(new Date()))
    }

    const [date, setDate] = React.useState<Dayjs | null>(
        dayjs(new Date())
    );

    return (<>
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
                className={s.menu}
                PaperProps={{sx: {width: '324px'}}}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}

            >
                <StyledMenuItem sx={{justifyContent: 'space-between', paddingRight: '24px', paddingLeft: '10px'}}>
                    <FormControlLabel
                        labelPlacement="start"
                        control={<Switch/>}
                        label="Период"
                    />
                    <Typography>
                        Сбросить
                    </Typography>
                </StyledMenuItem>

                <StyledMenuItem className={s.dateDisplay}>
                    <Typography>
                        {date && date.format('DD.MM.YYYY')}
                    </Typography>
                </StyledMenuItem>

                <div>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            displayStaticWrapperAs="desktop"
                            value={date}
                            onChange={(newValue) => {
                                setDate(newValue);
                            }}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <StyledMenuItem onClick={setToday} sx={{borderTop: '1px solid lightgray', margin: "0 15px"}}>
                    <Typography color={'lightblue'}>
                        Сегодня
                    </Typography>
                </StyledMenuItem>

                <StyledMenuItem onClick={deleteBtnHandler} sx={{borderTop: '1px solid lightgray'}}>
                    <Typography>
                        Удалить
                    </Typography>
                </StyledMenuItem>

            </Menu>
        </>
    );
};