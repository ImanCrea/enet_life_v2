export type TReportCard = {
  idmoyenperiod: number;
  bulletin: string;
  nomperiod: string;
};

export type TReportCardProps = {
  key?: string | number;
  data: TReportCard;
};
