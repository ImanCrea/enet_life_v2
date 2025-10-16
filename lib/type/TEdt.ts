export type TEdt = {
  subject: {
    subject: string;
    color: string;
  };
  teacher: string;
  schedules: {
    idhor: number;
    codehor: string;
    nomhor: string;
    debut: number;
    fin: number;
    valid: boolean;
  };
  day: string;
  idedt: number;
};

export type TEdtProps = {
  key?: string | number;
  data: TEdt;
};
