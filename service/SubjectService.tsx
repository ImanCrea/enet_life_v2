import {getRequest} from '../api/ApiManager';
import {TSubject} from '../lib/type/TSubject';

class SubjectService {
  static getSubjects = async (universeDB: string, classId: number) => {
    try {
      const subjectsReq = await getRequest(
        '',
        `/subjects/${universeDB}/${classId}`,
      );
      const subjects: TSubject[] = subjectsReq?.subjects;
      return subjects;
    } catch (error) {
      return error;
    }
  };
}

export default SubjectService;
