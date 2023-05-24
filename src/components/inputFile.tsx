
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
  setFiles?:any
}  

export function InputFile({name, messageError,useControl, isError,widthForm,placeholderImg,setFiles, ...rest }:inputMainProps){
    const inputRef = useRef();
   
    // const {
    //     field: { ref, value, ...inputProps },
    //     fieldState: { invalid, isTouched, isDirty,error },
    //   } = useController({
    //     name,
    //     control:useControl
    //   });


    
    const { field:{ref,value, ...props}, fieldState } = useController(
      {
        name:name,
        control:useControl,
        rules: { required: true }
      });

      // const {
      //   register,
      //   formState: { errors },
      //   setValue,
      // } = useField(name);

  

    return (<FormControl isInvalid={fieldState.invalid} display={'flex'} justifyContent={'center'} flexDirection={'column'} width={widthForm} >
          <InputGroup>
                <InputLeftElement
                pointerEvents="none"
                children={<Icon as={CiImageOn} fontSize={'h4'}/>}
                />
                 <input type='file' accept={'image/*'} name={name}   ref={(e)=>{
                 setFiles(e?.files[0])
                  inputRef.current = e
                  }} {...props}  style={{ display: 'none' }}  />
                 <Input
                      placeholder={placeholderImg || "seu arquivo ..."}
                      onClick={(e) =>  inputRef.current.click()}
                      value={value}
                      border={'none'}
                      // {...field}
                      cursor={'pointer'}
                      // type={'file'}
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
          
          <FormErrorMessage fontWeight={800} >{fieldState?.error?.message}</FormErrorMessage>
      </FormControl>)
   
} 