import {getRequest} from '../api/ApiManager';
import {TAbsence} from '../lib/type/TAbsence';

class AbsenceService {
  static getStudentAbsences = async (
    universeDB: string,
    studentId: number,
    limit = 0,
  ) => {
    const absencesReq = await getRequest(
      '',
      `/absences/${universeDB}/${studentId}`,
    );
    const absences: TAbsence[] = absencesReq?.absences;
    if (limit > 0) {
      return AbsenceService.getStudentAbsencesLimited(absences, limit);
    } else {
      return absences;
    }
  };

  static getStudentAbsencesLimited = (
    absenceList: TAbsence[],
    limit: number,
  ) => {
    let homeAbsences: TAbsence[] = [];
    let count: number = 0;
    if (absenceList.length > 0) {
      for (let i = 0; i < absenceList.length; i++) {
        if (count < limit) {
          homeAbsences.push(absenceList[i]);
          count++;
        } else {
          break;
        }
      }
    }
    return homeAbsences;
  };
}

export default AbsenceService;
