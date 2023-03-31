
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
  widthForm?:string
  messageError?:string;
  isError?:boolean;
}  

export function InputMain({name, messageError, isError,widthForm, ...rest }:inputMainProps){
    return( <FormControl isInvalid={isError} display={'flex'} justifyContent={'center'} width={widthForm} >
        
          <Input 
            placeholder={name}
            border={'none'}
            // onFocus={{border:'1px sild'}}
            // focusBorderColor={'primary'}
            _focus={{
              border:'3px solid',
              borderColor:'primary',
              outline:'none',
              boxShadow:'none'
            }}
            bg={'secondaryLight'} 
          {...rest}/>
          <FormErrorMessage>{messageError}</FormErrorMessage>
      </FormControl>)
   
} 