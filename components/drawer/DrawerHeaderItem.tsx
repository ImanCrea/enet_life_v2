import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS, IMAGES} from "../../constants";
import {Image} from 'expo-image';

const DrawerHeaderItem = ({data, onStudentChange}) => {
    return (
        <TouchableOpacity onPress={() => onStudentChange(data)}>
            <View style={styles.itemContainer}>
                <View style={styles.itemAvatarContainer}>
                    <Image
                        source={IMAGES.avatar}
                        style={styles.itemAvatar}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={{...styles.itemText, fontWeight: '500'} as StyleSheet}>
                        Nom et prenom
                    </Text>
                    <Text style={styles.itemText}>Nom de la classe</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default DrawerHeaderItem;

const styles = StyleSheet.create({
    itemContainer: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
    },
    itemAvatarContainer: {
        flex: 1,
    },
    itemAvatar: {
        width: 35,
        height: 35,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
    },
    itemTextContainer: {
        flex: 4,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    itemText: {
        color: COLORS.gray,
    },
});