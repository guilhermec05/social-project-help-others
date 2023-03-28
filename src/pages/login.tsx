import { Box, Flex } from "@chakra-ui/react";
// import { CardHomerless } from "../components/cardHomeless";
import { Back } from './../components/back';
import { Header } from './../components/header';



export function Login(){
    return(
    <Flex  
        display={'flex'} 
        flexDirection={'column'}
     >
        <Header />
        <Back  />
        <Box  
            border={'1px solid red'}
            display={'flex'}
            flexWrap={'wrap'}
            p={10}
            justifyContent={'flex-start'}
            gap={10}
        >

                

            </Box>
         
    </Flex>
    )
}