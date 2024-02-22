export interface IEmpresa {
  empresa_id?: number;
  sector_id?: number;
  rubro?: number;
  nombre_completo?: string;
  pais?: string;
  departamento_id?: number;
  nombre_Company?: string;
  provincia_id?: number;
  direccion?: string;
  email?: string;
  password?: string;
  sitio_web?: string;
  email_code?: string;
  active?: boolean;
  account_confirm?: boolean;
  avatar?: string;
  created_at?: string;
  empresa_informacion?: IEmpresaInformacion;
}

export interface IEmpresaInformacion {
  empresa_informacion_id?: number;
  razon_social?: string;
  fecha_fundacion?: Date;
  ruc?: number;
  telefono?: string;
  movil?: string;
  nombre_comercial?: string;
  descripcion_empresa?: string;
}

// POSTULANTE
export interface IPostulante {
  postulante_id?: number;
  nombresC?: string;
  apellidosC?: string;
  email?: string;
  password?: string;
  account_confirm?: boolean;
  email_code?: string;
  active?: boolean;
  avatar?: string;
  cv?: string;
  cv_visible?: boolean;
  created_at?: string;
  reason_delete?: string;
}
