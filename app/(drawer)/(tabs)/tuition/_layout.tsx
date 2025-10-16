import React from 'react';
import {COLORS} from "../../../../constants";
import {MaterialTopTabs} from "../eval/_layout";
import {useTranslation} from "react-i18next";

const TopTuitionLayout = () => {
    const {t} = useTranslation();

    return (
        <MaterialTopTabs
            screenOptions={{
                tabBarLabelStyle: {
                    fontSize: 14,
                    textTransform: 'capitalize',
                    letterSpacing: 0.6,
                    fontWeight: '700',
                },
                tabBarIndicatorStyle: {
                    borderBottomColor: COLORS.primary,
                    borderBottomWidth: 1,
                },
                tabBarActiveTintColor: COLORS.primary,
                tabBarInactiveTintColor: COLORS.gray,
            }}
        >
            <MaterialTopTabs.Screen
                name="payment"
                options={{
                    tabBarLabel: t('tuition.payment'),
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontSize: 15,
                        fontWeight: '700',
                    },
                }}
            />
            <MaterialTopTabs.Screen
                name="deadline"
                options={{
                    tabBarLabel: t('tuition.deadline'),
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontSize: 15,
                        fontWeight: '700',
                    },
                }}
            />
        </MaterialTopTabs>
    );
};

export default TopTuitionLayout;