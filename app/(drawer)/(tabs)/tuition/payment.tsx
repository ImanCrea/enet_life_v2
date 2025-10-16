import React, {useEffect, useRef, useState} from 'react';
import {View, Text, ScrollView, StyleSheet, AppState} from "react-native";
import ViewThemed from "../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../style/Global";
import {COLORS, IMAGES} from "../../../../constants";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {Image} from 'expo-image';
import OtherFeesItem from "../../../../components/ui/tuition/OtherFeesItem";
import {TPayment} from "../../../../lib/type/TPayment";
import ItemPayment from "../../../../components/ui/tuition/ItemPayment";
import {checkAppState, checkIsNumber} from "../../../../utils/utilities";
import Loading from "../../../../components/ui/Loading";
import TuitionService from "../../../../service/TuitionService";

const TuitionPayment = () => {
    const {t} = useTranslation();
    const [loading, setLoading] = useState(true);
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const [soldeScolarite, setSoldeScolarite] = useState('0');
    const [amountTuition, setAmountTuition] = useState('0');
    const [totalPayment, setTotalPayment] = useState('0');
    const [reduction, setReduction] = useState('0');
    const [paymentsList, setPaymentsList] = useState<TPayment[]>([]);
    const [otherTuitionFeesList, setOtherTuitionFeesList] = useState<null | []>(
        [],
    );
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                //GET TUITION INFORMATION'S
                const tutionInfo = await TuitionService.getTuition(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.idpromo_fk,
                );
                const tuitionBalance = checkIsNumber(tutionInfo?.tuitionBalance);
                setSoldeScolarite(tuitionBalance);
                const tuitionAmount = checkIsNumber(tutionInfo?.tuitionAmount);
                setAmountTuition(tuitionAmount);
                const tuitionTotalPayment = checkIsNumber(tutionInfo?.paymentsAmount);
                setTotalPayment(tuitionTotalPayment);
                const tuitionReduction = checkIsNumber(tutionInfo?.reductionsAmount);
                setReduction(tuitionReduction);

                const paymentsResult: TPayment[] = Array.isArray(
                    tutionInfo?.paymentsList,
                )
                    ? tutionInfo?.paymentsList
                    : [];
                setPaymentsList(paymentsResult);

                const otherTuition = Array.isArray(tutionInfo?.otherTuitionFees)
                    ? tutionInfo?.otherTuitionFees
                    : null;
                setOtherTuitionFeesList(otherTuition);
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
                <ScrollView style={{flex: 1}}>
                    <View style={styles.tuitionTitle}>
                        <Text style={styles.tuitionTitleText}>{t('tuition.tabs_label')}</Text>
                    </View>
                    <View style={styles.tuitionFeesContainer}>
                        <View style={styles.tuitionContainer}>
                            <View style={styles.balanceContent}>
                                <View style={{flex: 1, alignItems: 'center'} as StyleSheet}>
                                    <Image
                                        source={IMAGES.schoolingBalance}
                                        style={styles.tuitionBalanceImage}
                                    />
                                    <Text style={styles.balanceTitle}>
                                        {t('tuition.balanceText')}
                                    </Text>
                                    <Text style={styles.balanceAmount}>
                                        {soldeScolarite} {t('tuition.currency')}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.feesContainer}>
                            <View style={styles.tuitionTotal}>
                                <Text style={styles.accountTitle}>
                                    {t('tuition.tuitionAmount')}
                                </Text>
                                <Text style={styles.accountBalance}>
                                    {amountTuition} {t('tuition.currency')}
                                </Text>
                            </View>
                            <View style={styles.tuitionPaid}>
                                <Text style={styles.accountTitle}>
                                    {t('tuition.totalPayment')}
                                </Text>
                                <Text style={styles.accountBalance}>
                                    {totalPayment} {t('tuition.currency')}
                                </Text>
                            </View>
                            <View style={styles.tuitionReduction}>
                                <Text style={styles.accountTitle}>
                                    {t('tuition.totalReduction')}
                                </Text>
                                <Text style={styles.accountBalance}>
                                    {reduction} {t('tuition.currency')}
                                </Text>
                            </View>
                        </View>
                    </View>

                    <View style={styles.otherFeesContainer}>
                        {otherTuitionFeesList !== null &&
                            otherTuitionFeesList.length > 0 &&
                            otherTuitionFeesList.map((otherTuition, index) => (
                                <OtherFeesItem key={index} data={otherTuition} />
                            ))}
                    </View>

                    <View style={styles.historyPaymentContainer}>
                        <View style={styles.historyHeader}>
                            <Text
                                style={{
                                    ...globalStyles.title,
                                    marginBottom: 15,
                                    paddingHorizontal: 10,
                                }}>
                                {t('tuition.payment_history')}
                            </Text>
                        </View>
                        <View style={styles.historyContent}>
                            {(paymentsList.length === 0 || false) && (
                                <View>
                                    <Text
                                        style={{flex: 1, textAlign: 'center', color: COLORS.gray}}>
                                        {t('tuition.empty_payment')}
                                    </Text>
                                </View>
                            )}
                            {paymentsList.length > 0 &&
                                paymentsList.map(paymentData => (
                                    <ItemPayment key={paymentData.idversement} data={paymentData} />
                                ))}
                        </View>
                    </View>

                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default TuitionPayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    tuitionTitle: {
        paddingTop: 15,
        paddingHorizontal: 15,
        paddingBottom: 10,
        backgroundColor: COLORS.blueLight,
    },
    tuitionTitleText: {
        color: COLORS.gray,
        fontWeight: '500',
        paddingLeft: 5,
    },
    tuitionFeesContainer: {
        minHeight: 240,
        flexDirection: 'row',
        paddingHorizontal: 15,
        paddingBottom: 30,
        backgroundColor: COLORS.blueLight,
    },
    tuitionContainer: {
        flex: 1,
        paddingRight: 8,
    },
    balanceContent: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: COLORS.grayMedium,
        backgroundColor: COLORS.greyLight,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 7,
        paddingBottom: 15,
    },
    tuitionBalanceImage: {
        width: 82,
        height: 82,
        aspectRatio: 90 / 76,
    },
    feesContainer: {
        flex: 1,
        paddingLeft: 8,
    },
    balanceTitle: {
        color: COLORS.gray,
        fontSize: 15,
        fontWeight: '500',
        marginTop: 7,
        marginBottom: 5,
    },
    balanceAmount: {
        color: COLORS.red,
        fontWeight: '700',
        fontSize: 20,
        textAlign: 'center',
    },
    tuitionTotal: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        backgroundColor: COLORS.blackLight,
    },
    tuitionPaid: {
        flex: 1,
        marginBottom: 10,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        backgroundColor: COLORS.secondary,
    },
    tuitionReduction: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 5,
        padding: 5,
        backgroundColor: COLORS.yellowDark,
    },
    accountBalance: {
        fontSize: 14,
        color: COLORS.white,
    },
    accountTitle: {
        fontSize: 13,
        fontWeight: 'normal',
        color: COLORS.white,
    },
    historyPaymentContainer: {
        flex: 1,
    },
    historyHeader: {
        padding: 10,
        marginTop: 0,
    },
    historyContent: {
        flex: 1,
        paddingBottom: 20,
        paddingLeft: 15,
        paddingRight: 15,
    },
    otherFeesContainer: {
        padding: 15,
    },
});
