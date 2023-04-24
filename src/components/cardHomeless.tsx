import { Box, Flex, Text } from '@chakra-ui/react'
import { Image, Icon } from '@chakra-ui/react'
import { VscLocation, VscChevronRight } from 'react-icons/vsc'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import location_icon from '../assets/location-icon.png'

export interface CardHomerlessProps {
	id: string;
	image: string;
	title: string;
	city: string;
	state: string;
	description: string;
	link:string
}

export function CardHomerless({
	id,
	image,
	title,
	city,
	state,
	description,
	link
}: CardHomerlessProps) {
	return (
		<Box display={'flex'} flexDirection={'column'}>
			<Box maxW={'350px'} maxH={'460px'} overflow="hidden">
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
					gap={5}
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
					<Flex align={"end"}>
						<Text fontSize={'h7'} fontWeight={'300'} noOfLines={5}>
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
