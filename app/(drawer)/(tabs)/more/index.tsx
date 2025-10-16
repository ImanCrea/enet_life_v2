import {Text, View, StyleSheet, ScrollView} from "react-native";
import {useTranslation} from "react-i18next";
import {Link, useRouter} from "expo-router";
import {globalStyles} from "../../../../style/Global";
import Spacer from "../../../../components/ui/Spacer";
import MoreMenuButton from "../../../../components/ui/more/MoreMenuButton";
import ViewThemed from "../../../../components/ui/ViewThemed";

const More = () => {
    const {t} = useTranslation();
    const router = useRouter();

    const handlePress = async (path: string) => {
        router.push(path);
    }

    return (
        <ViewThemed style={globalStyles.container}>
            <View style={globalStyles.content}>
                <ScrollView style={styles.moreContainer}>
                    <Spacer height={15} />
                    <MoreMenuButton
                        title={t('more.absence')}
                        icon="directions-run"
                        size={22}
                        handleNavigation={() => handlePress('/more/absence')}
                    />

                    <MoreMenuButton
                        title={t('more.average')}
                        icon="calculate"
                        size={22}
                        handleNavigation={() => handlePress('/more/average')}
                    />
                    <MoreMenuButton
                        title={t('more.bulletin')}
                        icon="local-library"
                        size={22}
                        handleNavigation={() => handlePress('/more/bulletin')}
                    />
                    <MoreMenuButton
                        title={t('more.teachers')}
                        icon="groups"
                        size={22}
                        handleNavigation={() => handlePress('/more/teacher')}
                    />

                </ScrollView>
            </View>
        </ViewThemed>
    );
};

export default More;

const styles = StyleSheet.create({
    moreContainer: {
        //flex:1,
    },
    moreContent: {},
});