import { Box, Flex } from "@chakra-ui/react";
// import { CardHomerless } from "../components/cardHomeless";
import { Back } from './../components/back';
import { Header } from './../components/header';
import { Footer } from './../components/footer';



export function Login(){
    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
     >
        <Header />
        <Footer />
         
    </Flex>
    )
}