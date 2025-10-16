import {View, Text, StyleSheet, TouchableOpacity, AppState, ScrollView} from "react-native";
import {globalStyles} from "../../../../style/Global";
import ViewThemed from "../../../../components/ui/ViewThemed";
import {COLORS} from "../../../../constants";
import React, {useEffect, useRef, useState} from "react";
import {useTranslation} from "react-i18next";
import {TNote} from "../../../../lib/type/TNotesProps";
import {useSelector} from "react-redux";
import NoteItem from "../../../../components/ui/note/NoteItem";
import Loading from "../../../../components/ui/Loading";
import {useLocalSearchParams} from "expo-router";

const Note = () => {
    const [notesList, setNotesList] = useState<TNote[]>([]);
    //const {selectedStudent} = useSelector((state: any) => state.student);
    const [loading, setLoading] = useState(true);
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);
    const {t} = useTranslation();
    const { periodChoose } = useLocalSearchParams();

    useEffect(() => {
        console.log(periodChoose);
        /*const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null && periodChoose !== null) {
                //GET ALL NOTE OF A STUDENT
                const studentNotesReq: unknown = await NoteService.getStudentNotes(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom.idclase,
                );

                const studentNotes: TNote[] = Array.isArray(studentNotesReq)
                    ? studentNotesReq
                    : [];
                const notesFiltered: TNote[] = studentNotes.filter(
                    (note: TNote) => note.idperiod === periodChoose?.idperiod,
                );
                setNotesList(notesFiltered);
            }
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });

        const subscription = checkAppState(appState, count, setCount);
        return () => {
            subscription.remove();
        };*/
        setLoading(false);
    }, []); //selectedStudent, periodChoose, universe_db, count

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <View style={styles.noteListContainer}>
                    <ScrollView style={{flex: 1, backgroundColor: COLORS.white}}>
                        <View style={styles.container}>
                            {(notesList.length === 0 || false) && (
                                <View>
                                    <Text style={{flex: 1, textAlign: 'center', color: COLORS.gray} as StyleSheet}>
                                        {t('eval.empty_note')}
                                    </Text>
                                </View>
                            )}
                            {notesList.length > 0 &&
                                notesList.map((note: any) => (
                                    <NoteItem key={note.idnote} data={note} />
                                ))}
                        </View>
                    </ScrollView>
                    {/*<NoteByDate
                        periodChoose={selectedPeriod}
                    />*/}
                </View>
            </View>
        </ViewThemed>
    );
};

export default Note;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: COLORS.white,
    },
    noteContent: {
        flex: 1,
        backgroundColor: COLORS.white,
    },
    noteListContainer: {
        flex: 1,
        backgroundColor: COLORS.white,
        //marginBottom: 0,
    },
});