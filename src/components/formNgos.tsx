import { InputMain } from "./input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useValidationsBR } from "validations-br";
import { InputNumber } from "./inputNumber";
import { Flex } from "@chakra-ui/react";
import { ButtonMain } from "./button";



export function FormNgos(){

    const schema = yup.object({
        name: yup.string().required("o campo não deve estar vazio"),
        email: yup.string().required("o campo não deve estar vazio").email("o campo deve ser um tipo email"),
     
        cnpj:yup.string().required("o campo não deve estar vazio").test("cnpj","cnpj não é valido",(value) => useValidationsBR('cnpj',value) ),
        new_pass: yup.string().required("o campo não deve estar vazio"),
        confirm_pass: yup.string().oneOf([yup.ref('new_pass'), null], 'a senha deve ser iguais').required("o campo não deve estar vazio")
      });
    
    
      
    type FormData = yup.InferType<typeof schema>
    
    
    const { handleSubmit,control } = useForm<FormData>({
        resolver: yupResolver(schema)
      });
    
    
    function onSubmit(data: FormData){
        // alert(submit)
         console.log(data )
        // navigate('/home')
        
    }


    
    return<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection={'column'} mb={5}  gap={5}> 
            
                <InputMain placeholder="Razão Social" name="name" useControl={control} w={'450px'} h={'50px'}/>
                <InputNumber placeholder="CNPJ(apenas os números)" name="cnpj" useControl={control} w={'450px'} h={'50px'}/>
                <InputMain placeholder="Email" name="email" useControl={control} w={'450px'} h={'50px'} />
                <InputMain placeholder="Senha" name="new_pass" useControl={control} w={'450px'} h={'50px'} type={'password'}/>
                <InputMain placeholder="Confirme Senha" name="confirm_pass" useControl={control} w={'450px'} h={'50px'} type={'password'}/>
            </Flex>
            <Flex justifyContent={'center'}>
                    <ButtonMain title="Cadastrar" type="submit"  p={'30px'}/>
                </Flex> 
        </form>
        
    </>
}