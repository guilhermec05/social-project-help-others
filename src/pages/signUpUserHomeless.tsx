import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { Back } from "../components/back";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { InputMain } from "../components/input";
import { TextAreaMain } from "../components/textArea";
import { ButtonMain } from './../components/button';



export function SignUpUserHomeless(){
    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
        // justifyContent={'center'} 
        // alignItems={'center'}
     >
        <Header />
        <Back link="/Home" /> 
        <Box 
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={10}
            px={'50px'}
        >
            <Text fontSize={'h4'}>Cadastro de Pessoa em Situação de Rua</Text>
            <Flex 
                flexDirection={'column'}
                gap={5}
            >
                <InputMain name="Titulo da Postagem" w={'500px'}/>
                <TextAreaMain name="Descrição" w={'500px'} h={'100px'}  />
                <InputMain name="Nome ou Apelido" w={'500px'}/>
            </Flex>
            
           

            <Flex 
                flexDirection={'column'}
                gap={5}
                w={'500px'}
            >
                <Flex w={'500px'}>
                    <Text fontSize={'h5'} color={'dark_light'}>Onde pode ser encontrado</Text>   
                </Flex>
                <InputMain name="Cep" w={'500px'}/>
                <Flex>
                    <InputMain name="Cidade" w={'400px'}/> <InputMain name="UF" w={'75px'}/>
                </Flex>
                <Flex>
                    <InputMain name="Rua" w={'400px'}/> <InputMain name="Nº" w={'75px'}/>
                </Flex>
                <InputMain name="Bairro" w={'500px'}/>
                <InputMain name="Ponto de Referencia" w={'500px'}/>
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                w={'500px'}>
                    <Flex w={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Foto(s) do Local e/ou Pessoa</Text>   
                    </Flex>
                    <InputMain name="Bairro" w={'500px'} type={'file'} border={'none'}/>
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                w={'500px'}>
                    <Flex w={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Item necessitados</Text>   
                    </Flex>
                    <Flex gap={5}>
                        <Checkbox>Cobertor</Checkbox>
                        <Checkbox>Comida</Checkbox>
                        <Checkbox>Desodorante</Checkbox>
                        <Checkbox>Sabonete</Checkbox>
                    </Flex>
            </Flex>
        </Box>
        <Footer />       
    </Flex>
    )
}