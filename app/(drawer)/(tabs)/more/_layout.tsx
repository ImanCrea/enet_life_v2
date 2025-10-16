import React from 'react';
import {Stack, useRouter} from "expo-router";
import CustomHeader from "../../../../components/ui/CustomHeader";
import {useTranslation} from "react-i18next";
import CustomHeaderWithButton from "../../../../components/ui/CustomHeaderWithButton";

const MoreLayout = () => {
    const {t} = useTranslation();
    const router = useRouter();

    const handleBackRoute = (routeName: string) => {
        router.push(routeName);
    }

    return (
        <Stack
            screenOptions={{
                headerShown: true,
            }}
        >
            <Stack.Screen
                name="index"
                options={{
                    animate: false,
                    header: () => {
                        return (
                            <CustomHeader title={t('more.tabs_label')} />
                        ) as any;
                    },
                }}

            />
            <Stack.Screen
                name="absence/index"
                options={{
                    animate: false,
                    header: () => {
                        return (
                            <CustomHeaderWithButton
                                handleBackRoute={handleBackRoute}
                                title={t('more.absence')}
                                backRouteName="/more"
                            />
                        ) as any;
                    },
                }}
            />

            <Stack.Screen
                name="average/index"
                options={{
                    header: () => {
                        return (
                            <CustomHeaderWithButton
                                handleBackRoute={handleBackRoute}
                                title={t('more.average')}
                                backRouteName="/more"
                            />
                        ) as any;
                    },
                }}
            />

            <Stack.Screen
                name="bulletin/index"
                options={{
                    header: () => {
                        return (
                            <CustomHeaderWithButton
                                handleBackRoute={handleBackRoute}
                                title={t('more.bulletin')}
                                backRouteName="/more"
                            />
                        ) as any;
                    },
                }}
            />

            <Stack.Screen
                name="teacher/index"
                options={{
                    header: () => {
                        return (
                            <CustomHeaderWithButton
                                handleBackRoute={handleBackRoute}
                                title={t('more.teachers')}
                                backRouteName="/more"
                            />
                        ) as any;
                    },
                }}
            />

        </Stack>

        /*<Stack />*/
    );
};

export default MoreLayout;