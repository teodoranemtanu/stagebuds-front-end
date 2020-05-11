import {createMuiTheme} from '@material-ui/core/styles';

const Theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        // primary: {
        //     light: '#B2EBF2',
        //     main: '#00BCD4',
        //     dark: '#0097A7',
        //     contrastText: '#fff',
        //     text: '#212121',
        // },
        primary: {
            dark: '#0097a7',
            main: "#00bcd4",
            contrastText: '#fff',
            shadow: "rgba(0, 0, 0, 0.54)"
        },
        secondary: {
            main: "#ff5722",
            light: "#ffab91",
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