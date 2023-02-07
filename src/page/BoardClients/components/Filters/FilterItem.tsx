import * as React from 'react';
import {useTheme, styled} from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Autocomplete, {
    AutocompleteCloseReason,
    autocompleteClasses,
} from '@mui/material/Autocomplete';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText} from "@mui/material";
import s from "./Filterrs.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import {useMemo} from "react";

interface LabelType {
    name: string;
    description?: string;
}

interface PopperComponentProps {
    anchorEl?: any;
    disablePortal?: boolean;
    open: boolean;
}

const StyledAutocompletePopper = styled('div')(({theme}) => ({
    [`& .${autocompleteClasses.paper}`]: {
        boxShadow: 'none',
        margin: 0,
        color: 'inherit',
        fontSize: 13,
    },
    [`& .${autocompleteClasses.listbox}`]: {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
        padding: 0,
        [`& .${autocompleteClasses.option}`]: {
            minHeight: 'auto',
            alignItems: 'flex-start',
            '&[aria-selected="true"]': {
                backgroundColor: 'transparent',
            },
            [`&.${autocompleteClasses.focused}, &.${autocompleteClasses.focused}[aria-selected="true"]`]:
                {
                    backgroundColor: theme.palette.action.hover,
                },
        },
    },
    [`&.${autocompleteClasses.popperDisablePortal}`]: {
        position: 'relative',
    },
}));

function PopperComponent(props: PopperComponentProps) {
    const {disablePortal, anchorEl, open, ...other} = props;

    return <StyledAutocompletePopper {...other} />;
}

const StyledPopper = styled(Popper)(({theme}) => ({
    boxShadow: `0 8px 24px ${
        theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
    }`,

    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 0,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({theme}) => ({
    padding: 10,
    width: '100%',
    '& input': {
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid #cbcfd6`,
        fontSize: 14,
    }
}));

const StyledInputHidden = styled(StyledInput)(({theme}) => ({
    padding: 0,
    height: 0,
    fontSize: 0,
    visibility: 'hidden',
    '& input': {
        display: 'none',
        fontSize: 0,
        height: 0
    },
}));

export function FilterItem({
                               getValue,
                               options,
                               title,
                               removeSelf
                           }: { getValue: any, options: string[], title: string, removeSelf: (filter: string) => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const theme = useTheme();


    const labels = useMemo(() => options.map(option => ({name: option, description: option})), [])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {

        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'github-label' : undefined;

    const clearAllCheckbox = () => {
        setPendingValue([])
        getValue([])
    }

    const selectAllCheckbox = () => {
        setPendingValue([...labels])
        getValue([...labels])
    }

    const deleteBtnHandler = () => {
        removeSelf && removeSelf(title)
    }

    return (
        <React.Fragment>
            <Button
                className={s.filterButton}
                variant='outlined'
                color={'secondary'}
                onClick={handleClick}
                endIcon={open ? <KeyboardArrowUpIcon/> : <KeyboardArrowDownIcon/>}
            >
                {title}
            </Button>

            <StyledPopper id={id} open={open} anchorEl={anchorEl} placement="bottom-start">
                <ClickAwayListener onClickAway={handleClose} mouseEvent="onMouseDown">
                    <div>
                        <Autocomplete
                            open
                            multiple
                            onClose={(
                                event: React.ChangeEvent<{}>,
                                reason: AutocompleteCloseReason,
                            ) => {
                                if (reason === 'escape') {
                                    handleClose();
                                }
                            }}

                            value={pendingValue}
                            onChange={(event, newValue, reason) => {
                                getValue(newValue)

                                if (
                                    event.type === 'keydown' &&
                                    (event as React.KeyboardEvent).key === 'Backspace' &&
                                    reason === 'removeOption'
                                ) {
                                    return;
                                }
                                setPendingValue(newValue);
                            }}

                            disableCloseOnSelect
                            PopperComponent={PopperComponent}
                            renderTags={() => null}
                            noOptionsText="не найдено"
                            renderOption={(props, option, {selected}) =>
                                <MenuItem {...props}>
                                    <Checkbox checked={selected} sx={{alignSelf: "center"}}/>
                                    <ListItemText primary={option.name} sx={{alignSelf: "center"}}/>
                                </MenuItem>
                            }
                            options={labels}

                            getOptionLabel={(option) => option.name}

                            renderInput={(params) =>
                                options.length < 9
                                    ? <StyledInput
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder="Filter labels"
                                    />
                                    : <StyledInputHidden
                                        ref={params.InputProps.ref}
                                        inputProps={params.inputProps}
                                        autoFocus
                                        placeholder="Filter labels"
                                    />
                            }
                        />

                        <Box
                            sx={{
                                borderBottom: `1px solid ${
                                    theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
                                }`,
                                padding: '8px 10px',
                                fontWeight: 600,
                            }}
                        >
                            <Divider/>
                            <div className={s.bottomItemMenu}>
                                <MenuItem disabled={pendingValue.length === options.length}
                                          onClick={selectAllCheckbox}>Выбрать все</MenuItem>
                                {pendingValue.length
                                    ? <MenuItem onClick={clearAllCheckbox}>Сбросить ({pendingValue.length})</MenuItem>
                                    : <MenuItem onClick={deleteBtnHandler}>Удалить</MenuItem>}
                            </div>
                        </Box>
                    </div>
                </ClickAwayListener>
            </StyledPopper>
        </React.Fragment>
    );
}