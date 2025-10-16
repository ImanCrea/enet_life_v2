import {getRequest} from '../api/ApiManager';
import {TEdt} from '../lib/type/TEdt';
import {format} from 'date-fns';
import {fr} from 'date-fns/locale';

class EdtService {
  static getAllEdt = async (universeDB: string, classId: number) => {
    return await getRequest('', `/edt/all/${universeDB}/${classId}`);
  };
  static getDayEdt = (
    weekEdtList: TEdt[],
    today: number,
    periodSelected: number,
  ) => {
    let todayEdt: TEdt[] = [];
    if (weekEdtList.length > 0) {
      const dayFormatted = format(today, 'EEEE', {locale: fr});
      /*for (var i = 0; i < weekEdtList.length; i++) {
        const dayEdt: TEdt = weekEdtList[i];
        if (
          dayEdt.day.toLowerCase() === dayFormatted.toLowerCase() &&
          dayEdt.idedt === periodSelected
        ) {
          todayEdt.push(dayEdt);
        }
      }*/
      todayEdt = weekEdtList.filter(
        (dayEdt: TEdt) =>
          dayEdt.day.toLowerCase() === dayFormatted.toLowerCase() &&
          dayEdt.idedt === periodSelected,
      );
    }
    return todayEdt;
  };
}

export default EdtService;
