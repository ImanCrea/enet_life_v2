export type TPayment = {
  idversement: number;
  codeversement: string;
  nomversement: string;
  montantversement: number;
  dateversement: string;
  idfraiscol: number;
  idscolarite: number;
  typedevise: string;
  typeversement: string;
  paiementeffectue: string;
};

export type TPaymentProps = {
  key?: string | number;
  data: TPayment;
};
