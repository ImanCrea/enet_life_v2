import {View, Text, StyleSheet, Platform, useColorScheme, Pressable} from "react-native";
import {COLORS, IMAGES} from "../../constants";
import {ImageBackground, Image} from "expo-image";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useNavigation} from "expo-router";
import { DrawerActions } from '@react-navigation/native';
import {useSelector} from "react-redux";
import {JSX} from "react";
import {BASEURL_IMG_STUDENT} from "../../api/appUrl";

const CustomHeader = ({ title }) => {
    const colorScheme = useColorScheme();
    const theme = COLORS[colorScheme] ?? COLORS.light;
    const navigation = useNavigation();
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const BASEURL = user?.urlplateforme;

    const toggleDrawer = () => {
        navigation.dispatch(DrawerActions.toggleDrawer());
    };

    return (
        <View style={
            Platform.OS === 'ios'
                ? [styles.containerIOS, {backgroundColor: theme.background}]
                : [styles.containerAndroid, {backgroundColor: theme.background}]}
        >
            <ImageBackground
                style={[styles.headerContainer, {backgroundColor: theme.headerBackground}]}
                source={IMAGES.headerBackground}>
                <View style={styles.header}>
                    <View style={styles.titleBox}>
                        <View>
                            <Text style={[styles.headerText, {color: theme.headerTitle}]}>{title}</Text>
                        </View>
                    </View>

                    <View style={styles.otherToolsBox}>
                        <View style={{flexDirection: 'row'} as StyleSheet}>
                            <View style={styles.notification}>
                                <Pressable onPress={() => {}}>
                                    <MaterialIcons
                                        name="notifications"
                                        color={theme.notificationIconColor}
                                        size={34}
                                    />
                                </Pressable>
                            </View>

                            <Pressable
                                onPress={() => toggleDrawer()}
                                style={styles.avatarContainer}>
                                <View style={styles.avatarContent}>
                                    {selectedStudent !== null && (
                                        <Image
                                            source={
                                                selectedStudent?.uriphoto !== ''
                                                    ? {
                                                        uri: `${BASEURL}/${BASEURL_IMG_STUDENT}/${selectedStudent?.schoolYear?.anschool}/${selectedStudent?.uriphoto}`,
                                                    }
                                                    : IMAGES.avatar
                                            }
                                            style={styles.avatar}
                                        /> as JSX.Element
                                    )}
                                </View>
                            </Pressable>
                        </View>
                    </View>

                </View>
            </ImageBackground>
        </View>
    );
};

export default CustomHeader;

const styles = StyleSheet.create({
    containerIOS: {
        height: 120,
        overflow: 'hidden',
        marginTop: 0,
        paddingTop: 35,
    },
    containerAndroid: {
        height: 120,
        overflow: 'hidden',
        marginTop: 0,
        paddingTop: 35,
    },
    headerContainer: {
        marginTop: 0,
        height: '100%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayMedium,
    },
    header: {
        flex: 1,
        flexDirection: 'row',
    },
    titleBox: {
        flex: 3,
        justifyContent: 'center',
    },
    headerText: {
        fontWeight: '600',
        fontSize: 20,
        letterSpacing: 1,
        paddingLeft: 20,
        paddingRight: 20,
    },
    otherToolsBox: {
        flex: 2,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    avatarContainer: {
        right: 20,
        paddingTop: 0,
    },
    avatarContent: {
        width: 43,
        height: 43,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.grayLight,
        backgroundColor: COLORS.grayLight,
    },
    avatar: {
        width: 43,
        height: 43,
        overflow: 'hidden',
        borderRadius: 50,
        borderWidth: 1,
        borderColor: COLORS.white,
    },
    notification: {
        justifyContent: 'center',
        right: 35,
    },
});