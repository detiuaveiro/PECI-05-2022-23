import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  HStack,
  useColorModeValue,
} from '@chakra-ui/react'
import * as React from 'react'

const Navbar: React.FC = () => {
  return (
      <Box as="nav" bg="bg-surface" boxShadow={useColorModeValue('sm', 'sm-dark')}>
        <Container py={{ base: '4', lg: '5' }}>
          <HStack spacing="10" justify="space-between">
              <Flex justify="space-between" flex="1">
                <ButtonGroup variant="link" spacing="8">
                    <Button onClick={()=>{window.location.href = '/'}}>Home</Button>
                    <Button onClick={()=>{window.location.href = '/Topology'}}>Topology</Button>
                    <Button onClick={()=>{window.location.href = '/Calendar'}}>Calendar</Button>
                    <Button onClick={()=>{window.location.href = '/About'}}>About</Button>
                </ButtonGroup>
              </Flex>
          </HStack>
        </Container>
      </Box>
  )
}

export default Navbar;
