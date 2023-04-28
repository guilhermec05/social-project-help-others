import {  Checkbox, CheckboxProps, FormControl, FormErrorMessage, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react';
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
	error?:any,
	hasOthers?:boolean 
}


export function InputCheckBox({listCheckBox,useControl,name,error,hasOthers = false,...rest }:InputCheckBoxProps) {
	
	const [valueInputList,setValueInputList] = useState<checkBoxProps[]>(listCheckBox)
	const [valueInput,setValueInput] = useState<string>("")

	// console.log(num)
	function HasOthers(){	
		return (hasOthers &&(
			<HStack>
					<Checkbox 
						{...useControl}
						value={"others"}
						// key={key}
						colorScheme={'green'} 
						isInvalid={false} 
						{...rest}
					>
					</Checkbox>
						
					<Input value={valueInput} variant={'flushed'} onChange={e => setValueInput(e.target.value)} />
				</HStack>
		))
	}

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

	useEffect(()=>{

		valueInputList[listCheckBox.length] ={value:"0", label:valueInput} 
		setValueInputList(valueInputList)
		console.log(valueInputList)
		listCheckBox = valueInputList
		
	},[valueInput])


	return (
		<VStack   alignItems={'flex-start'}>
			<FormControl 
			gap={2}
			isInvalid={ (error?.checks != undefined)} 
			display={'flex'} 
			flexDirection={'column'}>
				{list()}
				{HasOthers()}
				<FormErrorMessage fontWeight={800}>{error?.checks?.message}</FormErrorMessage>
			</FormControl>
		</VStack>
	)
}
