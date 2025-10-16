import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, AppState, ScrollView} from "react-native";
import ViewThemed from "../../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../../style/Global";
import {COLORS, IMAGES} from "../../../../../constants";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {TAbsence} from "../../../../../lib/type/TAbsence";
import Loading from "../../../../../components/ui/Loading";
import {ImageBackground} from "expo-image";
import AbsenceLateItem from "../../../../../components/ui/more/absence/AbsenceLateItem";
import {checkAppState} from "../../../../../utils/utilities";
import AbsenceService from "../../../../../service/AbsenceService";

const Absence = () => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const [absenceList, setAbsenceList] = useState<TAbsence[]>([]);
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                //GET STUDENT ABSENCES
                const absences: any = await AbsenceService.getStudentAbsences(
                    universe_db,
                    selectedStudent?.idelev,
                );
                setAbsenceList(absences);
            }
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });

        const subscription = checkAppState(appState, count, setCount);
        return () => {
            subscription.remove();
        };
    }, [selectedStudent, universe_db, count]);

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <ScrollView style={styles.container}>
                    <ImageBackground
                        source={IMAGES.backgroundImageAbsence}
                        //resizeMode={'cover'}
                    >
                        <View style={styles.content}>
                            {(absenceList.length === 0 || false) && (
                                <View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            color: COLORS.gray,
                                        } as StyleSheet}>
                                        {t('home.empty_absence')}
                                    </Text>
                                </View>
                            )}

                            {absenceList.length > 0 &&
                                absenceList.map((absence: any) => {
                                    const uri =
                                        absence.idtypepresenc === '1'
                                            ? IMAGES.absenceIcon
                                            : IMAGES.lateIcon;
                                    const color =
                                        absence.idtypepresenc === '1' ? COLORS.red : COLORS.gray;
                                    return (
                                        <AbsenceLateItem
                                            key={absence?.idpresenc}
                                            imageUri={uri}
                                            color={color}
                                            data={absence}
                                        />
                                    );
                                })}
                        </View>
                    </ImageBackground>
                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default Absence;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    content: {
        flex: 1,
        minHeight: 300,
        paddingVertical: 20,
        paddingLeft: 12,
        paddingRight: 1,
    },
});