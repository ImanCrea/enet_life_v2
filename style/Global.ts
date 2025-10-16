import {StyleSheet} from 'react-native';
import {COLORS} from "../constants";

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    content: {
        flex: 1,
        //backgroundColor: 'red'
    },
    title: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1,
        textAlign: 'center',
        color: COLORS.gray,
    },
    titleH2: {
        fontSize: 16,
        fontWeight: '700',
        letterSpacing: 1,
        color: COLORS.gray,
        paddingBottom: 10,
    },
    titleH3: {
        fontSize: 14,
        fontWeight: '700',
        letterSpacing: 1,
        color: COLORS.gray,
    },
    titleH4: {
        fontSize: 16,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    titleH5: {
        fontSize: 16,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    paragraph: {
        color: COLORS.gray,
    },
    drawerLinkItem: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.gray,
        marginLeft: 5,
    },
});
