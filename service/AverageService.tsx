import {getRequest} from '../api/ApiManager';
import {TAverage} from '../lib/type/TAverage';

class AverageService {
  static getStudentAverages = async (
    universeDB: string,
    studentId: number,
    classId: number,
    periodId: number,
  ) => {
    const averagesReq: any = await getRequest(
      '',
      `/averages/${universeDB}/${studentId}/${classId}/${periodId}`,
    );
    const averages: TAverage[] = Array.isArray(averagesReq?.averages)
      ? averagesReq?.averages
      : [];
    return averages;
  };
  static getStudentRank = async (
    universeDB: string,
    studentId: number,
    classId: number,
    periodId: number,
    subjectId: number,
  ) => {
    const rankReq: any = await getRequest(
      '',
      `/averages/rank/${universeDB}/${studentId}/${classId}/${periodId}/${subjectId}`,
    );
    return rankReq?.averageDetails;
  };
}

export default AverageService;
