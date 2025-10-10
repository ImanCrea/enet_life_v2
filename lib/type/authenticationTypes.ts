import {NavigationProp} from '@react-navigation/native';
import {FormikValues} from 'formik';

export type TAuthenticationProps = {
  navigation: NavigationProp<any>;
};

export type TLoginFormProps = {
  errorMessage?: string;
  sending?: boolean;
  onSubmit(data: FormikValues): void;
};
