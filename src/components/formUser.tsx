import { InputMain } from "./input";

export function FormUser(){
    return<>
        <InputMain name="Nome" w={'450px'} h={'50px'}/>
        <InputMain name="Sobrenome" w={'450px'} h={'50px'}/>
        <InputMain name="Email" w={'450px'} h={'50px'} type={'email'}/>
        <InputMain name="Senha" w={'450px'} h={'50px'} type={'password'}/>
        <InputMain name="Confirme Senha" w={'450px'} h={'50px'} type={'password'}/>
    </>
}