import { StyleSheet } from 'react-native'
import { COLORS, SIZES } from '../../constans/theme'

export const styles = StyleSheet.create({
    button: {
        alignSelf: 'center',
        borderRadius: SIZES.radius3,
        backgroundColor: COLORS.orange,
        height: 50,
        justifyContent: 'center',
        padding: SIZES.padding,
        width: '100%'
    },
    text: {
        alignSelf: 'center'
    }
});

