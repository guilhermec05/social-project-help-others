import { Box, Text } from "@chakra-ui/react";
import { Logo } from "./logo";

export function Footer(){
    return( <Box
                p={'20px'}
               
            >
        <Box border={'1px solid'} borderColor={'dark_light'} opacity={'0.2'}/>
            <Box    
                    height={'120px'}
                    width={'100%'}
                    display={'flex'}
                    alignItems={'center'}
                    justifyContent={'center'}
                    flexDirection={'column'}
                    gap={5}
                >
                        
                    <Logo height={'50px'}/>
                <Text color={'dark_light'} fontSize={'small'}>© 2023 PSAP - Projeto Social Ajude o Próximo.  Todos os Direitos Reservados.</Text>
            </Box>
    </Box>)
}