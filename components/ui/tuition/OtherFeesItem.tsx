import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {COLORS} from "../../../constants";
import {formatNumberFr} from "../../../utils/utilities";

function OtherFeesItem({data, key}: {data: any; key: number}) {
    const {t} = useTranslation();
    return (
        <View style={styles.otherFeesItemContainer}>
            <Text style={styles.tuitionTitleText}>{data?.nomfraiscol}</Text>
            <View style={styles.detailContainer}>
                <View style={styles.detailLineOne}>
                    <View style={styles.otherFeesAmount}>
                        <Text style={styles.otherFeesMainTitle}>
                            {t('tuition.amount')} :
                        </Text>
                        <Text style={styles.otherFeesAmountText}>
                            {formatNumberFr(data?.montantfraiscol)} {t('tuition.currency')}
                        </Text>
                    </View>
                    <View style={styles.otherFeesPaid}>
                        <Text style={styles.otherFeesMainTitle}>
                            {t('tuition.totalPayment')} :
                        </Text>
                        <Text style={styles.otherFeesAmountText}>
                            {formatNumberFr(data?.totalversemfraiscol)} {t('tuition.currency')}
                        </Text>
                    </View>
                </View>
                <View style={styles.otherFeesBalance}>
                    <Text style={{color: COLORS.gray}}>{t('tuition.balanceText')}</Text>
                    <Text style={{...styles.otherFeesAmountText, marginLeft: 10}}>
                        {formatNumberFr(data?.totalrestpayerfraiscol)}{' '}
                        {t('tuition.currency')}
                    </Text>
                </View>
            </View>
        </View>
    );
}

export default OtherFeesItem;

const styles = StyleSheet.create({
    otherFeesItemContainer: {
        marginBottom: 15,
    },
    tuitionTitleText: {
        color: COLORS.gray,
        fontWeight: '500',
        paddingLeft: 5,
        textTransform: 'capitalize',
    },
    detailContainer: {
        flex: 1,
        paddingTop: 10,
    },
    detailLineOne: {
        flexDirection: 'row',
    },
    otherFeesAmount: {
        flex: 1,
        padding: 10,
        marginRight: 7,
        borderRadius: 3,
        backgroundColor: COLORS.blueLight,
    },
    otherFeesPaid: {
        flex: 1,
        paddingH: 5,
        padding: 10,
        borderRadius: 3,
        marginLeft: 7,
        backgroundColor: COLORS.blueLight,
    },
    otherFeesBalance: {
        flexDirection: 'row',
        padding: 10,
        borderRadius: 3,
        marginTop: 10,
        backgroundColor: COLORS.blueLight,
    },
    otherFeesMainTitle: {
        fontWeight: 'normal',
        color: COLORS.gray,
    },
    otherFeesAmountText: {
        color: COLORS.gray,
        fontWeight: '500',
        textAlign: 'right',
    },
});
