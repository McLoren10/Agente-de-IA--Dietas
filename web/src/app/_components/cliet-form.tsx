"use client";

import { z } from "zod";
import { Card } from '@/components/ui/card';
import { Utensils } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { Button } from "@/components/ui/button";  


const DietSchema = z.object({
    nome: z.string().min(2, "O nome é obrigatório"),
    idade: z.number().int().positive(),
    altura_cm: z.number().positive(),
    peso_kg: z.number().positive(),
    sexo: z.enum(["masculino", "feminino"], { error: "Selecione o sexo"}),
    nivel_atividade: z.enum(["sedentario", "2x_semana", "4x_semana"], { error: "Selecione o nivel da atividade"}),
    objetivo: z.enum(["perda_peso", "ganho_muscular", "manutencao"], { error: "Selecione o objetivo"}),
    intolerancias: z.array(z.string()).optional(),
    restricoes_alimentares: z.array(z.string()).optional(),
});

type DietSchemaFormData = z.infer<typeof DietSchema>;

interface DietFormProps {
    onSubmit: (data: DietSchemaFormData) => void;
}


export function DietForm({ onSubmit }: DietFormProps){
    
    const form = useForm<DietSchemaFormData>({
        resolver: zodResolver(DietSchema),
        defaultValues: {
            nome: "",
            idade: undefined,
            altura_cm: undefined,
            peso_kg: undefined,
            sexo: undefined,
            nivel_atividade: undefined,
            objetivo: undefined,
            intolerancias: [],
            restricoes_alimentares: [],
        }
    })
    
    return (
        <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl border-0">

            <div className="p-8">

                <div className="text-center mb-8">
                    <div className="flex items-center justify-center mb-4 mx-auto">
                        <Utensils className="w-14 h-14 text-green-500" />
                    </div>
                    <h1 className="text-3xl font-bold mb-2">Gerador de Dieta Personalizada</h1>
                    <p className="text-gray-600">Preencha o formulário abaixo para receber uma dieta personalizada.</p>
                </div>

                <Form {...form}>
                <form 
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="space-y-4">
                        <h3 className="text-lg font-semibold text-gray-900 flex-items-center">Dados pessoais</h3>
                    </div>


                    {/*Campos Nome e Idade*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <FormField
                            control={form.control}
                            name="nome"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nome</FormLabel>
                                    <FormControl>
                                        <Input
                                            { ...field }
                                            placeholder="Digite seu nome"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="idade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Idade</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            { ...form.register("idade", { setValueAs: (v) => v === "" ? undefined : Number(v), }) }
                                            placeholder="Ex: 25"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                    </div>


                    {/*Campos Sexo, Peso e Altura*/}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        
                        <FormField
                            control={form.control}
                            name="peso_kg"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Peso em kg</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            { ...form.register("peso_kg", { setValueAs: (v) => v === "" ? undefined : parseFloat(v), }) }
                                            placeholder="Ex: 70.5"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="altura_cm"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Altura em cm</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            step="any"
                                            { ...form.register("altura_cm", { setValueAs: (v) => v === "" ? undefined : parseFloat(v), }) }
                                            placeholder="Ex: 170"
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="sexo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Sexo</FormLabel>
                                    <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o sexo" />
                                            </SelectTrigger>
                                        </FormControl>

                                    <SelectContent>
                                        <SelectItem value="masculino">Masculino</SelectItem>
                                        <SelectItem value="feminino">Feminino</SelectItem>
                                    </SelectContent>


                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    {/*Campos Atividade e Nível*/}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        <FormField
                            control={form.control}
                            name="nivel_atividade"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nível de atividade</FormLabel>
                                    <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o nível de atividade" />
                                            </SelectTrigger>
                                        </FormControl>

                                    <SelectContent>
                                        <SelectItem value="sedentario">Sedentario</SelectItem>
                                        <SelectItem value="2x_semana">2x por Semana</SelectItem>
                                        <SelectItem value="4x_semana">4x por Semana</SelectItem>
                                    </SelectContent>


                                    </Select>
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="objetivo"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Objetivo</FormLabel>
                                    <Select
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue placeholder="Selecione o seu objetivo" />
                                            </SelectTrigger>
                                        </FormControl>

                                    <SelectContent>
                                        <SelectItem value="perda_peso">Perda de peso</SelectItem>
                                        <SelectItem value="ganho_muscular">Ganho Muscular</SelectItem>
                                        <SelectItem value="manutencao">Manutenção</SelectItem>
                                    </SelectContent>


                                    </Select>
                                </FormItem>
                            )}
                        />
                    </div>

                    <Button className="w-full mt-4 hover:opacity-90 cursor-pointer">
                        Gerar minha dieta 
                    </Button>

                </form>
            </Form>

            </div>
        </Card>
        </div>
    );
}

