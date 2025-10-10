import { Drawer } from 'expo-router/drawer';
import DrawerHeaderContent from "../../components/drawer/DrawerHeaderContent";
import {COLORS} from "../../constants";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {useTranslation} from "react-i18next";
import {useColorScheme} from "react-native";
import {globalStyles} from "../../style/Global";

export default function DrawerLayout() {
    const colorScheme = useColorScheme();
    const theme = COLORS[colorScheme] ?? COLORS.light;
    const {t} = useTranslation();

    return (
        <Drawer
            drawerContent={(props: any) => <DrawerHeaderContent {...props} />}
        >
            <Drawer.Screen
                name="(tabs)"
                options={{
                    drawerLabel: 'Accueil',
                    headerShown: false,
                    drawerIcon: () => (
                        <MaterialIcons name="home" size={26} color={theme.drawerIconColor} /> as any
                    ),
                    drawerLabelStyle: globalStyles.drawerLinkItem,
                    drawerItemStyle: {
                        marginTop: 0,
                        marginBottom: 0,
                    },
                    drawerActiveTintColor: COLORS.white,
                    drawerStyle: {
                        width: '78%',
                    },
                }}
            />
        </Drawer>
    );
}