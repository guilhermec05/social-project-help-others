
import {
    FormControl,
    Input ,
    FormErrorMessage,
    InputProps
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'

import {useController } from "react-hook-form";

interface inputMainProps extends InputProps{
  widthForm?:string
  messageError?:string;
  isError?:boolean;
  useControl:any;
  name:string;
}  

export function InputMain({name, messageError, isError,widthForm,useControl, ...rest }:inputMainProps){



    const { field, fieldState } = useController(
      {
        name:name,
        control:useControl,
        rules: { required: true }
      });



    return( 
      <FormControl 
        
        isInvalid={fieldState.invalid} 
        display={'flex'} 
        justifyContent={'center'} 
        alignItems={'center'} 
        flexDirection={'column'} 
        width={widthForm} >  
          <Input 
            border={'none'}
            
            {...field}
            // onFocus={{border:'1px sild'}}
            // focusBorderColor={'primary'}
            _invalid={{
              border:'2px solid',
              borderColor:'danger',
              // outline:'none',
              // boxShadow:'none'
            }}
            _focus={{
              border:'3px solid',
              borderColor:'primary',
              outline:'none',
              boxShadow:'none'
            }}
        
            bg={'secondaryLight'} 
          {...rest}/>
          <FormErrorMessage fontWeight={800} >{fieldState?.error?.message}</FormErrorMessage>
      </FormControl>)
   
} 