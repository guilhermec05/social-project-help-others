import { Box, Flex, Text } from '@chakra-ui/react'
import { Image, Icon } from '@chakra-ui/react'
import { VscLocation, VscChevronRight } from 'react-icons/vsc'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import location_icon from '../assets/location-icon.png'
import { CalendarIcon } from '@chakra-ui/icons'

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
	date_end
}: CardHomerlessProps) {
	return (
		<Box display={'flex'} flexDirection={'column'}>
			<Box maxW={'350px'} overflow="hidden">
				<Image
					src={image}
					boxSize={'410px'}
					h={'250px'}
					alt="homeless image"
				/>
				<Box
					w={'100%'}
					bg={'secondaryLight'}
					p={5}
					display={'flex'}
					flexDirection={'column'}
					gap={3}
				>
					<Text fontSize={'h5'} fontWeight={'700'} noOfLines={1}>
						{title}
					</Text>
					<Flex>
						<Image mr={3} src={location_icon} />
						<Text fontSize={'h6'}>
							{city} - {state}
						</Text>
						
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
				</Box>
			</Box>
		</Box>
	)
}
