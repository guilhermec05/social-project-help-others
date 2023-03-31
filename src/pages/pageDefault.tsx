import { Box, Text } from "@chakra-ui/react";


interface PageDefaultPorps{
    text:string
}

export function PageDefault({text}:PageDefaultPorps){
    return( <Box 
        display={'flex'}
        justifyContent={'center'}
        alignItems={'center'}
        h={'100vh'}
    >
        <Text fontSize={'h4'} fontWeight={700}>{text}</Text>
    </Box>)
}