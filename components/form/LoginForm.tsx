import {ScrollView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput} from "react-native";
import {useTranslation} from "react-i18next";
import {COLORS, IMAGES} from "../../constants";
import * as yup from 'yup';
import {JSX, useState} from "react";
import IconRender from "../ui/IconRender";
import FlatButton from '../ui/FlatButton';
import {Formik} from "formik";
import Spacer from "../ui/Spacer";
import {TLoginFormProps} from "../../lib/type/authenticationTypes";

const loginFormSchema = yup.object({
    username: yup.string().required().min(3),
    password: yup.string().required().min(3),
});

const LoginForm = ({
                       onSubmit,
                       errorMessage,
                       sending,
                   }: TLoginFormProps) => {
    const {t} = useTranslation();
    const [passwordVisibility, setPasswordVisibility] = useState(true);
    const [passwordIcon, setPasswordIcon] = useState(IMAGES.eyeOffIcon);

    const handlePasswordVisibility = () => {
        setPasswordVisibility(!passwordVisibility);
        passwordVisibility
            ? setPasswordIcon(IMAGES.eyeIcon)
            : setPasswordIcon(IMAGES.eyeOffIcon);
    };

    return (
        <ScrollView style={{flex: 1}}>
            <View style={styles.authContent}>
                <View style={styles.authHeader}>
                    <Text style={styles.titleAuthenticate}>
                        {t('authentication.login_title')}
                    </Text>
                </View>
                <View style={styles.illustration}>
                    <Image
                        source={IMAGES.onBoardingLogo}
                        resizeMode="cover"
                        style={styles.responsiveImage}
                    />
                </View>
                <Spacer height={10} />

                <View style={styles.formContent}>
                    <Text style={[styles.errorText, {textAlign: 'center'}] as any}>
                        {errorMessage}
                    </Text>
                    <Spacer height={10} />

                    <Formik
                        initialValues={{
                            username: '',
                            password: '',
                        }}
                        validationSchema={loginFormSchema}
                        onSubmit={data => {
                            onSubmit(data);
                        }}>
                        {formikProps => (
                            <>
                                <Text style={styles.label}>
                                    {t('authentication.username_label')}
                                </Text>
                                <TextInput
                                    style={{...styles.input}}
                                    placeholder={t('authentication.username_placeholder')}
                                    placeholderTextColor={COLORS.grayLight}
                                    onChangeText={formikProps.handleChange('username')}
                                    value={formikProps.values.username.trim()}
                                    onBlur={formikProps.handleBlur('username')}
                                    keyboardType={'number-pad'}
                                />
                                {formikProps.touched.username &&
                                    formikProps.errors.username && (
                                        <Text style={{...styles.errorText}}>
                                            {t('authentication.required_field')}
                                        </Text>
                                    )}

                                <Text style={{...styles.label, marginTop: 15}}>
                                    {t('authentication.password_label')}
                                </Text>
                                <View style={styles.password}>
                                    <TextInput
                                        style={{...styles.inputPassword}}
                                        secureTextEntry={passwordVisibility}
                                        placeholder={t('authentication.password_place')}
                                        placeholderTextColor={COLORS.grayLight}
                                        onChangeText={formikProps.handleChange('password')}
                                        value={formikProps.values.password.trim()}
                                        onBlur={formikProps.handleBlur('password')}
                                    />
                                    <TouchableOpacity
                                        onPress={() => handlePasswordVisibility()}
                                        activeOpacity={0.8}
                                        style={styles.passwordIcon}>
                                        <IconRender
                                            source={passwordIcon}
                                            style={{width: 28, height: 28, top: 2}}
                                        />
                                    </TouchableOpacity>
                                </View>
                                {formikProps.touched.password &&
                                    formikProps.errors.password && (
                                        <Text style={styles.errorText}>
                                            {t('authentication.required_field')}
                                        </Text>
                                    )}

                                <Spacer height={65} />

                                <FlatButton
                                    title={t('authentication.sign_in')}
                                    style={{
                                        paddingVertical: 15,
                                        backgroundColor: COLORS.primary,
                                    }}
                                    disable={sending}
                                    onPress={() => formikProps.handleSubmit()}
                                />
                                <Spacer height={10} />
                            </>
                        ) as JSX.Element}
                    </Formik>

                </View>
            </View>
        </ScrollView>
    );
};

export default LoginForm;

const styles = StyleSheet.create({
    authContent: {
        flex: 8,
        padding: 20,
        paddingTop: 25,
    },
    authHeader: {
        flexDirection: 'row',
    },
    titleAuthenticate: {
        flex: 1,
        textAlign: 'center',
        fontWeight: '600',
        fontSize: 16,
        letterSpacing: 1,
        color: COLORS.gray,
    },
    illustration: {
        marginTop: '12%',
        alignItems: 'center',
    },
    responsiveImage: {
        width: '100%',
        height: 130,
        aspectRatio: 160 / 86,
    },
    formContent: {
        //marginTop: 10,
        marginBottom: 100,
    },
    label: {
        marginBottom: 6,
        color: COLORS.gray,
        fontSize: 15,
        letterSpacing: 1,
    },
    input: {
        borderWidth: 1,
        borderColor: COLORS.grayMedium,
        padding: 12,
        paddingHorizontal: 18,
        fontSize: 16,
        borderRadius: 10,
        color: COLORS.black,
        letterSpacing: 1,
    },
    password: {
        flexDirection: 'row',
        borderWidth: 1,
        borderColor: COLORS.grayMedium,
        borderRadius: 10,
        color: COLORS.black,
    },
    inputPassword: {
        flex: 6,
        fontSize: 16,
        padding: 12,
        paddingHorizontal: 18,
        color: COLORS.black,
        letterSpacing: 1,
    },
    passwordIcon: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    errorText: {
        color: 'crimson',
        marginTop: 5,
        marginLeft: 5,
    }
});