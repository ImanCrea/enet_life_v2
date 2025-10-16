import {StyleSheet, Text, View} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import {COLORS} from "../../../constants";

function DeadlineTypeItem({name, icon, iconType = 'mi'}: {name: string; icon: string; iconType?: 'mi'}) {
    return (
        <View style={styles.typeDeadline}>
            {iconType === 'mi' ? (
                <MaterialIcons
                    name={icon}
                    color={'white'}
                    size={20}
                    style={styles.icon}
                /> as any
            ) : (
                <MaterialCommunityIcons
                    name={icon}
                    color={'white'}
                    size={20}
                    style={styles.icon}
                /> as any
            )}
            <Text style={styles.typeDeadlineText}>{name}</Text>
        </View>
    );
}

export default DeadlineTypeItem;

const styles = StyleSheet.create({
    typeDeadline: {
        flexDirection: 'row',
        padding: 10,
        paddingHorizontal: 18,
        borderRadius: 5,
        marginRight: 20,
        backgroundColor: COLORS.secondary,
    },
    icon: {
        marginRight: 10,
    },
    typeDeadlineText: {
        color: COLORS.white,
        letterSpacing: 1,
    },
});
