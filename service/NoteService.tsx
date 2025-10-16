import { getRequest } from "../api/ApiManager";
import { TEvaluationProps, TNote, TNoteProps } from "../lib/type/TNotesProps";
import PeriodService from "./PeriodService";
import { TPeriod } from "../lib/type/TPeriod";
import { TSubject } from "../lib/type/TSubject";

class NoteService {
  static getStudentNotes = async (
    universeDB: string,
    studentId: number,
    classroomId: number,
    limit: number = 0,
  ) => {
    const notesReq = await getRequest(
      '',
      `/notes/${universeDB}/${studentId}/${classroomId}`,
    );
    const notes: TNoteProps[] = notesReq?.notes;
    if (limit > 0) {
      return NoteService.getStudentNotesLimited(universeDB, notes, 3);
    } else {
      return notes;
    }
  };
  static getStudentNotesByCategory = async (
    universeDB: string,
    studentId: number,
    classroomId: number,
  ) => {
    try {
      const notesReq = await getRequest(
        '',
        `/notes/subjects/${universeDB}/${studentId}/${classroomId}`,
      );
      const notes: TNoteProps[] = notesReq?.notes;
      return notes;
    } catch (error) {
      return error;
    }
  };
  static formatStudentsNotes = (
    notes: TNote[],
    subjects: TSubject[],
    periodChoose: TPeriod,
  ) => {
    let setionsData = [];
    for (var j = 0; j < subjects.length; j++) {
      const subject = subjects[j];
      const data = notes.filter(
        note =>
          note.idmat === subject.idmat &&
          note.idperiod === periodChoose.idperiod,
      );

      if (data.length > 0) {
        const section = {
          title: subject.nomat,
          teacherName: `${subject.nomperso} ${subject.prenomperso}`,
          content: data,
        };
        setionsData.push(section);
      }
    }
    return setionsData;
  };
  static getStudentNotesLimited = async (
    universeDB: string,
    notesList: TNoteProps[],
    limit: number,
  ) => {
    let homeNotes: TNoteProps[] = [];
    let count: number = 0;
    //GET SCHOOL PERIODS
    const periodsReq: unknown = await PeriodService.getPeriods(universeDB);
    const periods: TPeriod[] = Array.isArray(periodsReq) ? periodsReq : [];
    let periodSelected: TPeriod =
      periods[periods.length > 0 ? periods.length - 1 : 0];
    const periodIndexFound =
      PeriodService.selectRightIndexOfPeriodByDay(periods);
    if (periodIndexFound !== undefined) {
      periodSelected = periods[periodIndexFound];
    }
    if (notesList.length > 0) {
      const notes: TNoteProps[] = notesList.filter(
        (note: TNoteProps) =>
          note?.dispense !== 1 && note?.idperiod === periodSelected.idperiod,
      );
      for (let i = 0; i < notes.length; i++) {
        if (count < limit) {
          homeNotes.push(notes[i]);
          count++;
        } else {
          break;
        }
      }
    }
    return homeNotes;
  };
  static getStudentEvaluations = async (classroomId: number) => {
    try {
      const evalutionsReq = await getRequest('', `/evaluations/${classroomId}`);
      const evaluations: TEvaluationProps[] = evalutionsReq?.evaluations;
      return evaluations;
    } catch (error) {
      return error;
    }
  };
  static getDayEvaluations = (
    evaluationsList: TEvaluationProps[],
    today: number,
  ) => {
    const todayEvaluations: TEvaluationProps[] = [];
    if (evaluationsList?.length > 0) {
      for (let i = 0; i < evaluationsList.length; i++) {
        const dateEvalParsed = Number.parseInt(
          evaluationsList[i].debut.toString(),
          10,
        );
        let evaluationDate = new Date(dateEvalParsed).setHours(0, 0, 0, 0);

        if (evaluationDate === today) {
          todayEvaluations.push(evaluationsList[i]);
        }
      }
    }
    return todayEvaluations;
  };

  static getNoteDetails = async (
    universeDB: string,
    noteId: number,
    classMatterEvalId: number,
  ) => {
    try {
      return await getRequest(
        '',
        `/note/${universeDB}/${noteId}/${classMatterEvalId}`,
      );
    } catch (error) {
      return error;
    }
  };
}

export default NoteService;
