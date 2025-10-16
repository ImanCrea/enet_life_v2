import {getRequest, postRequest} from '../api/ApiManager';
import {FormikValues} from 'formik';

class AuthenticationService {
  static authenticateUser = async (data: FormikValues) => {
    return await postRequest('', '/login', data);
  };
  static getUser = async () => {
    return await getRequest('', '/user');
  };
}

export default AuthenticationService;
