import {StyleSheet, Text, View} from 'react-native';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';
import React from 'react';
import {COLORS} from "../../../constants";
import {checkIfDecimalNumber} from "../../../utils/utilities";
import {TNoteItemProps} from "../../../lib/type/TNotesProps";

function NoteSubjectItem({data}: TNoteItemProps) {
    const decimalNumber = checkIfDecimalNumber(data?.note);
    let noteCasted = '';
    if (decimalNumber) {
        noteCasted = data.note.toString();
    } else {
        noteCasted = ('0' + data?.note).slice(-2);
    }
    let note = Number.parseFloat(noteCasted).toFixed(2);
    note = note.replace('.', ',');
    const dateUpdate = Number.parseInt(data.dateupdate ?? '0', 10);

    return (
        <View style={styles.container}>
            <View style={{flexDirection: 'row'} as StyleSheet}>
                <View style={{flex: 1, justifyContent: 'center'} as StyleSheet}>
                    {data?.etatnote === 'orange' && (
                        <View style={styles.noteColorOrange} />
                    )}
                    {data?.etatnote === 'green' && (
                        <View style={styles.noteColorGreen} />
                    )}
                    {data?.etatnote === 'red' && (
                        <View style={styles.noteColorRed} />
                    )}
                </View>
                <View style={{flex: 10}}>
                    <Text style={styles.matterTitle}>{data?.titrevalution}</Text>
                    <Text style={styles.date}>
                        {`${format(dateUpdate, 'dd', {locale: fr})} `}
                        {`${format(dateUpdate, 'MMM', {locale: fr})} `}
                        {format(dateUpdate, 'yyyy', {locale: fr})}
                    </Text>
                </View>
                <View style={{flex: 3, justifyContent: 'center'} as StyleSheet}>
                    {data?.etatnote === 'orange' && (
                        <View style={styles.subjectNoteOrange}>
                            <Text style={styles.textNote}>{note}</Text>
                        </View>
                    )}
                    {data?.etatnote === 'green' && (
                        <View style={styles.subjectNoteGreen}>
                            <Text style={styles.textNote}>{note}</Text>
                        </View>
                    )}
                    {data?.etatnote === 'red' && (
                        <View style={styles.subjectNoteRed}>
                            <Text style={styles.textNote}>{note}</Text>
                        </View>
                    )}
                </View>
            </View>
        </View>
    );
}

export default NoteSubjectItem;

const styles = StyleSheet.create({
    container: {
        height: 65,
        //borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 10,
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        borderBottomColor: COLORS.grey,
        borderBottomWidth: 1,
    },
    matterTitle: {
        fontWeight: '500',
        fontSize: 15,
        color: COLORS.black,
    },
    date: {
        fontSize: 13,
        letterSpacing: 1,
        color: COLORS.gray,
        textTransform: 'capitalize',
    },
    textNote: {
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 14,
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
    noteColorGreen: {
        width: 12,
        height: 12,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: COLORS.secondary,
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
