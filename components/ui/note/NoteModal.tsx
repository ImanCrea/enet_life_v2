import React, {useEffect, useState} from 'react';
import {
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {COLORS} from '../../../constants';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import NoteService from '../../../service/NoteService';
import {useSelector} from 'react-redux';
import Loading from '../Loading';
import {SafeAreaView} from "react-native-safe-area-context";

function NoteModal({visibility, setVisibility, data}) {
    const {t} = useTranslation();
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;
    const [subject, setSubject] = useState('');
    const [noteDate, setNoteDate] = useState(0);
    const [note, setNote] = useState(0);
    const [baseNote, setBaseNote] = useState(0);
    const [classAverage, setcClassAverage] = useState(0);
    const [minNote, setMinNote] = useState(0);
    const [maxNote, setMaxNote] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (data !== null) {
                setSubject(data.nomat);
                setNoteDate(Number.parseInt(data.dateupdate, 10));
                const details = await NoteService.getNoteDetails(
                    universe_db,
                    data.idnote,
                    data.idevalclassemat,
                );
                setNote(details.studentNote);
                setBaseNote(details.baseNote);
                setcClassAverage(details.classAverage);
                setMinNote(details.downNote);
                setMaxNote(details.upNote);
            }
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });
        //console.log(data);
    }, [data, universe_db]);

    const handleCloseAlertModal = () => {
        setVisibility(false);
    };
    return (
        <Modal
            visible={visibility}
            animationType="slide"
            transparent={true}
            style={{backgroundColor: COLORS.white}}>
            <SafeAreaView style={styles.container}>
                <View style={styles.containerModal}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>{subject}</Text>
                            <Text style={styles.date}>
                                {t('eval.noteDay_label')}
                                {`${format(noteDate, 'dd', {locale: fr})} `}
                                {`${format(noteDate, 'MMM', {locale: fr})} `}
                                {format(noteDate, 'yyyy', {locale: fr})}
                            </Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => handleCloseAlertModal()}>
                            <MaterialIcons name="close" size={28} color={COLORS.gray} />
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={styles.contentModal}>
                        {loading ? (
                            <View style={{marginTop: '15%'} as StyleSheet}>
                                <Loading size={'small'} />
                            </View>
                        ) : (
                            <>
                                <View style={styles.detailRow}>
                                    <Text style={styles.labelDetailRow}>
                                        {t('eval.note_student')}
                                    </Text>
                                    <Text style={styles.averageDetailRow}>
                                        {note} / {baseNote}
                                    </Text>
                                </View>

                                <View style={styles.detailRow}>
                                    <Text style={styles.labelDetailRow}>
                                        {t('more.average_class')}
                                    </Text>
                                    <Text style={styles.averageDetailRow}>{classAverage}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.labelDetailRow}>
                                        {t('eval.up_note')}
                                    </Text>
                                    <Text style={styles.averageDetailRow}>{maxNote}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.labelDetailRow}>
                                        {t('eval.down_note')}
                                    </Text>
                                    <Text style={styles.averageDetailRow}>{minNote}</Text>
                                </View>
                            </>
                        )}
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export default NoteModal;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.white,
        margin: 5,
        borderColor: COLORS.grayMedium,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 100,
    },
    containerModal: {
        flex: 1,
        paddingTop: 15,
    },
    modalHeader: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
        padding: 15,
    },
    modalTitle: {
        flex: 1,
        alignItems: 'center',
    },
    modalTitleText: {
        fontSize: 18,
        fontWeight: '500',
        letterSpacing: 1,
        color: COLORS.gray,
    },
    contentModal: {
        flex: 1,
        marginTop: 10,
        paddingTop: 20,
        padding: 15,
        borderTopWidth: 1,
        borderTopColor: COLORS.grayLight,
    },
    titleDetail: {
        fontWeight: '700',
        fontSize: 16,
        textAlign: 'center',
        color: COLORS.gray,
        marginBottom: 5,
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 7,
    },
    labelDetailRow: {
        minWidth: '40%',
        color: COLORS.gray,
        textAlign: 'justify',
    },
    averageDetailRow: {
        fontWeight: '500',
        color: COLORS.gray,
    },
    date: {
        fontSize: 13,
        letterSpacing: 1,
        color: COLORS.gray,
        textTransform: 'none',
    },
});
