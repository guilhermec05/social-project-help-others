import { Box, Flex, Text } from "@chakra-ui/react";
import { Image, Icon } from '@chakra-ui/react'
import { VscLocation, VscChevronRight } from "react-icons/vsc";

import {
    ListItem,
    UnorderedList,
  } from '@chakra-ui/react'
import { ReactNode } from "react";
import { Link } from "react-router-dom";


export interface CardHomerlessProps{
    id:string
    name:string;
    age:number,
    items:string[],
    city:string,
    state:string,
    image: string
}

export function CardHomerless({id, name,age, items, city, state, image}:CardHomerlessProps){
    function listItems(){
        const list:ReactNode[] = []
        items?.forEach(v =>{
            list.push(<ListItem>{v}</ListItem>)
        })

        return list
    }

    return (<Box
        display={'flex'}
        flexDirection={'column'}
        maxW={'300px'}
       
    >
          <Image src={image} boxSize={'350px'} h={'200px'} alt='Dan Abramov' />
          <Box w={'100%' }  bg={'secondaryLight'} p={5}  display={'flex'} flexDirection={'column'} gap={2}>
                <Box display={'flex'} gap={2} w={'100%'} >
                    <Text fontSize={'h6'} fontWeight={'700'}>{name}</Text><Text  fontSize={'h6'}>, {age} Anos</Text>
                </Box>
                <Flex><Icon as={VscLocation} color={'danger'} mx={3}/><Text fontSize={'p'}>{city} - {state}</Text></Flex>
                <UnorderedList noOfLines={3}>
                    {listItems()}
                </UnorderedList>
                <Flex justifyContent={'flex-end'} w={'100%'} >
                    <Link to={`/homeless_help/${id}`}>
                        <Icon 
                        as={VscChevronRight} 
                        fontSize={'h5'}
                        fontWeight={800} 
                        color={'dark'}
                        mx={3}
                        _hover={{color:'dark_light'}}/>
                    </Link>
                </Flex>
        </Box> 
    </Box> )
}