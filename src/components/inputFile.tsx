
import {
    FormControl,
    Input ,
    FormErrorMessage,
    InputProps,
    border,
    Box,
    InputGroup,
    InputLeftElement,
    Icon
    // FormLabel,
    // FormHelperText,
  } from '@chakra-ui/react'
  import { CiImageOn } from "react-icons/ci";
  import { useRef } from "react"
import { useController,useForm } from 'react-hook-form';

interface inputMainProps extends InputProps{
  name:string;
  widthForm?:string
  messageError?:string;
  isError?:boolean;
  placeholderImg?:string;
  useControl:any;
}  

export function InputFile({name, messageError,useControl, isError,widthForm,placeholderImg, ...rest }:inputMainProps){
    const inputRef = useRef();
   
    const {
        field: { ref, value, ...inputProps },
        fieldState: { invalid, isTouched, isDirty,error },
      } = useController({
        name,
        control:useControl
      });


    return (<FormControl isInvalid={invalid} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={widthForm} >
          <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<Icon as={CiImageOn} fontSize={'h4'}/>}
                />
                 <input type='file' accept={'image/*'}  ref={inputRef} {...inputProps} style={{ display: 'none' }}></input>
                 <Input
                      placeholder={placeholderImg || "seu arquivo ..."}
                      onClick={() => inputRef.current.click()}
                      value={value}
                      border={'none'}
                      cursor={'pointer'}
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
                    />
          </InputGroup>
          
          <FormErrorMessage fontWeight={800} >{error?.message}</FormErrorMessage>
      </FormControl>)
   
} 