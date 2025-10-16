import React, {useEffect, useRef, useState} from 'react';
import {globalStyles} from "../../../../style/Global";
import {View, Text, StyleSheet, AppState, ScrollView} from "react-native";
import ViewThemed from "../../../../components/ui/ViewThemed";
import {COLORS} from "../../../../constants";
import {useSelector} from "react-redux";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {TNote} from "../../../../lib/type/TNotesProps";
import NoteSubjectItem from "../../../../components/ui/note/NoteSubjectItem";
import Accordion from 'react-native-collapsible/Accordion';
import {checkAppState} from "../../../../utils/utilities";
import Loading from "../../../../components/ui/Loading";
import {useLocalSearchParams} from "expo-router";

const Subject = () => {
    const [activeSections, setActiveSections] = useState([]);
    const [sections, setSections] = useState<any>([]);
    const [loading, setLoading] = useState(true);
    //const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;
    const [count, setCount] = useState(0);
    const appState = useRef(AppState.currentState);
    const { periodChoose } = useLocalSearchParams();

    const renderHeader = (section: any, _: any, isActive: boolean) => {
        return (
            <View style={styles.accordHeader}>
                <View>
                    <Text
                        style={[globalStyles.titleH2, {paddingBottom: 1, textTransform: 'uppercase'} as StyleSheet]}>
                        {section.title}
                    </Text>
                    <Text style={globalStyles.paragraph}>{section.teacherName}</Text>
                </View>
                <MaterialIcons
                    name={isActive ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
                    size={24}
                    color={COLORS.gray}
                />
            </View>
        );
    };

    const renderContent = (section: any, _: any) => {
        const content: TNote[] = section?.content;
        return (
            <View style={styles.accordBody}>
                {content.length > 0 &&
                    content.map((noteSection: any, index: number) => (
                        <NoteSubjectItem
                            key={index}
                            data={noteSection}
                        />
                    ))}
            </View>
        );
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            console.log(periodChoose);
            /*if (selectedStudent !== null && periodChoose !== null) {
                //GET SUBJECTS LIST
                const subjectsReq: unknown = await SubjectService.getSubjects(
                    universe_db,
                    selectedStudent?.classroom.idclase,
                );
                const subjects: TSubject[] = Array.isArray(subjectsReq)
                    ? subjectsReq
                    : [];

                //GET ALL STUDENTS NOTES
                const notesReq = await NoteService.getStudentNotesByCategory(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom.idclase,
                );
                const notes: TNote[] = Array.isArray(notesReq) ? notesReq : [];
                //FORMAT DATA FOR ACCORDION
                const notesFormatted = NoteService.formatStudentsNotes(
                    notes,
                    subjects,
                    periodChoose,
                );
                const notesFormattedReq = Array.isArray(notesFormatted)
                    ? notesFormatted
                    : [];
                setSections(notesFormattedReq);
            }*/
            setLoading(false);
        };

        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });

        const subscription = checkAppState(appState, count, setCount);
        return () => {
            subscription.remove();
        };
    }, []);//selectedStudent, periodChoose, universe_db, count

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={{flex: 1, backgroundColor: COLORS.white}}>
                <View style={styles.container}>
                    <Accordion
                        align="bottom"
                        sections={sections}
                        activeSections={activeSections}
                        renderHeader={renderHeader}
                        renderContent={renderContent}
                        // @ts-ignore
                        onChange={section => setActiveSections(section)}
                        sectionContainerStyle={styles.accordContainer}
                    />
                </View>
            </ScrollView>
        </ViewThemed>
    );
};

export default Subject;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingLeft: 15,
        paddingRight: 15,
        backgroundColor: COLORS.white,
    },
    accordContainer: {
        paddingBottom: 4,
    },
    accordHeader: {
        padding: 8,
        backgroundColor: COLORS.grayExtraLight,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: COLORS.grayMedium,
        borderBottomWidth: 1,
    },
    accordTitle: {
        fontSize: 20,
    },
    accordBody: {
        paddingTop: 12,
    },
    textSmall: {
        fontSize: 16,
    },
});