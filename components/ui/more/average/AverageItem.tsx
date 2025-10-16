import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import AverageModal from './AverageModal';
import {useSelector} from 'react-redux';
import {globalStyles} from "../../../../style/Global";
import {COLORS} from "../../../../constants";
import {TAverageProps, TRank} from "../../../../lib/type/TAverage";
import {checkIfDecimalNumber} from "../../../../utils/utilities";

function AverageItem({data}: TAverageProps) {
    const {t} = useTranslation();
    const decimalNumber = checkIfDecimalNumber(data?.moyenfinal);
    let averageCasted = '';
    if (decimalNumber) {
        averageCasted = data?.moyenfinal.toString() ?? '0';
    } else {
        averageCasted = ('0' + data?.moyenfinal).slice(-2);
    }
    let average = Number.parseFloat(averageCasted).toFixed(2);
    average = average.replace('.', ',');
    const [open, setOpen] = useState(false);
    const [rankData, setRankData] = useState<TRank | null>(null);
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;

    const handleModal = async () => {
        //GET STUDENT RANK
        /*const rankReq: any = await AverageService.getStudentRank(
            universe_db,
            selectedStudent?.idelev,
            selectedStudent?.classroom.idclase,
            data?.idperiod,
            data?.idmat,
        );

        const rankDataRes = {
            ...rankReq,
            nomat: data?.nomat,
        };
        setRankData(rankDataRes);
        setOpen(true);*/
    };

    return (
        <TouchableOpacity activeOpacity={0.5} onPress={() => handleModal()}>
            <View style={styles.container}>
                <View style={{flexDirection: 'row'} as StyleSheet}>
                    <View style={{flex: 4, marginRight: 15}}>
                        <Text style={styles.matterTitle}>{data?.nomat}</Text>
                        <Text style={styles.average_base}>
                            {t('more.average_base')} {data?.moyenbase}
                        </Text>
                    </View>
                    <View style={{flex: 1, justifyContent: 'center'} as StyleSheet}>
                        {data?.etatnote === 'orange' && (
                            <View style={styles.subjectNoteOrange}>
                                <Text style={styles.textNote}>{average}</Text>
                            </View>
                        )}
                        {data?.etatnote === 'green' && (
                            <View style={styles.subjectNoteGreen}>
                                <Text style={styles.textNote}>{average}</Text>
                            </View>
                        )}
                        {data?.etatnote === 'red' && (
                            <View style={styles.subjectNoteRed}>
                                <Text style={styles.textNote}>{average}</Text>
                            </View>
                        )}
                    </View>
                </View>
            </View>
            <View>
                <AverageModal
                    visibility={open}
                    setVisibility={setOpen}
                    data={rankData}
                />
            </View>
        </TouchableOpacity>
    );
}
export default AverageItem;

const styles = StyleSheet.create({
    container: {
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingTop: 5,
        paddingBottom: 15,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
    },
    matterTitle: {
        fontWeight: '500',
        fontSize: 14,
        color: COLORS.gray,
        textTransform: 'uppercase',
    },
    average_base: {
        fontSize: 13,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    textNote: {
        textAlign: 'center',
        fontWeight: '500',
        fontSize: 13,
        color: COLORS.white,
    },
    noteColorOrange: {
        width: 12,
        height: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.orange,
    },
    noteColorRed: {
        width: 12,
        height: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.red,
    },
    noteColorGreen: {
        width: 12,
        height: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.secondary,
    },
    subjectNoteOrange: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.orange,
    },
    subjectNoteRed: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.red,
    },
    subjectNoteGreen: {
        padding: 5,
        borderRadius: 5,
        backgroundColor: COLORS.secondary,
    },
});
