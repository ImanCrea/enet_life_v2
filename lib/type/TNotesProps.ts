export type TNoteProps = {
    idnote: number;
    nomat: string;
    titrevalution?: string;
    idmat?: number;
    note: number;
    basenote: number;
    dateupdate: number;
    dispense?: number;
    etatnote: string;
    idperiod: number;
};

export type TEvaluationProps = {
    ideval: number;
    titre: string;
    debut: number;
    fin: number;
    nomat: string;
};

export type TNote = {
    idnote: number;
    note: number;
    nomat: string;
    titrevalution?: string;
    idmat?: number;
    dateupdate: string;
    basenote: string;
    dispense?: number;
    etatnote: string;
    idperiod: number;
};

export type TNoteItemProps = {
    key?: string | number;
    data: TNote;
};
