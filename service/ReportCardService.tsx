import {getRequest} from '../api/ApiManager';

class ReportCardService {
  static getStudentReportCard = async (
    universeDB: string,
    studentId: number,
    classId: number,
  ) => {
    try {
      return await getRequest(
        '',
        `/report/student/${universeDB}/${studentId}/${classId}`,
      );
    } catch (error) {
      return error;
    }
  };
}

export default ReportCardService;
