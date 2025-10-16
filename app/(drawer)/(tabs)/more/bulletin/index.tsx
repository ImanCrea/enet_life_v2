import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from "react-native";
import {useTranslation} from "react-i18next";
import {useSelector} from "react-redux";
import {TReportCard} from "../../../../../lib/type/TReportCard";
import Loading from "../../../../../components/ui/Loading";
import ViewThemed from "../../../../../components/ui/ViewThemed";
import {globalStyles} from "../../../../../style/Global";
import {COLORS} from "../../../../../constants";
import BulletinItem from "../../../../../components/ui/more/bulletin/BulletinItem";
import ReportCardService from "../../../../../service/ReportCardService";

const Bulletin = () => {
    const {t} = useTranslation();
    const {selectedStudent} = useSelector((state: any) => state.student);
    const {user} = useSelector((state: any) => state.user);
    const [loading, setLoading] = useState(true);
    const [reportCardList, setReporCardList] = useState<TReportCard[]>([]);
    const universe_db = user?.main;

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            if (selectedStudent !== null) {
                // GET STUDENT REPORT CARD
                const reportReq = await ReportCardService.getStudentReportCard(
                    universe_db,
                    selectedStudent?.idelev,
                    selectedStudent?.classroom.idclase,
                );
                const reportCardsRes: TReportCard[] = Array.isArray(
                    reportReq?.reportCard,
                )
                    ? reportReq?.reportCard
                    : [];
                setReporCardList(reportCardsRes);
            }
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [selectedStudent, universe_db]);

    if (loading) {
        return <Loading />;
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <ScrollView style={{flex: 1}}>
                    <View style={styles.container}>
                        {(reportCardList.length === 0 || false) && (
                            <View style={{flex: 1}}>
                                <Text
                                    style={{
                                        flex: 1,
                                        textAlign: 'center',
                                        color: COLORS.gray,
                                    } as StyleSheet}>
                                    {t('more.empty_reportCard')}
                                </Text>
                            </View>
                        )}
                        {reportCardList.length > 0 &&
                            reportCardList.map((reportCard: TReportCard) => (
                                <BulletinItem
                                    key={reportCard.idmoyenperiod}
                                    data={reportCard}
                                />
                            ))}
                    </View>
                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default Bulletin;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 15,
        flexWrap: 'wrap',
    },
});