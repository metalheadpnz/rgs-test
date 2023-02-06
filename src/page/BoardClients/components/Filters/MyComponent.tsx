import * as React from 'react';
import {useTheme, styled} from '@mui/material/styles';
import Popper from '@mui/material/Popper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import Autocomplete, {
    AutocompleteCloseReason,
    autocompleteClasses,
} from '@mui/material/Autocomplete';
import ButtonBase from '@mui/material/ButtonBase';
import InputBase from '@mui/material/InputBase';
import Box from '@mui/material/Box';
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {Checkbox, Divider, ListItemText} from "@mui/material";
import s from "./Filterrs.module.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Button from "@mui/material/Button";
import {useMemo} from "react";

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
            padding: 8,
            borderBottom: `1px solid  ${
                theme.palette.mode === 'light' ? ' #eaecef' : '#30363d'
            }`,
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
    border: `1px solid ${theme.palette.mode === 'light' ? '#e1e4e8' : '#30363d'}`,
    boxShadow: `0 8px 24px ${
        theme.palette.mode === 'light' ? 'rgba(149, 157, 165, 0.2)' : 'rgb(1, 4, 9)'
    }`,
    borderRadius: 6,
    width: 300,
    zIndex: theme.zIndex.modal,
    fontSize: 13,
    color: theme.palette.mode === 'light' ? '#24292e' : '#c9d1d9',
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1c2128',
}));

const StyledInput = styled(InputBase)(({theme}) => ({
    padding: 10,
    width: '100%',
    borderBottom: `1px solid ${
        theme.palette.mode === 'light' ? '#eaecef' : '#30363d'
    }`,
    '& input': {
        borderRadius: 4,
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#0d1117',
        padding: 8,
        transition: theme.transitions.create(['border-color', 'box-shadow']),
        border: `1px solid ${theme.palette.mode === 'light' ? '#eaecef' : '#30363d'}`,
        fontSize: 14,
        '&:focus': {
            boxShadow: `0px 0px 0px 3px ${
                theme.palette.mode === 'light'
                    ? 'rgba(3, 102, 214, 0.3)'
                    : 'rgb(12, 45, 107)'
            }`,
            borderColor: theme.palette.mode === 'light' ? '#0366d6' : '#388bfd',
        },
    },
}));

// const Button = styled(ButtonBase)(({theme}) => ({
//     fontSize: 13,
//     width: '100%',
//     textAlign: 'left',
//     paddingBottom: 8,
//     color: theme.palette.mode === 'light' ? '#586069' : '#8b949e',
//     fontWeight: 600,
//     '&:hover,&:focus': {
//         color: theme.palette.mode === 'light' ? '#0366d6' : '#58a6ff',
//     },
//     '& span': {
//         width: '100%',
//     },
//     '& svg': {
//         width: 16,
//         height: 16,
//     },
// }));


// const labels: LabelType[] = [{name: 'option1', description: 'bla'}]


export default function ({
                             getValue,
                             options,
                             title,
                             removeSelf
                         }: { getValue: any, options: string[], title: string, removeSelf: (filter: string) => void }) {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    // const [value, setValue] = React.useState<LabelType[]>([]);
    const [pendingValue, setPendingValue] = React.useState<LabelType[]>([]);
    const theme = useTheme();


    const labels = useMemo(() => options.map(option => ({name: option as string, description: option as string})), [])


    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        // setPendingValue(value);
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        // setValue(pendingValue);
        // if (anchorEl) {
        //     anchorEl.focus();
        // }
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
            {/*<Box sx={{width: 221, fontSize: 13}}>*/}
            {/*    <Button disableRipple aria-describedby={id} onClick={handleClick}>*/}
            {/*        <span>Labels</span>*/}
            {/*    </Button>*/}
            {/*</Box>*/}

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
                <ClickAwayListener onClickAway={handleClose}>
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
                            noOptionsText="No labels"
                            renderOption={(props, option, {selected}) => {

                                return <MenuItem {...props}>
                                    <Checkbox checked={selected}/>
                                    <ListItemText primary={option.name}/>
                                </MenuItem>


                            }}

                            // <li {...props}>
                            //     <Box
                            //         component={DoneIcon}
                            //         sx={{width: 17, height: 17, mr: '5px', ml: '-2px'}}
                            //         style={{
                            //             visibility: selected ? 'visible' : 'hidden',
                            //         }}
                            //     />
                            //     <Box
                            //         component="span"
                            //         sx={{
                            //             width: 14,
                            //             height: 14,
                            //             flexShrink: 0,
                            //             borderRadius: '3px',
                            //             mr: 1,
                            //             mt: '2px',
                            //         }}
                            //         style={{backgroundColor: option.color}}
                            //     />
                            //     <Box
                            //         sx={{
                            //             flexGrow: 1,
                            //             '& span': {
                            //                 color:
                            //                     theme.palette.mode === 'light' ? '#586069' : '#8b949e',
                            //             },
                            //         }}
                            //     >
                            //         {option.name}
                            //         <br/>
                            //         <span>{option.description}</span>
                            //     </Box>
                            //     <Box
                            //         component={CloseIcon}
                            //         sx={{opacity: 0.6, width: 18, height: 18}}
                            //         style={{
                            //             visibility: selected ? 'visible' : 'hidden',
                            //         }}
                            //     />
                            // </li>
                            //  )}


                            // options={[...labels].sort((a, b) => {
                            //     // Display the selected labels first.
                            //     let ai = value.indexOf(a);
                            //     ai = ai === -1 ? value.length + labels.indexOf(a) : ai;
                            //     let bi = value.indexOf(b);
                            //     bi = bi === -1 ? value.length + labels.indexOf(b) : bi;
                            //     return ai - bi;
                            // })}

                            options={labels}

                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => (
                                <StyledInput
                                    ref={params.InputProps.ref}
                                    inputProps={params.inputProps}
                                    autoFocus
                                    placeholder="Filter labels"
                                />
                            )}
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

interface LabelType {
    name: string;
    // color: string;
    description?: string;
}


const labels2 = [
    {
        name: 'good first issue',
        color: '#7057ff',
        description: 'Good for newcomers',
    },
    {
        name: 'help wanted',
        color: '#008672',
        description: 'Extra attention is needed',
    },
    {
        name: 'priority: critical',
        color: '#b60205',
        description: '',
    },
    {
        name: 'priority: high',
        color: '#d93f0b',
        description: '',
    },
    {
        name: 'priority: low',
        color: '#0e8a16',
        description: '',
    },
    {
        name: 'priority: medium',
        color: '#fbca04',
        description: '',
    },
    {
        name: "status: can't reproduce",
        color: '#fec1c1',
        description: '',
    },
];
