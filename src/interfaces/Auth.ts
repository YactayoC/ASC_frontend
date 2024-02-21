export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterFormPostulant {
  email: string;
  email_code: number;
  nombres: string;
  apellidos: string;
  password: string;
}

export interface RegisterFormCompany {
  email: string;
  email_code: number;
  nombre_completo: string;
  password: string;
  nombre_comercial: string;
  sector_id: number;
  movil: string;
  razon_social: string;
  descripcion_empresa: string;
}
