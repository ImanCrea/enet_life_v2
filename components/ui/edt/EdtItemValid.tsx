import {StyleSheet, Text, View} from 'react-native';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import {JSX, useEffect, useState} from 'react';
import {TEdtProps} from "../../../lib/type/TEdt";
import {COLORS} from "../../../constants";

function EdtItemValid({data}: TEdtProps) {
  const dateDebut = Number.parseInt(data?.schedules.debut.toString() ?? '0', 10);
  const dateFin = Number.parseInt(data?.schedules.fin.toString() ?? '0', 10);
  const [contentType, setContentType] = useState(false);

  useEffect(() => {
    if (data.teacher !== '') {
      setContentType(true);
    } else {
      setContentType(false);
    }
  }, [data]);

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
            borderLeftColor: contentType
              ? `${data?.subject?.color}`
              : '#ffffff',
            borderLeftWidth: 5,
          }}>
          {contentType ? (
            <>
              <Text style={styles.edtType}>{data?.subject.subject}</Text>
              <Text style={styles.teacher}>{data?.teacher}</Text>
            </> as JSX.Element
          ) : (
            <View style={{paddingVertical: 9.6}}>
              <Text style={{...styles.teacher}}>{data?.schedules.nomhor}</Text>
            </View>
          )}
        </View>
      </View>
    </>
  );
}

export default EdtItemValid;

const styles = StyleSheet.create({
  timeEvaluationTitle: {
    color: COLORS.gray,
    fontWeight: '400',
    letterSpacing: 1,
  },
  detailsContainer: {
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: COLORS.primaryLight,
  },
  edtType: {
    color: COLORS.gray,
    fontWeight: '700',
  },
  teacher: {
    fontSize: 13,
    color: COLORS.gray,
  },
});
