import {StyleSheet, TouchableOpacity, View, Text} from 'react-native';
import {COLORS, IMAGES} from "../../constants";
import {Image} from 'expo-image';
import {useSelector} from "react-redux";
import {BASEURL_IMG_STUDENT} from "../../api/appUrl";

type TDrawerHeaderItemProps = {
    key?: number | string;
    data: any,
    onStudentChange: (data: any) => void,
}
const DrawerHeaderItem = ({data, onStudentChange}: TDrawerHeaderItemProps) => {
    const {user} = useSelector((state: any) => state.user);
    const BASEURL = user?.urlplateforme;

    return (
        <TouchableOpacity onPress={() => onStudentChange(data)}>
            <View style={styles.itemContainer}>
                <View style={styles.itemAvatarContainer}>
                    <Image
                        source={
                            data.uriphoto !== ''
                                ? {
                                    uri: `${BASEURL}/${BASEURL_IMG_STUDENT}/${data?.schoolYear?.anschool}/${data.uriphoto}`,
                                }
                                : IMAGES.avatar
                        }
                        style={styles.itemAvatar}
                    />
                </View>
                <View style={styles.itemTextContainer}>
                    <Text style={{...styles.itemText, fontWeight: '500'} as StyleSheet}>
                        {data?.nomelev} {data?.prenomelev}
                    </Text>
                    <Text style={styles.itemText}>{data?.classroom?.nomclase}</Text>
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