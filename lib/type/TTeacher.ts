export type TTeacher = {
  idperso: number;
  nomperso: string;
  prenomperso: string;
  courriel: string;
  sexe: string;
  phonemobile: string;
  matiere: string;
  uriphoto: string;
};

export type TTeacherProps = {
  key?: string | number;
  data: TTeacher;
};
