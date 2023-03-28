
import {
    FormControl,
    Input ,
    FormErrorMessage,
    InputProps,
    border,
    Box
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'

interface inputMainProps extends InputProps{
  name:string;
  messageError?:string;
  isError?:boolean;
}  

export function InputMain({name, messageError, isError, ...rest }:inputMainProps){
    return <FormControl isInvalid={isError} display={'flex'} justifyContent={'center'} >
        
          <Input 
            placeholder={name}
            _focus={{
              border:'2px solid',
              borderColor:'primary'
            }} 
          {...rest}/>
          <FormErrorMessage>{messageError}</FormErrorMessage>
      </FormControl>
   
} 