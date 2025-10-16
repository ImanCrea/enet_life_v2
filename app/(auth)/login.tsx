import ViewThemed from "../../components/ui/ViewThemed";
import {globalStyles} from "../../style/Global";
import LoginForm from "../../components/form/LoginForm";
import {useState} from "react";
import {useTranslation} from "react-i18next";
import {Link} from "expo-router";
import AuthenticationService from "../../service/AuthenticationService";
import {generateToken} from "../../utils/utilities";
import {loginUser} from "../../redux/features/userSlice";
import {useDispatch} from "react-redux";

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [buttonStatus, setButtonStatus] = useState(false);
    const {t} = useTranslation();
    const dispatch = useDispatch();

    const onSubmit = async (data: any) => {
        try {
            setButtonStatus(true);
            const response = await AuthenticationService.authenticateUser(data);
            const token = generateToken(
                response.data?.user?.idcompteclient,
                response.data?.user?.pseudocpte,
            );
            const userInfo = {
                user: response.data?.user,
                token: token,
            };
            dispatch(loginUser(userInfo));
            //dispatch(getUserChildren({studentList: response.data?.studentList}));
            setButtonStatus(false);
        }
        catch (error) {
            setButtonStatus(false);
            if (error.response?.data) {
                setErrorMessage(error.response?.data?.message);
            }
            else {
                if (error.code === 'ERR_NETWORK') {
                    setErrorMessage(t('systemTranslation.connexion_issue'));
                } else {
                    console.log(JSON.stringify(error));
                }
            }
        }
    }

    return (
        <ViewThemed safe style={globalStyles.container}>
            <LoginForm
                onSubmit={onSubmit}
                errorMessage={errorMessage}
                sending={buttonStatus}
            />
        </ViewThemed>
    );
};

export default Login;