import {getRequest} from '../api/ApiManager';

class TuitionService {
  static getTuitionBalance = async (
    universeDB: string,
    studentId: number,
    promotionId: number,
  ) => {
    try {
      const tuitionReq = await getRequest(
        '',
        `/tuition/${universeDB}/${studentId}/${promotionId}`,
      );
      return tuitionReq?.tuitionBalance;
    } catch (error) {
      return error;
    }
  };
  static getTuition = async (
    universeDB: string,
    studentId: number,
    promotionId: number,
  ) => {
    try {
      return await getRequest(
        '',
        `/tuition/${universeDB}/${studentId}/${promotionId}`,
      );
    } catch (error) {
      return error;
    }
  };
  static getTuitionDeadline = async (
    universeDB: string,
    studentId: number,
    promotionId: number,
  ) => {
    try {
      return await getRequest(
        '',
        `/tuition/deadline/${universeDB}/${studentId}/${promotionId}`,
      );
    } catch (error) {
      return error;
    }
  };
}

export default TuitionService;
