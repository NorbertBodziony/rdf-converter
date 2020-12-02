import { makeStyles, createStyles } from '@material-ui/core/styles'
import { colors } from '@static/theme'

const useStyles = makeStyles(() =>
  createStyles({
    background: {
      minHeight: '100vh',
      minWidth: '100%',
      position: 'relative',
      background: '#030313',
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      padding: 16
    },

    dots: {
      backgroundColor: 'white',
      borderRadius: 15
      // width: 600,
      // height: 600
    },
    header: { margin: 20 },
    input: {
      backgroundColor: colors.gray.skeletonBackground,
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
      width: '100%'
    },
    select: {
      width: 300,
      borderColor: colors.green.main,
      backgroundColor: colors.gray.skeletonBackground,
      borderRadius: 5
      // borderStyle: 'solid'
    },
    option: {
      color: colors.green.main
    },
    selectMenu: {
      backgroundColor: colors.black.kinda
    }
  })
)
export default useStyles
