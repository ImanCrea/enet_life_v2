import {getRequest} from '../api/ApiManager';

class TeacherService {
  static getClassroomTeachers = async (universeDB: string, classId: number) => {
    return await getRequest('', `/teachers/classroom/${universeDB}/${classId}`);
  };
}

export default TeacherService;
