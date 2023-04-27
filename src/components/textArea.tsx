
import {
    FormControl,
    FormErrorMessage,
    TextareaProps,
    
    Textarea,
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'
  import {useController } from "react-hook-form";

interface inputMainProps extends TextareaProps{
  messageError?:string;
  isError?:boolean;
  useControl:any;
  name:string;
}  

export function TextAreaMain({name, messageError,useControl, isError, ...rest }:inputMainProps){

  const { field, fieldState } = useController(
    {
      name:name,
      control:useControl,
      rules: { required: true }
    });


    return( <FormControl isInvalid={fieldState.invalid}  display={'flex'} justifyContent={'center'} flexDirection={'column'} >
        
          <Textarea 
            {...field}
            border={'none'}
            _focus={{
              border:'3px solid',
              borderColor:'primary',
              outline:'none',
              boxShadow:'none'
            }}
            _invalid={{
              border:'2px solid',
              borderColor:'danger',
              // outline:'none',
              // boxShadow:'none'
            }}
            bg={'secondaryLight'} 
          {...rest}/>
          <FormErrorMessage fontWeight={800} >{fieldState?.error?.message}</FormErrorMessage>
      </FormControl>)
   
} 