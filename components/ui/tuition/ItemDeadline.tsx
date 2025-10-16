import {StyleSheet, Text, View} from 'react-native';
import {useTranslation} from 'react-i18next';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {TDeadlineTuition} from "../../../lib/type/TDeadlineTuition";
import {formatNumberFr, formatNumberOnTwoPad} from "../../../utils/utilities";
import {COLORS} from "../../../constants";

function ItemDeadline({data, index}: {data: TDeadlineTuition; index: number}) {
  const {t} = useTranslation();
  const dateDeadline = Number.parseInt(data?.datelimite.toString() ?? '0', 10);
  return (
    <View style={styles.container}>
      <View style={styles.date}>
        <View style={styles.dateBox}>
          <Text style={styles.dateText}>{formatNumberOnTwoPad(index + 1)}</Text>
        </View>
      </View>
      <View style={styles.paymentDetails}>
        <Text style={styles.detailsTitle}>Rappel</Text>
        <Text style={styles.otherDetails}>
          le {`${format(dateDeadline, 'dd', {locale: fr})} `}
          {`${format(dateDeadline, 'MMM', {locale: fr})} `}
          {`${format(dateDeadline, 'yyyy', {locale: fr})} `}
        </Text>
      </View>
      <View style={styles.paymentAmount}>
        <Text style={styles.amountText}>
          {' '}
          {formatNumberFr(data.montantpaie ?? 0)} {t('tuition.currency')}
        </Text>
      </View>
    </View>
  );
}

export default ItemDeadline;

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
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.greyMedium,
  },
  dateText: {
    fontSize: 13,
    fontWeight: '600',
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
    color: COLORS.gray,
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
    color: COLORS.gray,
    textAlign: 'center',
  },
});
