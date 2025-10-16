import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, AppState, TouchableOpacity, ScrollView} from "react-native";
import {globalStyles} from "../../../../../style/Global";
import ViewThemed from "../../../../../components/ui/ViewThemed";
import {COLORS} from "../../../../../constants";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {TPeriod} from "../../../../../lib/type/TPeriod";
import {TAverage} from "../../../../../lib/type/TAverage";
import Loading from "../../../../../components/ui/Loading";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import AverageService from "../../../../../service/AverageService";
import {checkAppState} from "../../../../../utils/utilities";
import PeriodService from "../../../../../service/PeriodService";

const Average = () => {
    const {t} = useTranslation();
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(true);
    const [periodList, setPeriodList] = useState<TPeriod[]>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<TPeriod | null>(null);
    const [indexSelected, setIndexSelected] = useState(0);
    const [size, setSize] = useState(0);
    const [averageList, setAverageList] = useState<TAverage[]>([]);
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);

    const handleForward = async (index: number) => {
        setLoading(true);
        if (periodList.length > 0) {
            if (index + 1 < periodList.length) {
                const indexFound = index + 1;
                setIndexSelected(indexFound);
                setSelectedPeriod(periodList[indexFound]);
                const averagesReq: TAverage[] = await AverageService.getStudentAverages(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom.idclase,
                    periodList[indexFound].idperiod,
                );
                setAverageList(averagesReq);
            } else {
                setIndexSelected(periodList.length);
            }
        }
        setLoading(false);
    };
    const handleBack = async (index: number) => {
        setLoading(true);
        if (periodList.length > 0) {
            if (index - 1 >= 0) {
                const indexFound = index - 1;
                setSelectedPeriod(periodList[indexFound]);
                const averagesReq: TAverage[] = await AverageService.getStudentAverages(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom.idclase,
                    periodList[indexFound].idperiod,
                );
                setAverageList(averagesReq);
                setIndexSelected(indexFound);
            } else {
                setIndexSelected(0);
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        const fetchData = async () => {
            //GET SCHOOL PERIODS
            const reqResult = await PeriodService.getPeriodsListByDay(universe_db);
            setPeriodList(reqResult.periodList);
            setSelectedPeriod(reqResult.periodSelected);
            setIndexSelected(reqResult.indexSelected);
            setSize(reqResult.indexSelected);

            if (selectedStudent !== null) {
                //GET STUDENT'S AVERAGES
                if (reqResult.periodSelected !== null) {
                    const averagesReq: TAverage[] =
                        await AverageService.getStudentAverages(
                            universe_db,
                            selectedStudent?.idelev,
                            selectedStudent?.classroom.idclase,
                            reqResult.periodSelected.idperiod,
                        );
                    setAverageList(averagesReq);
                }
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
                <View>
                    <View style={styles.averageHeader}>
                        <View style={styles.previousButton}>
                            <TouchableOpacity
                                style={{padding: 10, paddingTop: 5, paddingRight: 0}}
                                onPress={() => handleBack(indexSelected)}
                                disabled={indexSelected === 0}>
                                <MaterialIcons
                                    name="arrow-back-ios"
                                    size={16}
                                    color={indexSelected === 0 ? COLORS.grayLight : COLORS.gray}
                                />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.averageHeaderTitle}>
                            <Text
                                style={{
                                    ...globalStyles.title,
                                }}>
                                {selectedPeriod?.nomperiod}
                            </Text>
                        </View>
                        <View style={styles.nextButton}>
                            <TouchableOpacity
                                style={{padding: 10, paddingTop: 5, paddingRight: 8}}
                                onPress={() => handleForward(indexSelected)}
                                disabled={size === indexSelected}>
                                <MaterialIcons
                                    name="arrow-forward-ios"
                                    size={16}
                                    color={
                                        size === indexSelected ? COLORS.grayLight : COLORS.gray
                                    }
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.headerSeparator} />
                </View>
                <View style={styles.averageContent}>
                    <ScrollView style={{flex: 1}}>
                        <View style={{flex: 1, paddingHorizontal: 15}}>
                            {(averageList.length === 0 || false) && (
                                <View>
                                    <Text
                                        style={{
                                            flex: 1,
                                            textAlign: 'center',
                                            color: COLORS.gray,
                                        } as StyleSheet}>
                                        {t('more.empty_average')}
                                    </Text>
                                </View>
                            )}
                            {averageList.length > 0 &&
                                averageList.map((average: TAverage) => (
                                    <AverageItem data={average} key={average.idmat} />
                                ))}
                        </View>
                    </ScrollView>
                </View>

            </View>
        </ViewThemed>
    );
};

export default Average;

const styles = StyleSheet.create({
    averageHeader: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    previousButton: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    averageHeaderTitle: {
        flex: 4,
    },
    nextButton: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    headerSeparator: {
        marginTop: 20,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayVeryLight,
    },
    averageContent: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: COLORS.white,
    },
});