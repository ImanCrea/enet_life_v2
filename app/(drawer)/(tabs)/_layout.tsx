import {Tabs} from "expo-router";
import {useColorScheme, View, Text} from "react-native";
import {COLORS, IMAGES, ROUTES} from "../../../constants";
import {useTranslation} from "react-i18next";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import CustomHeader from "../../../components/ui/CustomHeader";

export default function TabsLayout() {
    const colorScheme = useColorScheme();
    const theme = COLORS[colorScheme] ?? COLORS.light;
    const {t} = useTranslation();

    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarActiveTintColor: theme.tabIconColorFocused,
                    tabBarInactiveTintColor: theme.tabIconColor,
                    tabBarStyle: {
                        backgroundColor: theme.navBackground,
                        paddingTop: 5,
                        paddingBottom: 6,
                        height: 75,
                    },
                }}
            >
                <Tabs.Screen
                    name={ROUTES.TAB_HOME}
                    options={{
                        title: `${t('home.tabs_label')}`,
                        headerTintColor: theme.tabIconColorFocused,
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                size={28}
                                name="home"
                                color={focused ? theme.tabIconColorFocused : theme.tabIconColor }
                            /> as any
                        ),
                        header: () => {
                            return (
                                <CustomHeader title={t('home.tabs_label')} />
                            ) as any;
                        },
                    }}
                />

                <Tabs.Screen
                    name={ROUTES.TAB_EVAL}
                    options={{
                        title: `${t('eval.tabs_label')}`,
                        headerTintColor: theme.tabIconColorFocused,
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                size={28}
                                name="calendar-edit"
                                color={focused ? theme.tabIconColorFocused : theme.tabIconColor }
                            /> as any
                        ),
                        header: () => {
                            return (
                                <CustomHeader title={t('eval.tabs_label')} />
                            ) as any;
                        },
                    }}
                />

                <Tabs.Screen
                    name={ROUTES.TAB_TUITION}
                    options={{
                        title: `${t('tuition.tabs_label')}`,
                        headerTintColor: theme.tabIconColorFocused,
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons
                                size={28}
                                name="point-of-sale"
                                color={focused ? theme.tabIconColorFocused : theme.tabIconColor }
                            /> as any
                        ),
                        header: () => {
                            return (
                                <CustomHeader title={t('tuition.tabs_label')} />
                            ) as any;
                        },
                    }}
                />

                <Tabs.Screen
                    name={ROUTES.TAB_CALENDAR}
                    options={{
                        title: `${t('calendar.tabs_label')}`,
                        headerTintColor: theme.tabIconColorFocused,
                        tabBarIcon: ({ focused }) => (
                            <MaterialCommunityIcons
                                size={28}
                                name="calendar-month"
                                color={focused ? theme.tabIconColorFocused : theme.tabIconColor }
                            /> as any
                        ),
                        header: () => {
                            return (
                                <CustomHeader title={t('calendar.tabs_label')} />
                            ) as any;
                        },
                    }}
                />

                <Tabs.Screen
                    name={ROUTES.TAB_MORE}
                    options={{
                        title: `${t('more.tabs_label')}`,
                        headerTintColor: theme.tabIconColorFocused,
                        headerShown: false,
                        tabBarIcon: ({ focused }) => (
                            <MaterialIcons
                                size={28}
                                name="more-horiz"
                                color={focused ? theme.tabIconColorFocused : theme.tabIconColor }
                            /> as any
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
