
import {
    FormControl,
    FormErrorMessage,
    TextareaProps,
    
    Textarea,
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'

interface inputMainProps extends TextareaProps{
  name:string;
  messageError?:string;
  isError?:boolean;
}  

export function TextAreaMain({name, messageError, isError, ...rest }:inputMainProps){
    return <FormControl isInvalid={isError} display={'flex'} justifyContent={'center'} >
        
          <Textarea 
            placeholder={name}
            _focus={{
              border:'2px solid',
              borderColor:'primary'
            }} 
          {...rest}/>
          <FormErrorMessage>{messageError}</FormErrorMessage>
      </FormControl>
   
} 