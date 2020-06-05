import {createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#B2EBF2',
            dark: '#0097a7',
            main: "#00bcd4",
            contrastText: '#fff',
            shadow: "rgba(0, 0, 0, 0.54)"
        },
        secondary: {
            main: "#FFA630",
            light: "#ffcf8f",
            // contrastText: "#025965"
        }
    },
    shape: {
        borderRadius: 8,
    },
    spacing: 8,
    overrides: {
        MuiDrawer: {
            paper: {
                minWidth: 256,
            },
            paperAnchorDockedLeft: {
                borderRight: 'none',
            },
        },
    },
});

export default Theme;