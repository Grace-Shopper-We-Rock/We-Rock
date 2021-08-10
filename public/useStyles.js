//CSS styles for Material UI
import { withStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'

export const StyledRating = withStyles({
    iconFilled: {
        color: '#ff6d75',
    },
    iconHover: {
        color: '#ff3d47',
    },
})(Rating)

const useStyles = (theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cartGrid: {
        display: 'flex',
        flexDirection: 'row',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    cartCard: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
    },
    card: {
        height: '100%',
        display: 'flex',
        width: 280,
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: '#D4B8EA',
        padding: theme.spacing(2),
    },
})

export default useStyles