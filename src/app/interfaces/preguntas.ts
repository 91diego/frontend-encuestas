export interface Preguntas {

    // ATRIBUTOS DE LA INTERFAZ
    id?: number;
    numero: number;
    descripcion: string;
    multiple: boolean;
    medicion_id: number;
    encuesta_id: number;
    created_at?: string;
    updated_at?: string;
}
