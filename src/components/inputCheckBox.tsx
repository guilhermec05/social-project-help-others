import {  Checkbox, CheckboxProps, Flex, FormControl, FormErrorMessage, HStack, Input, Text, VStack } from '@chakra-ui/react'
import { ReactNode, useEffect, useState } from 'react';

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
	canEdit?:boolean
	
}

interface InputCountNumberCheckerProps extends CheckboxProps{ 
	useControl:any
	number:number
	checked:boolean
	label:string
	quantity:string|number 
	canEdit:boolean
	setCheckBox:any,
	listCheckBox: checkBoxProps[];
}


function InputCountNumberChecker({useControl,number,checked,quantity,canEdit,label,setCheckBox,listCheckBox,...rest}:InputCountNumberCheckerProps){
	
	const [valueQuantity,setValueQuantity] = useState<string|number>(quantity)


	useEffect(()=>{
		setValueQuantity(quantity)
	},[])

	function updateNumber(num:string){
		
		setValueQuantity(num)
		listCheckBox[number].quantity = num
		setCheckBox(listCheckBox)
	}


	return (
		<Flex gap={5}  alignItems={'center'}>
			<Checkbox 
				{...useControl}
				value={number}
				colorScheme={'green'} 
				defaultChecked={checked}
				isInvalid={false} 
				{...rest}
				isDisabled={checked}
			>
				<Text fontSize={'h6'} fontWeight={500}>{label}</Text>
			</Checkbox>		
			
			<Text>QTD:</Text>
			
			
			{canEdit?<Input  value={valueQuantity} variant={'flushed'} w={10} onChange={e => updateNumber(e.target.value)} /> :<Text>{quantity}</Text> }
			
		</Flex>
	)
}


export function InputCheckBox({listCheckBox,useControl,name,error,hasOthers = false,setCheckBox,canEdit = true,...rest }:InputCheckBoxProps) {
		const [valueInput,setValueInput] = useState<string>("")
	const [valueQuantity,setValueQuantity] = useState<string>("0")
	
	useEffect(()=>{
		listCheckBox[4] = {label:valueInput,quantity:valueQuantity}
		setCheckBox(listCheckBox)
	
		
	},[valueInput,valueQuantity,listCheckBox])




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
					<Text>QTD:</Text>
					
					<Input value={valueQuantity} variant={'flushed'} w={10} onChange={e => setValueQuantity(e.target.value)} /> 
					
			</HStack>
		))
	}

	const List =  ()=>{
		const lists: ReactNode[] = []
		
		listCheckBox.forEach((v,key) =>{ 
		
				if(key < listCheckBox.length -  (hasOthers?1:0) && v.label != ""){
					// console.log(v.quantity)


					lists.push( 
						<InputCountNumberChecker canEdit={canEdit}  listCheckBox={listCheckBox} key={key}  checked={v.checked}  number={key} label={v.label} quantity={(v.quantity || 0)} useControl={useControl} setCheckBox={setCheckBox} />
							
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
				{List()}
						<Flex gap={5}  alignItems={'center'} display={'none'}>
									<Checkbox 
										
										value={""}	
										colorScheme={'green'} 
										isInvalid={false} 
										{...rest}
									>
										<Text fontSize={'h6'} fontWeight={500}>teste</Text>
									</Checkbox>		
									
									<Text>QTD:</Text>
									
						</Flex>
				{HasOthers()}
				<FormErrorMessage fontWeight={800}>{error?.checks?.message}</FormErrorMessage>
			</FormControl>
		</VStack>
	)
}
