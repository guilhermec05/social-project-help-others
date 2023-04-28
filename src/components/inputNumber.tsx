import { FormControl, FormErrorMessage, NumberInput, NumberInputField, NumberInputFieldProps } from "@chakra-ui/react";
import { useController } from "react-hook-form";


interface InputNumberProps extends NumberInputFieldProps{
   
    widthForm?:string
    isError?:boolean;
    maxW?:string
    useControl:any;
    name:string;
  }  


export function InputNumber({name, isError,widthForm,maxW,useControl, ...rest }:InputNumberProps){
    
  const { field, fieldState } = useController(
    {
      name:name,
      control:useControl,
      rules: { required: true }
    });


  
    return(
        <FormControl isInvalid={fieldState.invalid} flexDirection={'column'}    alignItems={'center'} justifyContent={'center'}  display={'flex'} width={widthForm} >
        <NumberInput
            w={'100%'} 
            maxW={maxW}           
            min={1}
            max={999999999}
            {...field}
            keepWithinRange={false}
            clampValueOnBlur={false}
            display={'flex'}
            alignItems={'center'} justifyContent={'center'} 
           
        >
            <NumberInputField 
                
              
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
                {...rest} 
            />
        </NumberInput>
        <FormErrorMessage fontWeight={800} >{fieldState?.error?.message}</FormErrorMessage>
      </FormControl>
    )
}