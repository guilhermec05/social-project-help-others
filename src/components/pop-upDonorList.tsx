import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  HStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Image
 
} from '@chakra-ui/react'
import {saveAs} from "file-saver";
import { Button, ButtonProps } from '@chakra-ui/react'
import { ButtonMain } from './button'
import { useDisclosure } from '@chakra-ui/react'
import { Back } from './back'
import { Textarea } from '@chakra-ui/react'
import { InputMain } from './input'
import { Text } from '@chakra-ui/react'
import { Logo } from './logo'
import { Flex, Spacer } from '@chakra-ui/react'
import { TextAreaMain } from './textArea'
import { ArrowBackIcon, CheckIcon, DownloadIcon } from '@chakra-ui/icons'
import React from 'react';
import { api } from '../services/api/axios';

interface DonateListProps{
   donate_id:string
}

export function DonateList({donate_id}:DonateListProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [result, setResult] = React.useState([])

  function HandleDownload(picture:string){
   const sufix = Date.now()+"_"+Math.round(Math.random() * 1e9)
   saveAs(picture,sufix)
  }

  async function initial(){
      try {
         const res =  await api.get(`/item_donates/get_item_donate_by_users/${donate_id}`).then(res => res.data)
         setResult(res)
      } catch (error) {
         
      }
   }

   React.useEffect(()=>{
      initial()
   },[])

  return (
     <>
        <HStack mt={4} mb={4}>
           <Text
              fontWeight="bold"
              justifyContent={'center'}
              alignItems={'center'}
           >
              Clique aqui para visualizar os doadores:
           </Text>
           <Text
              onClick={onOpen}
              color={'primaryDark'}
              variant="link"
              textDecoration={'underline'}
              cursor={'pointer'}
           >
              clique aqui!
           </Text>
        </HStack>

        <Modal
           closeOnOverlayClick={false}
           isOpen={isOpen}
           onClose={onClose}
           size={'3xl'}
        >
           <ModalOverlay />
           <ModalContent p={3}>
              <ArrowBackIcon
                 fontSize={'h3'}
                 cursor={'pointer'}
                 _active={{ color: 'dark_light' }}
                 onClick={onClose}
              />

              <ModalHeader mr={5}>
                 <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    flexDirection={'column'}
                 >
                    <Logo width={'100px'} />
                 </Flex>
              </ModalHeader>

              <ModalBody >
              <Accordion allowToggle>
                 {result.map(res =>{
                     console.log(res)
                     return <AccordionItem>
                           <h2>
                              <AccordionButton>
                                 <Box as="span" flex='1' display={'flex'} justifyContent={'space-between'} textAlign='left'>
                                    <Text>{res.name}</Text><Text>{(res.picture !="") && <DownloadIcon onClick={e => HandleDownload(res.picture)} />}</Text>
                                 </Box>
                              <AccordionIcon />
                              </AccordionButton>   
                           </h2>
                           <AccordionPanel pb={4}>
                              <Box display={'flex'} flexDirection={'column'}>
                                 {res.item.map(v => <Text>{v.item.name} , {v.quantity}</Text> )}
                              </Box>
                           </AccordionPanel>
                     </AccordionItem>
                 })}
                
               </Accordion>
              </ModalBody>
           </ModalContent>
        </Modal>
     </>
  )
}
