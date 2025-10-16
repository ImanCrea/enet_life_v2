import React, {useEffect, useRef, useState} from 'react';
import {Text, View, StyleSheet, TouchableOpacity, AppState, ScrollView} from "react-native";
import ViewThemed from "../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../style/Global";
import {COLORS} from "../../../../constants";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTranslation} from "react-i18next";
import {TEdtPeriod} from "../../../../lib/type/TPeriod";
import {useSelector} from "react-redux";
import {TEdt} from "../../../../lib/type/TEdt";
import {checkAppState, formatLongDateFr} from "../../../../utils/utilities";
import Loading from "../../../../components/ui/Loading";
import WeekCalendar from "../../../../components/ui/WeekCalendar";
import EdtItem from "../../../../components/ui/edt/EdtItem";

const Calendar = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState(new Date());
    const [workDaysList, setWorkDaysList] = useState<string[]>([]);
    const [weekEdt, setWeekEdt] = useState<TEdt[]>([]);
    const [dayEdt, setDayEdt] = useState<TEdt[]>([]);
    const [edtPeriods, setEdtPeriods] = useState<TEdtPeriod[]>([]);
    const [edtPeriodSelected, setEdtPeriodSelected] = useState<TEdtPeriod | null>(
        null,
    );
    const [indexSelected, setIndexSelected] = useState(0);
    const [size, setSize] = useState(0);
    const [edtPdf, setEdtPdf] = useState(null);
    const [loading, setLoading] = useState(true);
    //const {selectedStudent} = useSelector((state: any) => state.student);
    //const {user} = useSelector((state: any) => state.user);
    //const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);

    const handleDateChange = (dateSelected: Date) => {
        /*setDate(dateSelected);
        const selectDay = getTime(dateSelected);

        const edtDateSelected = new Date(selectDay).setHours(0, 0, 0, 0);
        const todayEdt: any = EdtService.getDayEdt(
            weekEdt,
            edtDateSelected,
            edtPeriodSelected !== null ? edtPeriodSelected.idedt : 0,
        );
        setDayEdt(todayEdt);*/
    };

    const handleForward = (index: number) => {
        //setLoading(true);
        if (edtPeriods.length > 0) {
            /*if (index + 1 < edtPeriods.length) {
                const indexFound = index + 1;
                //console.log(edtPeriods[indexFound].idedt);
                setIndexSelected(indexFound);
                setEdtPeriodSelected(edtPeriods[indexFound]);

                const edtDateSelected = new Date(date).setHours(0, 0, 0, 0);
                const todayEdt: any = EdtService.getDayEdt(
                    weekEdt,
                    edtDateSelected,
                    edtPeriods[indexFound].idedt,
                );
                setDayEdt(todayEdt);
            } else {
                setIndexSelected(edtPeriods.length);
            }*/
        }
        //setLoading(false);
    };

    const handleBack = (index: number) => {
        if (edtPeriods.length > 0) {
            /*if (index - 1 >= 0) {
                const indexFound = index - 1;
                setEdtPeriodSelected(edtPeriods[indexFound]);
                setIndexSelected(indexFound);
                const edtDateSelected = new Date(date).setHours(0, 0, 0, 0);
                const todayEdt: any = EdtService.getDayEdt(
                    weekEdt,
                    edtDateSelected,
                    edtPeriods[indexFound].idedt,
                );
                setDayEdt(todayEdt);
            } else {
                setIndexSelected(0);
            }*/
        }
    };

    useEffect(() => {
        setLoading(false);
        /*const fecthData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                //GET WORKDAYS
                const workdays: TWorkday[] = await WorkdayService.getWorkdays(
                    universe_db,
                );
                const workdaysRes = convertWorkdaysToString(workdays);
                setWorkDaysList(workdaysRes);

                //GET EDT OF THE WEEK
                const edtWeekReq: any = await EdtService.getAllEdt(
                    universe_db,
                    selectedStudent?.classroom?.idclase,
                );

                const edtWeekRes: TEdt[] = Array.isArray(edtWeekReq?.edt)
                    ? edtWeekReq?.edt
                    : [];
                setWeekEdt(edtWeekRes);

                //EDT PERIODS
                const edtPeriodsRes: TEdtPeriod[] = Array.isArray(edtWeekReq?.period)
                    ? edtWeekReq?.period
                    : [];
                setEdtPeriods(edtPeriodsRes);
                if (edtPeriodsRes.length > 0) {
                    setEdtPeriodSelected(edtPeriodsRes[0]);
                    const edtDateSelected = new Date().setHours(0, 0, 0, 0);
                    const todayEdt: any = EdtService.getDayEdt(
                        edtWeekRes,
                        edtDateSelected,
                        edtPeriodsRes[0].idedt,
                    );
                    setDayEdt(todayEdt);
                    setIndexSelected(0);
                    setSize(edtPeriodsRes.length - 1);
                }

                //EDT PDF
                setEdtPdf(edtWeekReq?.edtPdf);
            }
            setLoading(false);
        };

        fecthData().catch(error => {
            console.log(error);
            setLoading(false);
        });

        const subscription = checkAppState(appState, count, setCount);
        return () => {
            subscription.remove();
        };*/
    }, []); //selectedStudent, universe_db, count

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <View style={styles.edtHeader}>
                    <View style={styles.edtHeaderContent}>
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
                        <View style={styles.edtHeaderTitle}>
                            <Text
                                style={{
                                    ...globalStyles.title,
                                    marginBottom: 0,
                                }}>
                                {t('calendar.period')}
                            </Text>
                            <Text style={styles.dateInTitle}>
                                {formatLongDateFr(edtPeriodSelected?.debut)} -{' '}
                                {formatLongDateFr(edtPeriodSelected?.fin)}
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
                </View>

                <View style={styles.edtContent}>
                    <View style={styles.calendarContainer}>
                        <WeekCalendar
                            date={date}
                            onChange={(newDate: Date) => handleDateChange(newDate)}
                            workDayNameList={workDaysList}
                        />
                    </View>
                    <ScrollView style={{flex: 1}}>
                        <View style={styles.detailsEdtContainer}>
                            {/*{edtPdf !== null && (
                                <View>
                                  <Text style={{textAlign: 'center'}}>
                                    {t('calendar.pdf_edt')}
                                  </Text>
                                </View>
                              )}*/}

                            {edtPdf === null &&
                                dayEdt.length > 0 &&
                                dayEdt.map((edt: TEdt, index: number) => (
                                    <EdtItem key={index} data={edt} />
                                ))}

                            {edtPdf === null && (dayEdt.length === 0 || false) && (
                                <View>
                                    <Text style={{textAlign: 'center'} as StyleSheet}>
                                        {t('calendar.empty_edt')}
                                    </Text>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>

            </View>
        </ViewThemed>
    );
};

export default Calendar;

const styles = StyleSheet.create({
    edtHeader: {
        //flex: 1,
        minHeight: 80,
        paddingBottom: 13,
        //backgroundColor: 'yellow',
    },
    edtHeaderContent: {
        flexDirection: 'row',
        paddingTop: 20,
    },
    previousButton: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    edtHeaderTitle: {
        flex: 4,
    },
    nextButton: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    dateInTitle: {
        textAlign: 'center',
        textTransform: 'capitalize',
    },
    edtContent: {
        flex: 1,
        backgroundColor: COLORS.blueLight,
    },
    calendarContainer: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: COLORS.white,
    },
    detailsEdtContainer: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 15,
    },
});