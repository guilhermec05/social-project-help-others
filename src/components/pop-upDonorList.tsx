import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  HStack,
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from '@chakra-ui/react'
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
import { ArrowBackIcon } from '@chakra-ui/icons'

export function DonorList() {
  const { isOpen, onOpen, onClose } = useDisclosure()

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
           size={'2xl'}
        >
           <ModalOverlay />
           <ModalContent p={10}>
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

              <ModalBody pb={6}>
                 <TableContainer>
                    <Table variant="simple">
                       <Thead bg={'primaryDark'}>
                          <Tr>
                             <Th color={'white'}>Nome</Th>
                             <Th color={'white'}>Item Doado</Th>
                          </Tr>
                       </Thead>
                       <Tbody>
                          <Tr>
                             <Td>Bruno</Td>
                             <Td>Sabonete</Td>
                          </Tr>
                          <Tr>
                             <Td>Lucas</Td>
                             <Td>Shampoo</Td>
                          </Tr>
                          <Tr>
                             <Td>Guilherme</Td>
                             <Td>Toalha</Td>
                          </Tr>
                       </Tbody>
                    </Table>
                 </TableContainer>
              </ModalBody>
           </ModalContent>
        </Modal>
     </>
  )
}
