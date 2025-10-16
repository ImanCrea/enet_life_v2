import {
    MaterialTopTabNavigationEventMap,
    MaterialTopTabNavigationOptions,
    createMaterialTopTabNavigator,
} from "@react-navigation/material-top-tabs";
import { withLayoutContext } from "expo-router";
import { ParamListBase, TabNavigationState } from "@react-navigation/native";
import {COLORS} from "../../../../constants";
import {useTranslation} from "react-i18next";
import {Text, TouchableOpacity, View, StyleSheet} from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {globalStyles} from "../../../../style/Global";
import {useEffect, useState} from "react";
import {TPeriod} from "../../../../lib/type/TPeriod";
import {useSelector} from "react-redux";
import PeriodService from "../../../../service/PeriodService";
import Loading from "../../../../components/ui/Loading";

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
    MaterialTopTabNavigationOptions,
    typeof Navigator,
    TabNavigationState<ParamListBase>,
    MaterialTopTabNavigationEventMap
>(Navigator);

export default function EvalTopTabLayout() {
    const [indexSelected, setIndexSelected] = useState<any>(0);
    const {t} = useTranslation();
    const [periodList, setPeriodList] = useState<any>([]);
    const [selectedPeriod, setSelectedPeriod] = useState<any>(null);
    const [size, setSize] = useState<number | undefined>(0);
    //const [loading, setLoading] = useState(true);
    const {user} = useSelector((state: any) => state.user);
    const universe_db = user?.main;
    const [loading, setLoading] = useState(true);

    const handleForward = (index: number) => {
        if (periodList.length > 0) {
            if (index + 1 < periodList.length) {
                const indexFound = index + 1;
                setIndexSelected(indexFound);
                setSelectedPeriod(periodList[indexFound]);
            } else {
                setIndexSelected(periodList.length);
            }
        }
    };
    const handleBack = (index: number) => {
        if (periodList.length > 0) {
            if (index - 1 >= 0) {
                const indexFound = index - 1;
                setSelectedPeriod(periodList[indexFound]);
                setIndexSelected(indexFound);
            } else {
                setIndexSelected(0);
            }
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            //GET SCHOOL PERIODS
            const reqResult = await PeriodService.getPeriodsListByDay(universe_db);
            setPeriodList(reqResult.periodList);
            setSelectedPeriod(reqResult.periodSelected);
            setIndexSelected(reqResult.indexSelected);
            setSize(reqResult.indexSelected);
            setLoading(false);
        };
        fetchData().catch(error => {
            console.log(error);
            setLoading(false);
        });
    }, [universe_db]);

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <View style={styles.noteHeader}>
                <View style={styles.previousButton}>
                    <TouchableOpacity
                        style={{padding: 10, paddingTop: 5, paddingRight: 0}}
                        onPress={() => handleBack(indexSelected)}
                        disabled={indexSelected === 0}>
                        <MaterialIcons
                            name="arrow-back-ios"
                            size={16}
                            color={indexSelected === 0 ? COLORS.grayLight : COLORS.gray}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.noteHeaderTitle}>
                    <Text
                        style={[globalStyles.title]}>
                        {selectedPeriod?.nomperiod}
                    </Text>
                </View>
                <View style={styles.nextButton}>
                    <TouchableOpacity
                        style={{padding: 10, paddingTop: 5, paddingRight: 8}}
                        onPress={() => handleForward(indexSelected)}
                        disabled={size === indexSelected}>
                        <MaterialIcons
                            name="arrow-forward-ios"
                            size={16}
                            color={
                                size === indexSelected ? COLORS.grayLight : COLORS.gray
                            }
                        />
                    </TouchableOpacity>
                </View>
            </View>
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
                    name="note"
                    options={{
                        tabBarLabel: t('eval.date'),
                        title: t('eval.date'),
                        tabBarLabelStyle: {
                            textTransform: 'none',
                            fontSize: 15,
                            fontWeight: '700',
                        },
                    }}
                    initialParams={{
                        selectedPeriodId: selectedPeriod.idperiod,
                    }}
                />

                <MaterialTopTabs.Screen
                    name="subject"
                    options={{
                        tabBarLabel: t('eval.subject'),
                        title: t('eval.subject'),
                        tabBarLabelStyle: {
                            textTransform: 'none',
                            fontSize: 15,
                            fontWeight: '700',
                        },
                    }}
                    initialParams={{
                        selectedPeriodId: selectedPeriod.idperiod
                    }}
                />
            </MaterialTopTabs>
        </>
    );
}

const styles = StyleSheet.create({
    noteHeader: {
        flexDirection: 'row',
        paddingTop: 20,
        //paddingVertical: 10,
        backgroundColor: '#fff',
    },
    previousButton: {
        flex: 1,
        paddingLeft: 5,
        justifyContent: 'center',
    },
    noteHeaderTitle: {
        flex: 4,
    },
    nextButton: {
        flex: 1,
        paddingRight: 15,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
});