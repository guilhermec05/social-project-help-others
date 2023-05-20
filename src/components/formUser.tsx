import { InputMain } from "./input";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useValidationsBR } from "validations-br";
import { InputNumber } from "./inputNumber";
import { Flex, useToast } from "@chakra-ui/react";
import { ButtonMain } from "./button";
import { optionProps, SelectMain } from "./select";
import { useEffect,useState } from "react";
import { api } from "../services/api/axios";
import { useNavigate } from "react-router-dom";

export function FormUser(){
    
    const toast = useToast()
    const navigate = useNavigate();

    const [select,setSelect ] = useState<optionProps[]>([] as optionProps[])
    const [selectCity,setSelectCity ] = useState<optionProps[]>([] as optionProps[])

    const schema = yup.object({
        name: yup.string().required("o campo não deve estar vazio"),
        last_name: yup.string().required("o campo não deve estar vazio"),
        email: yup.string().required("o campo não deve estar vazio").email("o campo deve ser um tipo email"),
        cpf:yup.string().required("o campo não deve estar vazio").test("cpf","cpf não é valido",(value) => useValidationsBR('cpf',value) ),
        new_pass: yup.string().required("o campo não deve estar vazio"),
        confirm_pass: yup.string().oneOf([yup.ref('new_pass'), null], 'a senha deve ser iguais').required("o campo não deve estar vazio"),
        uf:yup.string().required("o campo não deve estar vazio"),
        city:yup.string().required("o campo não deve estar vazio")
      });
    
    
      
    type FormData = yup.InferType<typeof schema>
    
    
    const { handleSubmit,control, setValue, clearErrors } = useForm<FormData>({
        resolver: yupResolver(schema)
      });
    

      async function fetchUF(){
        try{
            // setLoad(true)
            setSelect([])
            const {data} = await api.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados')
            data.forEach((value)=>{
                const {sigla} = value
                select.push({label:sigla,value:sigla})
            })
            await setSelect(select)
            // console.log(select)
        }catch(error){

        }finally{
            // await setLoad(false)
        }
    } 
    
    useEffect(()=>{
        fetchUF()
    },[])


    async function SelectCities(state:string){
        try{
            // setLoad(true)
            setValue("uf",state)
            clearErrors("uf")
            setSelectCity([])
            const {data} = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${state}/municipios`)

            data.forEach((value)=>{
                console.log(value)
                const {nome} = value
                selectCity.push({label:nome,value:nome})
            })
            await setSelectCity(selectCity)
            // console.log(select)
        }catch(error){

        }finally{
            // await setLoad(false)
        }
    }

    async function onSubmit(data: FormData){
         
        const submit = {
            name:data.name,
            last_name:data.last_name,
            email:data.email,
            cpf:data.cpf,
            pass:data.new_pass,
            adress:{
                city:data.city,
                state_or_provice:data.uf
            }
        }
        try {
            const user =  await api.post('/user/persons/signup',submit).then(res=> res.data)
            
            toast({
                title:'Cadastrado com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })

            navigate('/')
            
         } catch (error) {
             toast({
                title: error?.response.data.message,
                status: 'error',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
         }
    }

    return<>
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex flexDirection={'column'} alignItems={'center'} mb={5} gap={5}> 
                <InputMain placeholder="Nome" name="name" useControl={control}  maxWidth={'450px'} h={'50px'}/>
                <InputMain placeholder="Sobrenome" name="last_name" useControl={control}  maxWidth={'450px'} h={'50px'}/>
                <InputMain placeholder="Email"  name="email" useControl={control} maxWidth={'450px'} h={'50px'} type={'email'}/>
                <InputNumber placeholder="CPF(apenas os números)" name="cpf" useControl={control} maxWidth={'450px'} h={'50px'}/>
                <Flex maxWidth={'450px'} w={'100%'} justifyContent={'space-between'} gap={4}>
              
                        <SelectMain 
                                text="UF" 
                                name="uf"
                                option={select}  
                                useControl={control}
                                onChange={e => SelectCities(e.target.value)}
                                widthForm={'100px'}
                                
                                // border={'1px solid red'}
                                h={'50px'}
                            />

                        <SelectMain 
                                text="Selecione a cidade" 
                                name="city"
                                option={selectCity}  
                                useControl={control}
                                maxW={'450px'}
                                h={'50px'}
                                
                                
                                // w={20}
                            />  
                
                </Flex>
                <InputMain placeholder="Senha"  name="new_pass" useControl={control}  maxWidth={'450px'} h={'50px'} type={'password'}/>
                <InputMain placeholder="Confirme Senha"  name="confirm_pass" useControl={control} maxWidth={'450px'} h={'50px'} type={'password'}/>

            </Flex>
            <Flex justifyContent={'center'}>
                <ButtonMain title="Cadastrar" type="submit"  p={'30px'}/>
            </Flex> 
          
        </form>
     
    </>
}