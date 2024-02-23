export interface Departamentos {
    id: number;
    nombre_departamento: string;
}

export interface Provincia {
    id: number;
    nombre_provincia: string;
    id_departamento: number;
}