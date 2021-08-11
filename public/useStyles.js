//CSS styles for Material UI
import { withStyles } from '@material-ui/core/styles'
import Rating from '@material-ui/lab/Rating'

export const StyledRating = withStyles({
    iconFilled: {
        color: '#db7093',
    },
    iconHover: {
        color: '#db7093',
    },
})(Rating)

const useStyles = (theme) => ({
    specialTypography: {
        fontFamily: [
            'Hanalei Fill',
            'cursive',
        ].join(','),
    },
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
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
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
    cartList: {
        flexDirection: 'column',

    },
    card: {
        height: '100%',
        display: 'flex',
        width: 300,
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: '#8ea2de',
        padding: theme.spacing(2),
    },
    paginationGrid: {
        paddingBottom: theme.spacing(5),
    },
    root: {
        justifyContent: 'center'
    }
})

export default useStyles