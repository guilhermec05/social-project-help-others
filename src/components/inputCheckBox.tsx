import {  Checkbox, CheckboxProps, HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react';

// export interface CardDonateProps {
// 	id: string;
// 	image: string;
// 	title: string;
// 	street: string;
// 	number: string;
// 	neighborhood: string;
// 	city: string;
// 	state: string;
// 	description: string;
// 	title_2: string;
// 	item_1: string;
// 	item_2: string;
// 	item_3: string;
// 	item_4: string;
// 	item_5: string;
// 	item_6: string;
// 	item_7: string;
// }

interface checkBoxProps{
	label:string;
	value:string;
	checked?:boolean
}

interface InputCheckBoxProps extends CheckboxProps{
	listCheckBox: checkBoxProps[]
}


export function InputCheckBox({listCheckBox,...rest }:InputCheckBoxProps) {

	function list(){
		const lists: ReactNode[] = []
		listCheckBox.forEach((v) => lists.push( <Checkbox value={v.value} colorScheme={'green'} isChecked={v.checked} {...rest}><Text fontSize={'s'}>{v.label}</Text></Checkbox>))
		return lists
	}

	return (
		<VStack   alignItems={'flex-start'}>
			{list()}
		</VStack>
	)
}
