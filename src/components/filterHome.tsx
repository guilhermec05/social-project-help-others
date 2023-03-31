import { Select } from '@chakra-ui/react'
import { Box, Flex } from "@chakra-ui/react";

export function FilterHome() {
  return( 
          <Box
          display={'flex'}
          flexDirection={'row'}
          justifyContent={'end'}      
          >
            <Select placeholder={'Selecione'} size={'sm'} w={'190px'} h={'45px'}>
              <option value={'option1'}>Todos</option>
              <option value={'option2'}>Pessoas</option>
              <option value={'option3'}>ONGS</option>
            </Select>
          </Box>
  )
}