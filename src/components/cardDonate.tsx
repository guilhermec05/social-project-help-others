import { Box, Flex, Text } from '@chakra-ui/react'
import { Image, Icon } from '@chakra-ui/react'
import { VscLocation, VscChevronRight } from 'react-icons/vsc'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import location_icon from '../assets/locationIcon.png'
import { CheckBox } from '../components/checkBox'
import { ButtonMain } from "../components/button";
import { Complaint } from './pop-upComplaint'

export interface CardDonateProps {
	id: string;
	image: string;
	title: string;
	street: string;
	number: string;
	neighborhood: string;
	city: string;
	state: string;
	description: string;
	title_2: string;
	item_1: string;
	item_2: string;
	item_3: string;
	item_4: string;
	item_5: string;
	item_6: string;
	item_7: string;
}

export function CardDonate({
	id,
	image,
	title,
	street,
	number,
	neighborhood,
	city,
	state,
	description,
	title_2,
	item_1,
	item_2,
	item_3,
	item_4,
	item_5,
	item_6,
	item_7,
}: CardDonateProps) {
	return (
		<Box display={'flex'} flexDirection={'column'} >
			<Box maxW={'850px'} maxH={'1250px'} overflow="hidden">
				<Image
					src={image}
					boxSize={'810px'}
					h={'370px'}
					alt="homeless image"
				/>
				<Box >
					<Text mt={6} fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
						{title}
					</Text>
					<Flex>
						<Image mt={8} mr={3} src={location_icon} />
						<Text mt={8} fontSize={'h6'}>
							{street} , {number} - {neighborhood} - {city} - {state}
						</Text>
					</Flex>
					<Flex align={"end"}>
						<Text mt={8} fontSize={'h7'} fontWeight={'300'} noOfLines={5}>
							{description}
						</Text>
					</Flex>
					
					<Box mt={6} display={'flex'} flexDirection={'column'}>
						<Text fontSize={'h7'} fontWeight={'900'} noOfLines={5}>
							{title_2}
						</Text>
						<CheckBox mt={3}><Text fontSize={'h8'}>{item_1}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_2}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_3}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_4}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_5}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_6}</Text></CheckBox>
						<CheckBox><Text fontSize={'h8'}>{item_7}</Text></CheckBox>
					</Box>


                <Flex justifyContent={'absolute'} mt={4}>
                    <ButtonMain fontSize={'h6'} title="Doar"  p={'10px'}/>
                </Flex>     

				<Flex mt={6} w={'100%'} alignItems={'left'} noOfLines={5} fontSize={'h7'} fontWeight={'900'}>
					<Text>Para denunciar este anúncio</Text>
					<Link to={'/home'}><Text color={'danger'} textDecoration={'underline'}>clique aqui!</Text></Link>
					<Complaint />

				</Flex>     
				</Box>
			</Box>
		</Box>
	)
}
