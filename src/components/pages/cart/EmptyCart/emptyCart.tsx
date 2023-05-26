import { Box, Button, Flex, Image } from "@chakra-ui/react"
import { Link } from "react-router-dom"
import { HeadingSmall } from "../../../shared/HeadingSmall"

export const EmptyCart = () => {
	return <Flex justify="center" alignItems="center" paddingY="20vh" w="100%" flexDir="column">
		<Image mb='30px' w="85px" src="/assets/icons/empty-cart.svg"/>
		<HeadingSmall text="Your shopping cart is empty"/>
		<Box fontSize="16px">
			Looking for inspiration?
		</Box>
		<Link to="/marketplace"><Button px="70px" mt="30px">Go to marketplace</Button></Link>

	</Flex>
}