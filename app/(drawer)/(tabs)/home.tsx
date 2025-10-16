import {View, Text, ScrollView, StyleSheet, AppState} from "react-native";
import ViewThemed from "../../../components/ui/ViewThemed";
import {globalStyles} from "../../../style/Global";
import {COLORS, IMAGES} from "../../../constants";
import {ImageBackground, Image} from "expo-image";
import {useTranslation} from "react-i18next";
import React, {useEffect, useRef, useState} from "react";
import Card from "../../../components/ui/Card";
import NoteItem from "../../../components/ui/note/NoteItem";
import FlatButton from "../../../components/ui/FlatButton";
import Spacer from "../../../components/ui/Spacer";
import NoteService from "../../../service/NoteService";
import {getTime} from "date-fns";
import WeekCalendar from "../../../components/ui/WeekCalendar";
import NextEvaluationItem from "../../../components/ui/home/NextEvaluationItem";
import RecentPaymentItem from "../../../components/ui/home/RecentPaymentItem";
import {TAbsence} from "../../../lib/type/TAbsence";
import AbsenceLateItem from "../../../components/ui/home/AbsenceLateItem";
import {useSelector} from "react-redux";
import {TNote} from "../../../lib/type/TNotesProps";
import {TWorkday} from "../../../lib/type/TWorkday";
import WorkdayService from "../../../service/WorkdayService";
import {checkAppState, checkIsNumber, convertWorkdaysToString} from "../../../utils/utilities";
import TuitionService from "../../../service/TuitionService";
import AbsenceService from "../../../service/AbsenceService";
import Loading from "../../../components/ui/Loading";
import {useRouter} from "expo-router";

const Home = () => {
    const {t} = useTranslation();
    const [date, setDate] = useState(new Date());
    const [nextEvaluationList, setNextEvaluationList] = useState<any>([]);
    const [todayEvaluationList, setTodayEvaluationList] = useState<any>([]);
    const [workDaysNameList, setWorkDaysNameList] = useState<string[]>([]);
    const [soldeScolarite, setSoldeScolarite] = useState<string>('0');
    const [loading, setLoading] = useState(true);
    const [paymentList, setPaymentList] = useState<any>([]);
    const [absenceList, setAbsenceList] = useState<TAbsence[]>([]);
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const [notesList, setNotesList] = useState<TNote[]>([]);
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);
    const router = useRouter();

    const handleDateChange = (dateSelected: Date) => {
        setDate(dateSelected);
        const selectDay = getTime(dateSelected);

        const evalDateSelected = new Date(selectDay).setHours(0, 0, 0, 0);
        const response = NoteService.getDayEvaluations(
            nextEvaluationList,
            evalDateSelected,
        );
        setTodayEvaluationList(response);
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            //GET WORKDAYS
            const workdays: TWorkday[] = await WorkdayService.getWorkdays(
                universe_db,
            );
            const workdaysRes = convertWorkdaysToString(workdays);
            setWorkDaysNameList(workdaysRes);

            //GET ALL NOTE OF A STUDENT
            if (selectedStudent !== null) {
                const studentNotesReq: any = await NoteService.getStudentNotes(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom?.idclase,
                    3,
                );
                const studentNotes: TNote[] = Array.isArray(studentNotesReq)
                    ? studentNotesReq
                    : [];
                setNotesList(studentNotes);

                //GET ALL NEXT EVALUATIONS
                const dayEvaluationList: any = await NoteService.getStudentEvaluations(
                    selectedStudent?.classroom?.idclase,
                );
                setNextEvaluationList(dayEvaluationList);
                const evalDateSelected = new Date().setHours(0, 0, 0, 0);
                const todayEvaluations: any = NoteService.getDayEvaluations(
                    dayEvaluationList,
                    evalDateSelected,
                );
                setTodayEvaluationList(todayEvaluations);

                //GET TUITION ACCOUNT
                const tuitionBalance = await TuitionService.getTuitionBalance(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.idpromo_fk,
                );
                const checkTBalance = checkIsNumber(tuitionBalance);
                setSoldeScolarite(checkTBalance);

                //GET STUDENT ABSENCES
                const absences: any = await AbsenceService.getStudentAbsences(
                    universe_db,
                    selectedStudent?.idelev,
                    4,
                );
                setAbsenceList(absences);
                setLoading(false);
            }
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
                <ScrollView style={{flex: 1}}>
                    <View style={styles.evaluation}>
                        <ImageBackground source={IMAGES.backLastEvaluation} style={styles.evalBackground as StyleSheet}>
                            <View style={styles.noteContainer}>
                                <Text style={globalStyles.title}>{t('home.evaluation')}</Text>
                                <Spacer height={15} />
                                <View>
                                    {(notesList.length === 0 || false) && (
                                        <View>
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    textAlign: 'center',
                                                    color: COLORS.gray,
                                                } as StyleSheet}>
                                                {t('home.empty_note')}
                                            </Text>
                                        </View>
                                    ) as React.JSX.Element}

                                    {notesList.length > 0 && (
                                        <Card style={{borderRadius: 5, elevation: 2, padding: 15}}>
                                            {notesList.length > 0 &&
                                                notesList.map((note: any) => (
                                                    <NoteItem key={note.idnote} data={note} />
                                                ))}
                                            <View style={{flexDirection: 'row'} as StyleSheet}>
                                                <View style={{flex: 1}}>
                                                    <FlatButton
                                                        title={t('home.more_note')}
                                                        style={{
                                                            paddingVertical: 14,
                                                            backgroundColor: COLORS.primary,
                                                            marginTop: 10,
                                                        }}
                                                        titleStyle={{
                                                            fontSize: 14,
                                                        }}
                                                        onPress={() => router.push('eval/note')}
                                                    />
                                                </View>
                                            </View>
                                        </Card>
                                    )}
                                </View>
                            </View>
                        </ImageBackground>

                        <View style={styles.nextEvaluation}>
                            <Spacer height={25} />
                            <Text style={globalStyles.title}>{t('home.nextEvaluation')}</Text>
                            <Spacer height={15} />

                            <View style={styles.calendarContainer}>
                                <WeekCalendar
                                    date={date}
                                    onChange={(newDate: Date) => handleDateChange(newDate)}
                                    workDayNameList={workDaysNameList}
                                />
                            </View>

                            <Spacer height={10} />
                            <View style={styles.calendarDetails}>
                                {(todayEvaluationList.length === 0 || false) && (
                                    <View>
                                        <Text
                                            style={{flex: 1, textAlign: 'center', color: COLORS.gray} as StyleSheet}>
                                            {t('home.empty_evaluation')}
                                        </Text>
                                    </View>
                                )}

                                {todayEvaluationList.length > 0 && (
                                    <>
                                        <View style={styles.detailsTitle}>
                                            <View style={{flex: 1}}>
                                                <Text
                                                    style={[globalStyles.paragraph, {textAlign: 'center'} as StyleSheet]}>
                                                    {t('home.evaluation_time')}
                                                </Text>
                                            </View>
                                            <View style={{flex: 4}}>
                                                <Text style={globalStyles.paragraph}>
                                                    {t('home.evaluation_title')}
                                                </Text>
                                            </View>
                                        </View>

                                        {todayEvaluationList.map((evaluation: any) => (
                                            <NextEvaluationItem
                                                key={evaluation.ideval}
                                                data={evaluation}
                                            />
                                        ))}
                                    </>
                                )}
                            </View>
                        </View>

                        <View style={styles.schooling}>
                            <Spacer height={25} />
                            <Text
                                style={[globalStyles.title, {paddingHorizontal: 15,}]}>
                                {t('schooling.menu_label')}
                            </Text>
                            <Spacer height={15} />

                            <View style={styles.schoolingBalance}>
                                <View style={styles.balanceContent}>
                                    <View style={{flex: 2, alignItems: 'center'} as StyleSheet}>
                                        <Text style={styles.balanceTitle}>
                                            {t('home.balance_title')}
                                        </Text>
                                        <Text style={styles.balanceAmount}>
                                            {soldeScolarite} {t('tuition.currency')}
                                        </Text>
                                    </View>
                                    <View style={{flex: 1}}>
                                        <Image
                                            source={IMAGES.schoolingBalance}
                                            style={styles.schoolingBalanceImage}
                                        />
                                    </View>
                                </View>
                            </View>
                            <Spacer height={20} />

                            {paymentList.length > 0 && (
                                <View style={styles.recentPaymentContainer}>
                                    <Text style={[globalStyles.titleH4, { paddingLeft: 3 }]}>
                                        {t('home.recent_payment')}
                                    </Text>
                                    <View style={styles.recentPaymentHr} />
                                    {paymentList.map((payment: any) => (
                                        <RecentPaymentItem
                                            key={payment?.idversement}
                                            data={payment}
                                        />
                                    ))}

                                    <>
                                        <FlatButton
                                            title={t('home.more_schooling_payment')}
                                            style={{
                                                paddingVertical: 14,
                                                backgroundColor: COLORS.primary,
                                                marginTop: 10,
                                            }}
                                            titleStyle={{
                                                fontSize: 14,
                                            }}
                                            onPress={() => {}}
                                        />
                                    </>
                                </View>
                            )}
                        </View>
                        <Spacer height={15} />

                        <View style={styles.absenceContainer}>
                            <Text
                                style={[globalStyles.title, {
                                    paddingHorizontal: 15,
                                }]}>
                                {t('home.absence_late')}
                            </Text>
                            <Spacer height={15} />
                            <View style={styles.absenceContent}>
                                <Card style={{borderRadius: 8, padding: 10}}>
                                    <ImageBackground
                                        source={IMAGES.backgroundImageAbsence}
                                       >
                                        {(absenceList.length === 0 || false) && (
                                            <View>
                                                <Text
                                                    style={[{flex: 1, textAlign: 'center', color: COLORS.gray,} as StyleSheet]}>
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
                                                    absence.idtypepresenc === '1'
                                                        ? COLORS.red
                                                        : COLORS.gray;
                                                return (
                                                    <AbsenceLateItem
                                                        key={absence?.idpresenc}
                                                        imageUri={uri}
                                                        color={color}
                                                        data={absence}
                                                    />
                                                );
                                            })}
                                    </ImageBackground>
                                </Card>
                            </View>

                        </View>
                        <Spacer height={15} />

                    </View>
                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default Home;

const styles = StyleSheet.create({
    evaluation: {
        flex: 1,
        paddingTop: 20,
    },
    evalBackground: {
        resizeMode: 'cover',
    },
    noteContainer: {
        paddingHorizontal: 15,
    },
    nextEvaluation: {},
    calendarContainer: {
        paddingHorizontal: 10,
    },
    calendarDetails: {
        padding: 15,
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayVeryLight,
        borderTopColor: COLORS.grayVeryLight,
        backgroundColor: COLORS.blueLight,
    },
    detailsTitle: {
        flex: 1,
        flexDirection: 'row',
    },
    schooling: {
        flex: 1,
    },
    schoolingBalance: {
        paddingHorizontal: 15,
    },
    balanceContent: {
        flex: 1,
        flexDirection: 'row',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 15,
        backgroundColor: COLORS.grayMedium,
    },
    balanceTitle: {
        color: COLORS.gray,
        letterSpacing: 1,
        fontSize: 15,
    },
    balanceAmount: {
        color: COLORS.red,
        fontWeight: '700',
        fontSize: 25,
        letterSpacing: 1,
    },
    schoolingBalanceImage: {
        width: '100%',
        height: 65,
        aspectRatio: 160 / 86,
    },
    recentPaymentContainer: {
        paddingTop: 25,
    },
    recentPaymentHr: {
        marginTop: 10,
    },
    absenceContainer: {
        paddingHorizontal: 15,
    },
    absenceContent: {},
    absenceItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 12,
    },
    absenceDate: {
        fontSize: 13,
        letterSpacing: 1,
    },
    absenceTitle: {
        fontSize: 15,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    iconStyleContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconStyle: {
        width: '100%',
        height: 20,
        aspectRatio: 70 / 46,
    },
});