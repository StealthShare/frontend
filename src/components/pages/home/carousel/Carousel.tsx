import { Flex } from "@chakra-ui/react"
import { useEffect } from "react";
import { useState } from "react";
import { Heading } from "../../../shared/Heading";
import { HeadingSmall } from "../../../shared/HeadingSmall";


const items = ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.20)", "rgba(255,255,255,0.30)"];

export const Carousel = () => {
	const [currentItem, setCurrentItem] = useState<number>(0)


	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentItem((prev) => prev == items.length - 1 ? 0 : prev + 1)
		  }, 5000) // in milliseconds
		  return () => clearInterval(intervalId)
	},[ ])


	return <Flex flexDir="column" gap="20px">
		<HeadingSmall text="StealthShare News"/>
		<Flex overflow="hidden" h="400px" pos="relative" bg="rgba(255,255,255,0.1)" borderRadius="16px" w="100%">
		<Flex transition="0.2s" left={`-${1200*currentItem}px`}  pos="absolute" h="100%" width="300%" gridTemplateColumns='1fr 1fr 1fr'> 
		{
			items.map((item) => {
				return <Flex  h="100%" w="100%"  bg={item}></Flex>
			})
		}
		</Flex>
		<Flex pos="absolute" w="100%" bottom="20px" left="0" right='0' margin="auto" zIndex="1" >
			<Flex gap="20px" w="100%" justifyContent="center">
			{items.map((item, index) => {
				return <Flex cursor='pointer' onClick={() => {setCurrentItem(index)}} borderRadius="50%" boxSize="12px" border="1px solid white" bg={currentItem == index ? "white" : "none"}/>
			})}
			</Flex>
			
		</Flex></Flex>
	</Flex>
}