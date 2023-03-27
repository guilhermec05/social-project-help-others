import { HamburgerIcon } from "@chakra-ui/icons";
import { Icon, useDisclosure } from '@chakra-ui/react'
import { Box, Flex, Text } from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
  } from '@chakra-ui/react'

  import {
    Menu,
    MenuList,
    MenuItem
  } from '@chakra-ui/react'

export function Header(){

    const { isOpen, onOpen, onClose } = useDisclosure()

    return<>
         <Box
            display={'flex'}
            flexDirection={'column'}        
        >
            <Box p={'3px'} bg={'primaryDark'}/>
            <Flex 
                bg={'primary'}
                justifyContent={'space-between'}
                w={'100vw'}
                p={'15px'}
            >
                <HamburgerIcon  
                    onClick={onOpen}
                    color={'secondary'}
                    _active={{color:'dark_light'}}
                />  
                <Text>icon</Text>
            
                <Icon 
                as={FaRegUserCircle} 
                fontSize={'h5'} 
                color={'secondary'}/>
                    
        
            </Flex> 
        </Box>
        <Drawer placement="left"  onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay />
            <DrawerContent>
                <DrawerHeader borderBottomWidth='1px'>Menu</DrawerHeader>
               
                    <Box 
                        w={'100%'}
                        textAlign={'center'}
                        transition={'all 0.2s'}
                        _hover={{
                            bg:'secondaryLight',
                            animationDelay:'1s'
                        }}
                        p={'10px'}
                    >New Signup Homeless</Box>                    
                
            </DrawerContent>
        </Drawer>
    </>
    
   
    
}