import {AppState, Text, View, StyleSheet, ScrollView, TouchableOpacity} from "react-native";
import ViewThemed from "../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../style/Global";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {JSX, useEffect, useRef, useState} from "react";
import {TDeadlineTuition} from "../../../../lib/type/TDeadlineTuition";
import {COLORS, TUITION_TYPE} from "../../../../constants";
import Loading from "../../../../components/ui/Loading";
import DeadlineTypeItem from "../../../../components/ui/tuition/DeadlineTypeItem";
import {checkAppState, checkIsNumber} from "../../../../utils/utilities";
import TuitionService from "../../../../service/TuitionService";
import ItemDeadline from "../../../../components/ui/tuition/ItemDeadline";

const TuitionDeadline = () => {
    const {t} = useTranslation();
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(true);
    const [tuitionAmount, setTuitionAmount] = useState('0');
    const [canteenAmount, setCanteenAmount] = useState('0');
    const [transportAmount, setTransportAmount] = useState('0');
    const [deadlineList, setDeadlineList] = useState<TDeadlineTuition[]>([]);
    const [globalResult, setGlobalResult] = useState<any>([]);
    const [deadlineTitle, setDeadlineTile] = useState('');
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);

    const handleDeadlineTypeChange = (tuitionType: string) => {
        setLoading(true);
        if (tuitionType === TUITION_TYPE.TUITION) {
            setDeadlineList(globalResult?.deadlineTuition?.tuitionList);
            setDeadlineTile(
                `${t('tuition.deadlineTitle')}${t('tuition.tuition')} : ${tuitionAmount}`,
            );
        } else if (tuitionType === TUITION_TYPE.CANTEEN) {
            setDeadlineList(globalResult?.deadlineCanteen?.canteenList);
            setDeadlineTile(
                `${t('tuition.deadlineTitle')}${t(
                    'tuition.canteen',
                )} : ${canteenAmount}`,
            );
        } else if (tuitionType === TUITION_TYPE.TRANSPORT) {
            setDeadlineList(globalResult?.deadlineTransport?.transportList);
            setDeadlineTile(
                `${t('tuition.deadlineTitle')}${t(
                    'tuition.transport',
                )} : ${transportAmount}`,
            );
        }
        setLoading(false);
    };

    useEffect(() => {
        setLoading(false)
        const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                // GET TUITION DEADLINE
                const deadlineReq = await TuitionService.getTuitionDeadline(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.idpromo_fk,
                );
                setGlobalResult(deadlineReq);
                const tuitionAmountRes = checkIsNumber(
                    deadlineReq?.deadlineTuition.tuitionAmount,
                );
                setTuitionAmount(tuitionAmountRes);
                setDeadlineList(deadlineReq?.deadlineTuition.tuitionList);
                setDeadlineTile(
                    `${t('tuition.deadlineTitle')}${t('tuition.tuition')} : ${tuitionAmountRes}`,
                );

                const canteenAmountRes = checkIsNumber(
                    deadlineReq?.deadlineCanteen.canteenAmount,
                );
                setCanteenAmount(canteenAmountRes);

                const transportAmountRes = checkIsNumber(
                    deadlineReq?.deadlineTransport.transportAmount,
                );
                setTransportAmount(transportAmountRes);
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
    }, [selectedStudent, t, universe_db, count]);

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={styles.deadlineHeader}>
                <ScrollView horizontal={true} style={styles.deadlineList}>
                    {tuitionAmount !== '0' && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleDeadlineTypeChange(TUITION_TYPE.TUITION)}>
                            <DeadlineTypeItem name={t('tuition.tuition')} icon="payments" />
                        </TouchableOpacity>
                    ) as JSX.Element}

                    {canteenAmount !== '0' && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleDeadlineTypeChange(TUITION_TYPE.CANTEEN)}>
                            <DeadlineTypeItem name={t('tuition.canteen')} icon="set-meal" />
                        </TouchableOpacity>
                    )}
                    {transportAmount !== '0' && (
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => handleDeadlineTypeChange(TUITION_TYPE.TRANSPORT)}>
                            <DeadlineTypeItem
                                name={t('tuition.transport')}
                                icon="bus-school"
                                iconType="mci"
                            />
                        </TouchableOpacity>
                    )}
                </ScrollView>
            </View>
            <View style={styles.deadlineContent}>
                <View style={styles.typeSelectedContainer}>
                    <Text style={styles.typeSelectedTitle}>
                        {deadlineTitle} {t('tuition.currency')}
                    </Text>
                </View>

                <ScrollView style={{flex: 1}}>
                    <View style={styles.deadlineTypeSelectList}>
                        {(deadlineList.length === 0 || false) && (
                            <View>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        color: COLORS.gray,
                                    } as StyleSheet}>
                                    {t('tuition.empty_deadline')}
                                </Text>
                            </View>
                        )}
                        {deadlineList.length > 0 &&
                            deadlineList.map((deadline, index) => (
                                <ItemDeadline key={index} data={deadline} index={index} />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default TuitionDeadline;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    deadlineHeader: {
        paddingHorizontal: 15,
        paddingTop: 10,
    },
    deadlineList: {
        paddingTop: 20,
        paddingBottom: 30,
    },
    deadlineContent: {
        flex: 1,
    },
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
    typeSelectedContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: COLORS.blueMedium,
    },
    typeSelectedTitle: {
        fontSize: 15,
        fontWeight: '500',
        textAlign: 'center',
        color: COLORS.gray,
    },
    deadlineTypeSelectList: {
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
        paddingTop: 25,
    },
});