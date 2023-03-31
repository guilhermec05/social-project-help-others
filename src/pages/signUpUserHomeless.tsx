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
// import { useEffect } from 'react';
import { optionProps, SelectMain } from './../components/select';
import { api } from "../services/api/axios";
import { InputNumber } from "../components/inputNumber";


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
        <Header />
        <Back link="/home"  px={20} /> 
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
                 
                    <InputMain name="Titulo da Postagem"  />
                    <TextAreaMain name="Descrição"  h={'100px'}  />
                    <InputMain name="Nome ou Apelido" />
                 
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
                <InputNumber name="Cep" type={'number'} min={'00000000'} onChange={v => foundCep(v.target.value)} />
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain name="Cidade" widthForm={'70%'} 
                    value={localidades.localidade} 
                    onChange={v => setLocalidades({...localidades, localidade:v.target.value })} /> 

                    <SelectMain text="UF" 
                    option={select}  
                    widthForm={'25%'}
                    color={'dark_light'}
                    bgColor={'secondaryLight'}
                    value={localidades.uf} 
                    onChange={v => setLocalidades({...localidades, uf:v.target.value })}
                    />
                </Flex>
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain name="Rua" widthForm={'70%'}
                    value={localidades.logradouro}
                    onChange={v => setLocalidades({...localidades, logradouro:v.target.value })}
                    
                    /> <InputMain name="Nº" widthForm={'25%'}/>
                </Flex>
                <InputMain name="Bairro"
                    value={localidades.bairro}
                    onChange={v => setLocalidades({...localidades, bairro:v.target.value })}
                />
                <InputMain name="Ponto de Referencia" />
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}>
                    <Flex maxW={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Foto do Local ou da Pessoa</Text>   
                    </Flex>
                    <InputFile name="images"/>
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
                <ButtonMain title="Cadastrar" w={'100%'} />
            </Flex>
        </Box>
        <Footer />       
    </Flex>
    )
}