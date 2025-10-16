export type TAverage = {
  idperiod: number;
  nomat: string;
  idmat: number;
  moyenfinal: number;
  moyencalcul: number;
  moyenbase: number;
  rangmoyen: string;
  etatnote: string;
};

export type TRank = {
  studentAverage: number;
  studentRank: string;
  classAverage: number;
  maxAverage: number;
  minAverage: number;
  nomat: string;
};

export type TAverageProps = {
  data: TAverage;
};
