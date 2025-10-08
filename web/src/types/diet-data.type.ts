export interface DietData{
    nome: string;
    idade: number;
    peso_kg: number;
    sexo: "masculino" | "feminino";
    altura_cm: number;
    objetivo: "perda_peso" | "ganho_muscular" | "manutencao";
    nivel_atividade: "sedentario" | "2x_semana" | "4x_semana";
}