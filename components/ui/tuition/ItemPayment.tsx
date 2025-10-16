import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {COLORS} from "../../../constants";
import {TPaymentProps} from "../../../lib/type/TPayment";
import {formatNumberFr} from "../../../utils/utilities";

function ItemPayment({data}: TPaymentProps) {
    const {t} = useTranslation();
    const datePayment = Number.parseInt(data?.dateversement ?? '0', 10);
    const transactionMaker =
        data.paiementeffectue !== '...' && data.paiementeffectue !== ''
            ? `par ${data.paiementeffectue}`
            : '';
    return (
        <View style={styles.container}>
            <View style={styles.date}>
                <View style={styles.dateBox}>
                    <Text style={styles.dateText}>{`${format(datePayment, 'dd', {
                        locale: fr,
                    })} `}</Text>
                    <Text style={styles.dateText}>
                        {`${format(datePayment, 'MMM', {locale: fr})} `}
                    </Text>
                </View>
            </View>
            <View style={styles.paymentDetails}>
                <Text style={styles.detailsTitle}>{data.nomversement}</Text>
                <Text style={styles.otherDetails}>
                    {data.codeversement} - {data.typeversement}
                </Text>
                <Text
                    style={
                        styles.otherDetails
                    }>{`Payé ${data.typedevise} ${transactionMaker}`}</Text>
            </View>
            <View style={styles.paymentAmount}>
                <Text style={styles.amountText}>
                    {formatNumberFr(data.montantversement)} {t('tuition.currency')}
                </Text>
            </View>
        </View>
    );
}

export default ItemPayment;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.grayMedium,
        paddingBottom: 20,
        marginBottom: 20,
    },
    date: {
        minWidth: 47,
    },
    dateBox: {
        minWidth: 47,
        padding: 10,
        marginRight: 10,
        borderRadius: 6,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.blueLight,
    },
    dateText: {
        fontSize: 13,
        fontWeight: '600',
        textTransform: 'capitalize',
        color: COLORS.gray,
    },
    paymentDetails: {
        flex: 2,
    },
    paymentAmount: {
        flex: 1,
        marginLeft: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    detailsTitle: {
        color: COLORS.primary,
        fontSize: 15,
        fontWeight: '500',
        marginBottom: 1,
    },
    otherDetails: {
        fontSize: 13,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    amountText: {
        fontSize: 15,
        fontWeight: '500',
        color: COLORS.primary,
        textAlign: 'center',
    },
});
