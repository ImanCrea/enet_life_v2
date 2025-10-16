import {getRequest} from '../api/ApiManager';

class WorkdayService {
  static getWorkdays = async (universeDB: string) => {
    try {
      const wordaysReq = await getRequest('', `/workdays/${universeDB}`);
      return wordaysReq?.dayOpen;
    } catch (error) {
      return error;
    }
  };
}

export default WorkdayService;
