import React from 'react';
import {
    Box,
    Flex,
    Link,
    Input,
    InputGroup,
    InputLeftElement,
    Icon,
    Text,
    Image,
    useBreakpointValue,
    Collapse,
    Button,
    useDisclosure,
} from '@chakra-ui/react';
import { SearchIcon, HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    const { isOpen, onToggle } = useDisclosure();
    const flexDirection = useBreakpointValue({ base: 'column', md: 'row' });
    const gap = useBreakpointValue({ base: 4, md: 8 });

    return (
        <Box
            as="header"
            bg="transparent"
            w="full"
            py={4}
            px={6}
            color="white"
            position="fixed"
            top={0}
            zIndex={10}
            boxShadow="md"
        >
            <Flex
                justify="space-between"
                align="center"
                wrap="wrap"
                flexDirection={{ base: 'row', md: 'row' }}
            >
                {/* Logo */}
                <Box display="flex" alignItems="center">
                    <Image
                        src="https://dotcomoviez.vercel.app/assets/logo-CLfgTD-B.png"
                        alt="Logo"
                        width={{ base: '100px', md: '150px' }}
                        mr={{ base: 2, md: 4 }}
                    />
                    <Button
                        display={{ base: 'block', md: 'none' }}
                        onClick={onToggle}
                        bg="transparent"
                        _hover={{ bg: 'gray.700' }}
                        _active={{ bg: 'gray.800' }}
                    >
                        {isOpen ? <CloseIcon boxSize={4} /> : <HamburgerIcon boxSize={6} />}
                    </Button>
                </Box>

                {/* Navigation Links */}
                <Collapse in={isOpen || useBreakpointValue({ base: false, md: true })} animateOpacity>
                    <Flex
                        flexDirection={{ base: 'column', md: 'row' }}
                        gap={gap}
                        align="center"
                        mt={{ base: 4, md: 0 }}
                        textAlign={{ base: 'center', md: 'left' }}
                    >
                        <Link as={RouterLink} to="/" _hover={{ color: 'gray.400' }}>
                            <Text fontWeight="bold">Home</Text>
                        </Link>
                        <Link as={RouterLink} to="/movies/popular" _hover={{ color: 'gray.400' }}>
                            <Text fontWeight="bold">Movies</Text>
                        </Link>
                        <Link as={RouterLink} to="/tv/popular" _hover={{ color: 'gray.400' }}>
                            <Text fontWeight="bold">TV Shows</Text>
                        </Link>
                        <Link as={RouterLink} to="/popular" _hover={{ color: 'gray.400' }}>
                            <Text fontWeight="bold">Popular</Text>
                        </Link>
                    </Flex>
                </Collapse>

                {/* Search Bar */}
                <Box mt={{ base: 4, md: 0 }} ml={{ base: 0, md: 4 }} w={{ base: 'full', md: '300px' }}>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none">
                            <Icon as={SearchIcon} color="gray.500" />
                        </InputLeftElement>
                        <Input
                            type="text"
                            placeholder="Search..."
                            bg="gray.100"
                            opacity={0.8}
                            border="none"
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{ bg: 'gray.700' }}
                            _focus={{ bg: 'gray.700', boxShadow: 'outline' }}
                            size="md"
                        />
                    </InputGroup>
                </Box>
            </Flex>
        </Box>
    );
};

export default Navbar;
