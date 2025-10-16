import {StyleSheet, Text, View} from 'react-native';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {TEdtProps} from "../../../lib/type/TEdt";
import {COLORS} from "../../../constants";

function EdtItemInvalid({data}: TEdtProps) {
  const dateDebut = Number.parseInt(data?.schedules.debut.toString() ?? '0', 10);
  const dateFin = Number.parseInt(data?.schedules.fin.toString() ?? '0', 10);

  return (
    <>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        } as StyleSheet}>
        <Text
          style={{
            ...styles.timeEvaluationTitle,
            textAlign: 'center',
            color: COLORS.primary,
            fontSize: 13,
          } as StyleSheet}>
          {`${format(dateDebut, 'HH', {locale: fr})}:${format(dateDebut, 'mm', {
            locale: fr,
          })}`}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            color: COLORS.gray,
            fontSize: 13,
          } as StyleSheet}>
          {`${format(dateFin, 'HH', {locale: fr})}:${format(dateFin, 'mm', {
            locale: fr,
          })}`}
        </Text>
      </View>
      <View style={{flex: 4}}>
        <View
          style={{
            ...styles.detailsContainer,
          }}>
          <Text style={styles.edtType}>{data?.schedules.nomhor}</Text>
        </View>
      </View>
    </>
  );
}

export default EdtItemInvalid;

const styles = StyleSheet.create({
  timeEvaluationTitle: {
    color: COLORS.gray,
    fontWeight: '400',
    letterSpacing: 1,
  },
  detailsContainer: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: COLORS.grayMedium,
  },
  edtType: {
    color: COLORS.gray,
    fontWeight: '500',
    textAlign: 'center',
    fontSize: 13,
  },
});
