export interface Empresa {
  empresa_id: number;
  empresa_informacion_id: number;
  sector_id: number;
  rubro: number;
  nombre_completo: string;
  pais: string;
  departamento: Departamento;
  provincia: Provincia;
  direccion: string;
  email: string;
  password: string;
  sitio_web: string;
  email_code: string;
  active: boolean;
  account_confirm: boolean;
  avatar: string;
  created_at: string;
}

export interface Jornada {
  id: number;
  nombre: string;
}

export interface ModalidadTrabajo {
  id: number;
  nombre: string;
}

export interface Oferta {
  oferta_id: number;
  empresa: Empresa;
  jornada_id: Jornada;
  modalidad_trabajo_id: ModalidadTrabajo;
  area: AreaTrabajo;
  genero_id: number;
  tiempo_experiencia_id: number;
  nivel_educacion_id: number;
  nombre_puesto: string;
  ocultar_empresa: boolean;
  vacantes: number;
  fecha_contratacion: string;
  rango_salarial_min: number;
  rango_salarial_max: number;
  tipo_moneda_id: number;
  ocultar_salario: boolean;
  pais_id: number;
  departamento: Departamento;
  provincia: Provincia;
  distrito_id: number;
  descripcion: string;
  rango_edad_min: string;
  rango_edad_max: string;
  publicacion_automatica: boolean;
  fecha_publicacion_automatica: string;
  estado_oferta_id: number;
  tipo_contrato_id: number;
}

export interface Departamento {
  id: number;
  nombre: string;
}

export interface Provincia {
  id: number;
  nombre: string;
  //departamento_id: number;
}

export interface AreaTrabajo {
  id: number;
  nombre: string;
}