import { InputMain } from "./input";

export function FormNgos(){
    return<>
        <InputMain name="Razão Social" w={'450px'} h={'50px'}/>
        <InputMain name="CNPJ" w={'450px'} h={'50px'}/>
        <InputMain name="Email" w={'450px'} h={'50px'} type={'email'}/>
        <InputMain name="Senha" w={'450px'} h={'50px'} type={'password'}/>
        <InputMain name="Confirme Senha" w={'450px'} h={'50px'} type={'password'}/>
    </>
}