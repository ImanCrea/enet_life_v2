import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {COLORS, IMAGES} from "../../constants";
import {Image} from "expo-image";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DrawerHeaderItem from "./DrawerHeaderItem";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../../style/Global";

const DrawerHeaderContent = (props) => {
    const colorScheme = useColorScheme();
    const theme = COLORS[colorScheme] ?? COLORS.light;
    const {t} = useTranslation();

    return (
        <DrawerContentScrollView {...props} style={{flex: 1}}>
            <View style={styles.headerContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarContent}>
                        <Image
                            source={IMAGES.avatar}
                            style={styles.avatar}
                        />
                    </View>
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        Nom Prenom
                    </Text>
                    <Text style={styles.classroom}>
                        Nom de la classe
                    </Text>
                    <Text style={styles.classroom}>
                        Etablissement
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    <TouchableOpacity onPress={() => {}}>
                        <MaterialCommunityIcons
                            name="chevron-up"
                            size={28}
                            style={styles.icon}
                        />
                    </TouchableOpacity>
                </View>

            </View>

            <View style={styles.childListContainer}>
                <DrawerHeaderItem
                    data={{}}
                    onStudentChange={() => {}}
                />
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                label="Se deconnecter"
                icon={() => (
                    <MaterialIcons name="logout" size={26} color={theme.drawerIconColor} /> as any
                )}
                labelStyle={globalStyles.drawerLinkItem}
                onPress={() => {}}
            />

        </DrawerContentScrollView>
    );
};

export default DrawerHeaderContent;

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        marginTop: 20,
        paddingLeft: 18,
        paddingRight: 20,
    },
    avatarContainer: {
        flex: 2,
    },
    avatarContent: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        backgroundColor: COLORS.grayLight,
    },
    avatar: {
        width: 50,
        height: 50,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
    },
    headerTextContainer: {
        flex: 5,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 16,
        fontWeight: '700',
        color: COLORS.gray,
    },
    classroom: {
        color: COLORS.gray,
    },
    headerIcon: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    icon: {
        color: COLORS.gray,
    },
    childListContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        marginBottom: 20,
        //borderBottomWidth:1,
        //borderBottomColor: COLORS.grayLight,
    },
});