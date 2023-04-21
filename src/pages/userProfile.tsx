import { Box, Flex, Text } from "@chakra-ui/react";
import { Footer } from "../components/footer";
import { Header, HeaderProps } from "../components/header";
import { InputMain } from "../components/input";
import { ButtonMain } from '../components/button';




export function UserPropfile({hasAdm = false}:HeaderProps){
    

    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
        // justifyContent={'center'} 
        // alignItems={'center'}
     >
        <Header  hasAdm={hasAdm}/>
        <Box 
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            flexDirection={'column'}
            gap={10}
            px={'20px'}
            h={'60vh'}
        >
            <Flex maxW={'500px'}>
                <Text fontSize={'h4'}>Atualizar seus dados</Text>
            </Flex>
            <Flex 
                flexDirection={'column'}
                gap={5}
                maxW={'500px'}
                w={'100%'}
            >
                 
                    <InputMain name="Senha Atual" type={'password'} />
                    <InputMain name="Nova Senha" type={'password'} />
                    <InputMain name="Confirma Senha" type={'password'} />

                 
            </Flex>
            <Flex maxW={'500px'}>
                <ButtonMain title="Atualizar" w={'100%'} />
            </Flex>
        </Box>
        <Footer />       
    </Flex>
    )
}