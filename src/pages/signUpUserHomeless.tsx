import { Box, Button, Checkbox, CheckboxGroup, Flex, Text } from "@chakra-ui/react";
import { Back } from "../components/back";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { InputMain } from "../components/input";
import { Loading } from "../components/loading";
import { TextAreaMain } from "../components/textArea";
import { ButtonMain } from './../components/button';
import { InputFile } from './../components/inputFile';
import { useState, useEffect, useCallback } from 'react';
import { optionProps, SelectMain } from './../components/select';
import { api } from "../services/api/axios";
import { InputNumber } from "../components/inputNumber";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";


interface localidade{
    bairro:string;
    localidade:string;
    logradouro:string;
    uf:string;
}

export function SignUpUserHomeless(){
    
    const [load, setLoad] = useState<boolean>(false)
    const [select,setSelect ] = useState<optionProps[]>([] as optionProps[])
    const [localidades,setLocalidades ] = useState<localidade>({} as localidade)


    
    const schema = yup.object({
        title: yup.string()
        .min(10,"o campo deve conter pelo ou menos 10 caracteres")
        .required("o campo não deve estar vazio"),
        nickname: yup.string().min(10,"o campo deve conter pelo ou menos 3 caracteres").
        required("o campo não deve estar vazio"),
        number: yup.string().required("o campo não deve estar vazio"),
        city:yup.string()
        .min(5,"o campo deve conter pelo ou menos 5 caracteres")
        .required("o campo não deve estar vazio"),
        district:yup.string()
        .min(8,"o campo deve conter pelo ou menos 8 caracteres")
        .required("o campo não deve estar vazio"),
        reference:yup.string()
        .min(10,"o campo deve conter pelo ou menos 10 caracteres")
        .required("o campo não deve estar vazio")
      });



    type FormData = yup.InferType<typeof schema>

  
    const { handleSubmit,control } = useForm<FormData>({
        resolver: yupResolver(schema)
      });
    
    // const [cep,setCep ] = useState<string>('')
    
    async function foundCep(cep:string){

        if(cep.length != 8) return 

        try{
            setLoad(true)
            const {data} = await api.get(`http://viacep.com.br/ws/${cep}/json/`)
            const {bairro , localidade, logradouro, uf} = data
            const obj = {bairro , localidade, logradouro, uf}
            console.log(obj)
            await setLocalidades(obj)
           
        }catch(error){

        }finally{
            await setLoad(false)
        }
    }

    async function fetchUF(){
        try{
            setLoad(true)
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
            await setLoad(false)
        }
    } 

    function onSubmit(data: FormData){
        // alert(submit)
         console.log(data )
        // navigate('/home')
        
    }
    
    useEffect(()=>{
        fetchUF()
    },[])


    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
        // justifyContent={'center'} 
        // alignItems={'center'}
     >
        {load &&<Loading/>}
        <form  onSubmit={handleSubmit(onSubmit)} >
        <Header />
        <Back link="/Home" /> 
        <Box 
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={10}
            px={'20px'}
        >
            <Flex maxW={'500px'}>
                <Text fontSize={'h4'}>Cadastro de Pessoa em Situação de Rua</Text>
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}
                // border={'1px solid red'}
            >
                 
                    <InputMain placeholder="Titulo da Postagem"  name="title"  useControl={control}/>
                    <TextAreaMain  placeholder="Descrição" name="description" h={'100px'}  />
                    <InputMain placeholder="Nome ou Apelido"  name="nickname"  useControl={control} />
                 
            </Flex>
            
           

            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}
            >
                <Flex maxW={'500px'}>
                    <Text fontSize={'h5'} color={'dark_light'}>Onde pode ser encontrado</Text>   
                </Flex>

                <InputNumber 
                    placeholder="Cep" 
                    type={'number'} 
                    onChange={v => foundCep(v.target.value)} 

                />
                
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain placeholder="Cidade" 
                    widthForm={'70%'} 
                    value={localidades.localidade} 
                    name="city"  
                    useControl={control}
                    onChange={v => setLocalidades({...localidades, localidade:v.target.value })} /> 

                    <SelectMain text="UF" 
                    option={select}  
                    widthForm={'25%'}
                    value={localidades.uf} 
                    name="title" 
                    onChange={v => setLocalidades({...localidades, uf:v.target.value })}
                    />
                </Flex>
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain placeholder="Rua" widthForm={'70%'}
                    value={localidades.logradouro}
                    name="title"  useControl={control}
                    onChange={v => setLocalidades({...localidades, logradouro:v.target.value })}
                    
                    /> 
                    <InputMain placeholder="Nº" widthForm={'25%'} 
                    name="number"  
                    useControl={control}/>
                </Flex>
                    <InputMain placeholder="Bairro"
                        value={localidades.bairro}
                        name="district"  
                        useControl={control}
                        onChange={v => setLocalidades({...localidades, bairro:v.target.value })}
                    />
                    <InputMain 
                    placeholder="Ponto de Referencia" 
                    name="reference"  
                    useControl={control} />
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}>
                    <Flex maxW={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Foto(s) do Local e/ou Pessoa</Text>   
                    </Flex>
                    <InputFile name="images" placeholder="images"/>
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'} 
                w={'100%'}>
                    <Flex maxW={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Item Necessitados</Text>   
                    </Flex>
                    <Flex gap={5} flexWrap={'wrap'}>
                    <CheckboxGroup colorScheme='green' >
                        <Checkbox>Cobertor</Checkbox>
                        <Checkbox>Comida</Checkbox>
                        <Checkbox>Desodorante</Checkbox>
                        <Checkbox>Sabonete</Checkbox>
                    </CheckboxGroup>

                        
                    </Flex>
            </Flex>
            <Flex maxW={'500px'}>
                <ButtonMain title="Cadastrar" w={'100%'} type={'submit'}  />
            </Flex>
        </Box>
        <Footer />     

        </form>
          
    </Flex>
    )
}