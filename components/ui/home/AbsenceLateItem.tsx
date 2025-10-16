import React from 'react';
import {Image, ImageSourcePropType, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../../../constants';
import {format, getHours} from 'date-fns';
import {fr} from 'date-fns/locale';
import {useTranslation} from 'react-i18next';

type TAbsence = {
    matiereId: string;
    horaireId: string;
    dateAbsence: string;
    horaireNom: string;
    horaireDebut: string;
    horaireFin: string;
    nomat: string;
    typeAbsence: string;
    idtypepresenc: string;
};

type TAbsenceLateProps = {
    data: TAbsence;
    imageUri: ImageSourcePropType;
    color: string;
    key?: number | string;
};

export default function AbsenceLateItem({
                                            data,
                                            imageUri,
                                            color,
                                        }: TAbsenceLateProps) {
    const {t} = useTranslation();
    const dateDebut = Number.parseInt(data.dateAbsence, 10);
    const horaireDebut = Number.parseInt(data.horaireDebut, 10);
    const horaireFin = Number.parseInt(data.horaireFin, 10);
    const startTime = `${getHours(horaireDebut)}:${format(horaireDebut, 'mm', {
        locale: fr,
    })}`;
    const endTime = `${getHours(horaireFin)}:${format(horaireFin, 'mm', {
        locale: fr,
    })}`;

    return (
        <View style={styles.absenceItem}>
            <View style={styles.iconStyleContainer}>
                <Image source={imageUri} style={styles.iconStyle} />
            </View>
            <View style={{flex: 5}}>
                <Text style={styles.absenceTitle}>{data.typeAbsence}</Text>
                <Text style={{color: COLORS.gray}}>
                    {t('more.text_mat_absence')} {data.nomat}
                </Text>
                <Text style={{...styles.absenceDate, color: color}}>
                    le {`${format(dateDebut, 'dd', {locale: fr})} `}
                    {`${format(dateDebut, 'MMM', {locale: fr})} `}
                    {`${format(dateDebut, 'yyyy', {locale: fr})} `}
                    de {startTime} - {endTime}
                </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    absenceItem: {
        //flex: 1,
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
        fontWeight: '500',
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
