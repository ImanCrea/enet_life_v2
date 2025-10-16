import React, {useEffect, useState} from 'react';
import ViewThemed from "../../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../../style/Global";
import {View, StyleSheet, ScrollView} from "react-native";
import {useSelector} from "react-redux";
import {TTeacher} from "../../../../../lib/type/TTeacher";
import Loading from "../../../../../components/ui/Loading";
import TeacherItem from "../../../../../components/ui/more/teacher/TeacherItem";

const Teacher = () => {
    //const {selectedStudent} = useSelector((state: any) => state.student);
    //const {user} = useSelector((state: any) => state.user);
    const [teachersList, setTeachersList] = useState<TTeacher[]>([]);
    const [loading, setLoading] = useState(true);
    //const universe_db = user?.main;

    useEffect(() => {
        setLoading(false);
        /*const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                const teachersReq: any = await TeacherService.getClassroomTeachers(
                    universe_db,
                    selectedStudent?.classroom.idclase,
                );
                const teachersRes: TTeacher[] = Array.isArray(teachersReq?.teachers)
                    ? teachersReq?.teachers
                    : [];
                setTeachersList(teachersRes);
            }
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });*/
    }, []); //selectedStudent, universe_db

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        {teachersList.length > 0 &&
                            teachersList.map((teacher: TTeacher, index: number) => (
                                <TeacherItem
                                    data={teacher}
                                    key={index}
                                />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default Teacher;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
});
