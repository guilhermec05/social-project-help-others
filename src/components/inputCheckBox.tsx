import {  Checkbox, CheckboxProps, FormControl, FormErrorMessage, HStack, Text, VStack } from '@chakra-ui/react'
import { ReactNode } from 'react';
import { Controller, useController } from "react-hook-form";
interface checkBoxProps{
	label:string;
	value:string;
	checked?:boolean
}

interface InputCheckBoxProps extends CheckboxProps{
	listCheckBox: checkBoxProps[];
	useControl:any;
    name:string;
	error?:any
}


export function InputCheckBox({listCheckBox,useControl,name,error,...rest }:InputCheckBoxProps) {
	function list(){
		const lists: ReactNode[] = []
		listCheckBox.forEach((v,key) =>{ 
			lists.push( 
					
						<Checkbox 
							{...useControl}
							value={v.value}
							key={key}
							colorScheme={'green'} 
							isInvalid={false} 
							{...rest}
						>
							<Text fontSize={'h6'} fontWeight={500}>{v.label}</Text>
						</Checkbox>			
			)}
		 )
		return lists
	}



	return (
		<VStack   alignItems={'flex-start'}>
			<FormControl 
			gap={2}
			isInvalid={ (error?.checks != undefined)} 
			display={'flex'} 
			flexDirection={'column'}>
				{list()}
				<FormErrorMessage fontWeight={800}>{error?.checks?.message}</FormErrorMessage>
			</FormControl>
		</VStack>
	)
}
