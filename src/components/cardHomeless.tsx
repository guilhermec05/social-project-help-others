import { Box, Flex, Stack, Text } from '@chakra-ui/react'
import { Image, Icon } from '@chakra-ui/react'
import { VscLocation, VscChevronRight } from 'react-icons/vsc'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import location_icon from '../assets/location-icon.png'
import { CalendarIcon } from '@chakra-ui/icons'
import { FaUserTie } from "react-icons/fa";
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'


export interface CardHomerlessProps {
	id: string;
	image: string;
	title: string;
	city: string;
	state: string;
	description: string;
	link:string
	date_ini?:string
	date_end?:string
	isOnwer?:boolean
}

export function CardHomerless({
	id,
	image,
	title,
	city,
	state,
	description,
	link,
	date_ini,
	date_end,
	isOnwer
}: CardHomerlessProps) {
	return (
		<Card display={'flex'} flexDirection={'column' } gap={5} bg={'blackAlpha.50'}>
			<CardBody maxW={'300px'} overflow="hidden" borderRadius={5} p={5}>
				<Image
						src={image}
						boxSize={'410px'}
						h={'250px'}
						alt="homeless image"
					/>
					 <Stack mt='6' spacing='3'>
						<Text fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
							{title}
						</Text>
						<Flex justifyContent={'space-between'}>
							<Box display={'flex'}>
								<Image mr={3} src={location_icon} />
								<Text fontSize={'h6'} >
									{city} - {state}
								</Text>
							</Box>
							
							{isOnwer && <Icon as={FaUserTie} />}
						</Flex>
						<Flex justifyContent={'center'} alignItems={'center'} gap={5}>
							
								{date_ini &&<Text fontSize={'xs'}><CalendarIcon marginRight={2}/>{date_ini}</Text>}
							
							{(date_ini && date_end) && "-"}
						
								{date_end && <Text fontSize={'xs'}><CalendarIcon marginRight={2}/>{date_end}</Text>}
							
						</Flex>
						<Flex align={"end"}>
							
							<Text fontSize={'p'} fontWeight={'300'} noOfLines={3}>
								{description}
							</Text>
							<Flex align={"end"}>
								<Link to={link}>
									<Icon
										as={VscChevronRight}
										fontSize={'h4'}
										mx={3}
										_hover={{ color: 'dark_light' }}
									/>
								</Link>
							</Flex>
						</Flex>
					 </Stack>				
			</CardBody>
		</Card>
	)
}
