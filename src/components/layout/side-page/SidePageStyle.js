import { makeStyles } from '@material-ui/core/styles';
import Theme from '../../../Theme';

export const useStyles = makeStyles(() => ({
    root: {
        height: '100vh',
    },
    image: {
        backgroundImage: 'url(https://3.bp.blogspot.com/-uj2rxIZaiOw/WrOlOFixDWI/AAAAAAAAAkg/wEexAPPB6Egy1U1BZDyIcSZKNKkYOWzLwCLcBGAs/s1600/concert-crowd-wallpaper-1.jpg)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            Theme.palette.type === 'light' ? Theme.palette.grey[50] : Theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: Theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: Theme.spacing(1),
        backgroundColor: Theme.palette.primary.dark,
    }
}));
