import { useToast, ToastProps } from "@chakra-ui/react";


interface toastProps extends ToastProps{

}


export function Toast({...props}: toastProps ){
    const toast = useToast()

    return toast({
        title:props.title,
        status: props.status,
        duration: 5000,
        isClosable: true,
        position:'top-right',
    })
}