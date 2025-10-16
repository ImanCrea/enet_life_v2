import {postRequest} from '../api/ApiManager';

type THomeDataProps = {
  eleveId: number;
  classeId: number;
  elevePromoId: number;
  endPoint: string;
};

function HomeService() {
  return {
    loadData: (data: THomeDataProps) => {
      return postRequest('', data.endPoint, {
        eleveId: data.eleveId,
        classeId: data.classeId,
        elevePromoId: data.elevePromoId,
      });
    },
  };
}

export default HomeService;
