import { Box, Button, Checkbox, CheckboxGroup, Flex, Text, useToast } from "@chakra-ui/react";
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
import { useValidationsBR } from 'validations-br';
import { checkBoxProps, InputCheckBox } from "../components/inputCheckBox";
import { useAuth } from "../hooks/useAuth";


interface localidade{
    bairro:string;
    localidade:string;
    logradouro:string;
    uf:string;
}

export function SignUpUserHomeless(){

    const   listBox:checkBoxProps[] = [
        {value:'1', label:'Cobertor'},
        {value:'2', label:'Comida'},
        {value:'3', label:'Desodorante'},
        {value:'4', label:'Sabonete'}
    ]


    const toast = useToast()
    
    
    const [load, setLoad] = useState<boolean>(false)
    const [select,setSelect ] = useState<optionProps[]>([] as optionProps[])
    const [checkBox, setCheckBox] = useState<checkBoxProps[]>(listBox)
    const [localidades,setLocalidades ] = useState<localidade>({} as localidade)
    const [files, setFiles] = useState(null)
    const {user} = useAuth()
    
    const schema = yup.object({
        title: yup.string()
        .min(10,"o campo deve conter pelo ou menos 10 caracteres")
        .required("o campo não deve estar vazio"),
        nickname: yup.string().min(3,"o campo deve conter pelo ou menos 3 caracteres").
        required("o campo não deve estar vazio"),
        number: yup.string().required("o campo não deve estar vazio"),
        city:yup.string()
        .min(5,"o campo deve conter pelo ou menos 5 caracteres")
        .required("o campo não deve estar vazio"),
        district:yup.string()
        .min(5,"o campo deve conter pelo ou menos 5 caracteres")
        .required("o campo não deve estar vazio"),
        // reference:yup.string()
        // .min(10,"o campo deve conter pelo ou menos 10 caracteres"),
        street:yup.string()
        .min(10,"o campo deve conter pelo ou menos 10 caracteres")
        .required("o campo não deve estar vazio"),
        cep:yup.string().required("o campo não deve estar vazio").test("cep","cep não é valido",(value) => useValidationsBR('cep',value) ),
        uf:yup.string().required("o campo não deve estar vazio"),
        description:yup.string().required("o campo não deve estar vazio").min(20, "A descrição deve conter pelo ou menos 20 caracteres"),
        reference:yup.string(),
        checks: yup.array().min(1,"você deve selecionar um").required("você deve selecionar um").typeError("você deve selecionar um"),
        file:yup.string().required("o campo não deve estar vazio")
      });

    

    type FormData = yup.InferType<typeof schema>

  
    const { handleSubmit,control,setValue,clearErrors,register ,formState:{errors}} = useForm<FormData>({
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

            setValue("district",bairro)
            clearErrors("district")
            setValue("street",logradouro)
            clearErrors("street")
            setValue("city",localidade)
            clearErrors("city")
            setValue("uf",uf)
            clearErrors("uf")
            clearErrors("number")
          
          
           
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

    async function onSubmit(data: FormData){

        

   
        const adress = {
          
            cep:data.cep,
            state:data.uf,
            city:data.city,
            street:data.street,
            district:data.district,
            number:data.number,
            description:data.reference
        }


        const donate =  {
            'title':data.title,
            'description':data.description,
            'nickname':data.nickname,
            'location':adress,
            'items':items,
            'file':files,
            type:"D",
            user_id:user.id
        }

        try {
           
            await api.post('donates/save_new_donates',donate ,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                  },
            }  )
            
            toast({
                title:'Cadastrado com sucesso',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position:'top-right',
                
            })
            setValue("cep","")
            setValue("title","")
            setValue("city","")
            setValue("description","")
            setValue("district","")
            setValue("file","")
            setValue("street","")
            setValue("number","")
            setValue("nickname","")
            setValue("reference","")
            setValue("checks",[])

        
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
                    <TextAreaMain name={"description"} placeholder="Descrição" h={'100px'}  useControl={control} />
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
                    name="cep"
                    useControl={control}
                    placeholder="Cep" 
                    type={'number'} 
                    onChange={v => foundCep(v.target.value)} 
                />
                
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain 
                        name="city"  
                        placeholder="Cidade" 
                        widthForm={'70%'} 
                        useControl={control} 
                    /> 

                    <SelectMain text="UF" 
                        name="uf"
                        option={select}  
                        widthForm={'25%'}
                        useControl={control}
                    />
                </Flex>
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    
                    <InputMain placeholder="Rua" widthForm={'70%'}
                    name="street"  
                    useControl={control}/> 
                    
                    <InputMain placeholder="Nº" widthForm={'25%'} 
                    name="number"  
                    useControl={control}/>
                </Flex>
                    <InputMain placeholder="Bairro"
                        name="district"  
                        useControl={control}
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
                    <InputFile name="file" placeholderImg="escolha sua imagem ..." useControl={control} setFiles={setFiles}/>
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
                        <InputCheckBox 
                                error={errors}
                                name={'checks'}
                                listCheckBox={checkBox}
                                useControl={register("checks")}    
                                hasOthers
                                setCheckBox={setCheckBox}
                        />                       
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