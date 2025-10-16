import React, {useEffect} from 'react';
import {
    Modal,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTranslation} from 'react-i18next';
import {COLORS} from "../../../../constants";

function AverageModal({visibility, setVisibility, data}: any) {
    const {t} = useTranslation();
    useEffect(() => {}, []);

    const handleCloseAlertModal = () => {
        setVisibility(false);
    };

    return (
        <Modal
            visible={visibility}
            animationType="slide"
            transparent={true}
            style={{backgroundColor: COLORS.white}}>
            <SafeAreaView
                style={{
                    flex: 1,
                    backgroundColor: COLORS.white,
                    margin: 5,
                    borderColor: COLORS.grayMedium,
                    borderWidth: 1,
                    borderRadius: 10,
                }}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalHeader}>
                        <View style={styles.modalTitle}>
                            <Text style={styles.modalTitleText}>{data?.nomat}</Text>
                        </View>
                        <TouchableWithoutFeedback onPress={() => handleCloseAlertModal()}>
                            <MaterialIcons name="close" size={28} color={COLORS.gray} />
                        </TouchableWithoutFeedback>
                    </View>
                    <ScrollView style={styles.modalContent}>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelDetailRow}>
                                {t('more.average_student')}
                            </Text>
                            <Text style={styles.averageDetailRow}>
                                {data?.studentAverage}
                            </Text>
                        </View>

                        <View style={styles.detailRow}>
                            <Text style={styles.labelDetailRow}>
                                {t('more.average_class')}
                            </Text>
                            <Text style={styles.averageDetailRow}>{data?.classAverage}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelDetailRow}>{t('more.up_average')}</Text>
                            <Text style={styles.averageDetailRow}>{data?.maxAverage}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelDetailRow}>
                                {t('more.down_average')}
                            </Text>
                            <Text style={styles.averageDetailRow}>{data?.minAverage}</Text>
                        </View>
                        <View style={styles.detailRow}>
                            <Text style={styles.labelDetailRow}>
                                {t('more.student_rank')}
                            </Text>
                            <Text style={styles.averageDetailRow}>{data?.studentRank}</Text>
                        </View>
                    </ScrollView>
                </View>
            </SafeAreaView>
        </Modal>
    );
}

export default AverageModal;

const styles = StyleSheet.create({
    modalContainer: {
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
    modalContent: {
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
});
