import {  Checkbox, CheckboxProps, Flex, FormControl, FormErrorMessage, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react';
import { Controller, useController } from "react-hook-form";
import { FaPlusCircle } from 'react-icons/fa';
import { ButtonMain } from './button';
export interface checkBoxProps{
	label:string;
	value:string;
	quantity?:string;
	checked?:boolean
}

interface InputCheckBoxProps extends CheckboxProps{
	listCheckBox: checkBoxProps[];
	useControl:any;
    name:string;
	error?:any,
	hasOthers?:boolean,
	setCheckBox?:any,
	
}


export function InputCheckBox({listCheckBox,useControl,name,error,hasOthers = false,setCheckBox,...rest }:InputCheckBoxProps) {
	
	const [valueInputList,setValueInputList] = useState<checkBoxProps[]>(listCheckBox)
	const [valueInput,setValueInput] = useState<string>("")
	const [valueQuantity,setValueQuantity] = useState<string>("")


	
	useEffect(()=>{
		listCheckBox[4] = {label:valueInput,quantity:valueQuantity}
		setCheckBox(listCheckBox)
		setValueInputList(valueInputList)
		console.log(valueQuantity)
		
	},[valueInput,valueQuantity])



	const updateQuantity = (key:number, quantity:string)=>{
		listCheckBox[key].quantity =  quantity
		setCheckBox(listCheckBox)
	}


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
						
					<Input value={valueInput} w={'150px'} variant={'flushed'} onChange={e => setValueInput(e.target.value)} />	
					<Text>QTD:</Text><Input value={valueQuantity} variant={'flushed'} w={10} onChange={e => setValueQuantity(e.target.value)} /> 
					
			</HStack>
		))
	}

	function list(){
		const lists: ReactNode[] = []
		listCheckBox.forEach((v,key) =>{ 

			if(key < 4){
				lists.push( 
					<Flex gap={5}  alignItems={'center'}>
						<Checkbox 
							{...useControl}
							value={v.value}
							key={key}
							colorScheme={'green'} 
							defaultChecked={v.checked}
							isInvalid={false} 
							{...rest}
						>
							<Text fontSize={'h6'} fontWeight={500}>{v.label}</Text>
						</Checkbox>		
						
						<Text>QTD:</Text><Input variant={'flushed'} w={10} onChange={e => updateQuantity(key,e.target.value)}/> 
					
						
					</Flex>
						
				)
			}
			}
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
				{HasOthers()}
				<FormErrorMessage fontWeight={800}>{error?.checks?.message}</FormErrorMessage>
			</FormControl>
		</VStack>
	)
}
