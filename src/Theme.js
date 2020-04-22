import { createMuiTheme } from '@material-ui/core/styles';

const Theme = createMuiTheme({
    typography: {
        useNextVariants: true,
    },
    palette: {
        primary: {
            light: '#63ccff',
            main: '#009be5',
            dark: '#006db3',
            contrastText: '#fff',
        },
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