import {ActivityIndicator, View, StyleSheet} from 'react-native';
import {COLORS} from '../../constants';

function Loading({size = 'large'}: {size?: 'small' | 'large'}) {
    return (
        <View style={styles.loading}>
            <ActivityIndicator size={size} color={COLORS.primary} />
        </View>
    );
}

export default Loading;

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.white,
    },
});
