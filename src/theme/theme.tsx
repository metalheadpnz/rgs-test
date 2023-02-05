import {createTheme} from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: '#B70037',
        },
        secondary:{
            main: '#5e5e5e'
        },
    },
    typography: {
        button: {
            textTransform: 'none',
            fontWeight: "bold"
        }
    },

})
