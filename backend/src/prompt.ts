/*
    2 Tipos de prompt:
    1. System prompt: Instruções para a IA sobre como deve se comportar.
    2. User prompt: Dados específicos do usuário para gerar o plano de dieta.
    docs system prompt: Instruções para a IA sobre como deve se comportar ao analisar os documentos fornecidos.
*/


import type { DietPlanRequest } from "./types";

export function buildSystemPrompt(){
    return [
    'Você é Nutri-AI, um agente de nutrição que cria planos semanais de dieta personalizados com base nas informações fornecidas pelo usuário.',
    'Regras fixas:',
    '- Sempre responda em texto markdown legível para humanos.',
    '- Use # para títulos e - para itens de lista.',
    '- A dieta deve conter exatamente 7 dias.',
    '- Cada dia deve ter 4 refeições fixas: café_da_manhã, almoço, lanche, jantar.',
    '- SEMPRE inclua ingredientes comuns no Brasil.',
    '- NUNCA inclua calorias e macros de cada refeição, apenas as refeições.',
    '- Evite alimentos ultraprocessados.',
    '- Não responda em JSON ou outro formato, apenas texto markdown legível para humanos.',
    '- Não inclua dicas como: bom consultar um nutricionista para um acompanhamento mais personalizado.'
].join("\n")
}

export function buildUserPrompt(input: DietPlanRequest){
    return [
    "Gere um plano alimentar personalizado com base nos dados:",
    "- Nome: ${input.nome}",
    "- Idade: ${input.idade}",
    "- Altura em cm: ${input.altura_cm}",
    "- Peso em kg: ${input.peso_kg}",
    "- Sexo: ${input.sexo}",
    "- Nível de atividade: ${input.nivel_atividade}",
    "- Objetivo: ${input.objetivo}"
].join("\n")
}

export function buildDocsSystemPrompt(docs: string){
    return 'Documento técnico para ajudar na geração do plano de dieta: ${doc}';
}