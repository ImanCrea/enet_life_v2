import {View, Text, StyleSheet, TouchableOpacity, useColorScheme} from "react-native";
import {DrawerContentScrollView, DrawerItem, DrawerItemList} from "@react-navigation/drawer";
import {COLORS, IMAGES} from "../../constants";
import {Image} from "expo-image";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import DrawerHeaderItem from "./DrawerHeaderItem";
import {useTranslation} from "react-i18next";
import {globalStyles} from "../../style/Global";
import {JSX, useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {changeChild, initializeChildValue} from "../../redux/features/student/studentSlice";
import {DrawerActions} from "@react-navigation/native";
import {logoutUser, setOnBoardingStatus} from "../../redux/features/userSlice";
import {BASEURL_IMG_STUDENT} from "../../api/appUrl";

const DrawerHeaderContent = (props) => {
    const colorScheme = useColorScheme();
    const theme = COLORS[colorScheme] ?? COLORS.light;
    const {t} = useTranslation();
    //const navigation = useNavigation();
    const {navigation} = props;

    const [studentsList, setStudentsList] = useState(false);
    const dispatch = useDispatch();
    const {students, selectedStudent} = useSelector(
        (state: any) => state.student,
    );
    const [studentsData, setStudentsData] = useState<any>([]);
    const {user} = useSelector((state: any) => state.user);
    const BASEURL = user?.urlplateforme;

    const handleIconChange = () => {
        setStudentsList(!studentsList);
    };

    const handleStudentChange = (studentSelected: any) => {
        dispatch(changeChild(studentSelected));
        navigation.dispatch(DrawerActions.closeDrawer());
    };

    const onLogout = () => {
        navigation.dispatch(DrawerActions.closeDrawer());
        dispatch(initializeChildValue());
        dispatch(logoutUser());
        dispatch(setOnBoardingStatus());
    };

    useEffect(() => {
        const fetchData = () => {
            if (students.length > 0 && selectedStudent !== null) {
                const siblings = students.filter(
                    (child: any) => child?.idelev !== selectedStudent?.idelev,
                );
                setStudentsData(siblings);
            }
        };
        fetchData();
    }, [students, selectedStudent]);

    return (
        <DrawerContentScrollView {...props} style={{flex: 1}}>
            <View style={styles.headerContainer}>
                <View style={styles.avatarContainer}>
                    <View style={styles.avatarContent}>
                        {selectedStudent !== null && (
                            <Image
                                source={
                                    selectedStudent.uriphoto !== ''
                                        ? {
                                            uri: `${BASEURL}/${BASEURL_IMG_STUDENT}/${selectedStudent?.schoolYear?.anschool}/${selectedStudent.uriphoto}`,
                                        }
                                        : IMAGES.avatar
                                }
                                style={styles.avatar}
                            /> as JSX.Element
                        )}
                    </View>
                </View>

                <View style={styles.headerTextContainer}>
                    <Text style={styles.headerText}>
                        {selectedStudent?.nomelev} {selectedStudent?.prenomelev}
                    </Text>
                    <Text style={styles.classroom}>
                        {selectedStudent?.classroom?.nomclase}
                    </Text>
                    <Text style={styles.classroom}>
                        {selectedStudent?.schoolInfo?.nometabl}
                    </Text>
                </View>

                <View style={styles.headerIcon}>
                    {students.length > 1 && (
                        <TouchableOpacity onPress={handleIconChange}>
                            {studentsList ? (
                                <MaterialCommunityIcons
                                    name="chevron-up"
                                    size={28}
                                    style={styles.icon}
                                />
                            ) : (
                                <MaterialCommunityIcons
                                    name="chevron-down"
                                    size={28}
                                    style={styles.icon}
                                />
                            )}
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <View style={styles.childListContainer}>
                {studentsList &&
                    studentsData.length > 0 &&
                    studentsData.map((student: any) => (
                        <DrawerHeaderItem
                            key={student?.idelev}
                            data={student}
                            onStudentChange={handleStudentChange}
                        />
                    ))}
            </View>

            <DrawerItemList {...props} />

            <DrawerItem
                label="Se deconnecter"
                icon={() => (
                    <MaterialIcons name="logout" size={26} color={theme.drawerIconColor} /> as any
                )}
                labelStyle={globalStyles.drawerLinkItem}
                onPress={() => onLogout()}
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
        fontSize: 15,
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