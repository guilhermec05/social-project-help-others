import { Box, Button, Checkbox, Flex, Text } from "@chakra-ui/react";
import { Back } from "../components/back";
import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { InputMain } from "../components/input";
import { TextAreaMain } from "../components/textArea";
import { ButtonMain } from './../components/button';
// import { SelectMain } from './../components/select';



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
                <InputMain name="Cep" />
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain name="Cidade" widthForm={'70%'}  /> <InputMain name="UF" widthForm={'20%'}/>
                </Flex>
                <Flex  maxW={'500px'} w={'100%'}  justifyContent={'space-between'}>
                    <InputMain name="Rua" widthForm={'70%'}  /> <InputMain name="Nº" widthForm={'20%'}/>
                </Flex>
                <InputMain name="Bairro" />
                <InputMain name="Ponto de Referencia" />
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}>
                    <Flex maxW={'500px'}>
                        <Text fontSize={'h5'} color={'dark_light'}>Foto(s) do Local e/ou Pessoa</Text>   
                    </Flex>
                    <InputMain name="Bairro" w={'100%'} type={'file'} border={'none'}/>
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
                        <Checkbox>Cobertor</Checkbox>
                        <Checkbox>Comida</Checkbox>
                        <Checkbox>Desodorante</Checkbox>
                        <Checkbox>Sabonete</Checkbox>
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