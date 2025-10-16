import {getRequest} from '../api/ApiManager';
import {TPeriod} from '../lib/types/TPeriod';
import {set} from 'date-fns';

class PeriodService {
  static getPeriods = async (universeDB: string) => {
    try {
      const periodsReq = await getRequest('', `/periods/${universeDB}`);
      const periods: TPeriod[] = periodsReq?.periods;
      return periods;
    } catch (error) {
      return error;
    }
  };
  static selectRightIndexOfPeriodByDay = (
    periods: TPeriod[],
  ): number | undefined => {
    const today = set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const todayTime = today.getTime();
    if (periods.length > 0) {
      const rightPeriod: TPeriod | undefined = periods.find(
        (period: TPeriod) =>
          period.debutperiod <= todayTime && period.finperiod >= todayTime,
      );
      if (rightPeriod !== undefined) {
        return periods.indexOf(rightPeriod);
      } else {
        return undefined;
      }
    } else {
      return undefined;
    }
  };
  static selectRightPeriodByDay = () => {
    const today = set(new Date(), {
      hours: 0,
      minutes: 0,
      seconds: 0,
      milliseconds: 0,
    });
    const todayTime = today.getTime();
  };
  static getPeriodsListByDay = async (universeDB: string) => {
    const periodsReq: unknown = await PeriodService.getPeriods(universeDB);
    const periods: TPeriod[] = Array.isArray(periodsReq) ? periodsReq : [];
    const periodConcern: number = periods.length > 0 ? periods.length - 1 : 0;
    if (periods.length > 0) {
      let schoolPeriod: TPeriod = periods[periodConcern];
      const periodIndexFound =
        PeriodService.selectRightIndexOfPeriodByDay(periods);
      if (periodIndexFound !== undefined) {
        schoolPeriod = periods[periodIndexFound];
      }
      return {
        periodList: periods,
        periodSelected: schoolPeriod,
        indexSelected:
          periodIndexFound !== undefined ? periodIndexFound : periodConcern,
      };
    }
    return {
      periodList: [],
      periodSelected: null,
      indexSelected: 0,
    };
  };
}

export default PeriodService;
