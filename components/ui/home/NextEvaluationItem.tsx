import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants';
import {format, getHours} from 'date-fns';
import {fr} from 'date-fns/locale';

type TEvaluation = {
    titre: string;
    debut: string;
    fin: string;
    nomat: string;
};

type TEvaluationItemProps = {
    data: TEvaluation;
    key?: number | string;
};

export default function NextEvaluationItem({data}: TEvaluationItemProps) {
    const dateDebut = Number.parseInt(data.debut, 10);
    const dateFin = Number.parseInt(data.fin, 10);
    const startTime = `${getHours(dateDebut)} ${format(dateDebut, 'mm', {
        locale: fr,
    })}`;
    const endTime = `${getHours(dateFin)} ${format(dateFin, 'mm', {locale: fr})}`;

    return (
        <View style={styles.detailsItem}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'} as StyleSheet}>
                <Text
                    style={[...styles.timeEvaluationTitle, {
                        textAlign: 'center',
                        color: COLORS.primary,
                        fontSize: 13
                    }]}>
                    {`${startTime}`}
                </Text>
                <Text
                    style={{
                        textAlign: 'center',
                        color: COLORS.gray,
                        fontSize: 13,
                    } as StyleSheet}>
                    {`${endTime}`}
                </Text>
            </View>
            <View style={{flex: 4}}>
                <View style={styles.evalDetailsContainer}>
                    <Text style={styles.evaluationType}>
                        {' '}
                        {data.titre} de {data.nomat}
                    </Text>
                    {/*<Text style={styles.evaluationDate}>
                        {`${format(dateDebut, 'dd', {locale: fr})} `}
                        {`${format(dateDebut, 'MMM', {locale: fr})} `}
                        {format(dateDebut, 'yyyy', {locale: fr})}
                      </Text>*/}
                    {/*<Text style={styles.evaluationDate}>M. Koffi Syste</Text>*/}
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    timeEvaluationTitle: {
        color: COLORS.gray,
        fontWeight: '400',
        letterSpacing: 1,
    },
    detailsItem: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 15,
    },
    evalDetailsContainer: {
        borderRadius: 8,
        backgroundColor: COLORS.primaryLight,
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    evaluationType: {
        color: COLORS.gray,
        fontWeight: '700',
    },
    evaluationDate: {
        fontSize: 13,
        color: COLORS.gray,
        textTransform: 'capitalize',
    },
});
