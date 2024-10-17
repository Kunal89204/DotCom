import { Box, Container, Stack, Text, Link, IconButton, Divider, useColorModeValue, Image } from "@chakra-ui/react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("black", "black")}
      color={useColorModeValue("gray.200", "white")}
      py={10}
      boxShadow="0px -2px 10px rgba(0, 0, 0, 0.3)" // Soft shadow effect
     
    >
      <Container as={Stack} width={'100%'} spacing={10}>
        
        {/* Upper Section */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
          spacing={8}
        >
          {/* Logo and Branding */}
          <Stack direction={"row"} align={"center"} spacing={4}>
            <Image
              boxSize="60px"
              src="/path-to-your-logo.png" // Replace with your logo path
              alt="Site Logo"
            />
            <Text fontSize={"lg"} fontWeight="bold" color="white">
              MovieSite
            </Text>
          </Stack>

          {/* Navigation Links (optional, can be customized) */}
          <Stack direction={"row"} spacing={6} fontSize="sm">
            <Link href="/about" _hover={{ color: "red.400" }} color="gray.400">
              About
            </Link>
            <Link href="/contact" _hover={{ color: "red.400" }} color="gray.400">
              Contact
            </Link>
            <Link href="/privacy" _hover={{ color: "red.400" }} color="gray.400">
              Privacy Policy
            </Link>
            <Link href="/terms" _hover={{ color: "red.400" }} color="gray.400">
              Terms of Service
            </Link>
          </Stack>

          {/* Social Media Links */}
          <Stack direction={"row"} spacing={6}>
            <Link href="https://github.com/yourusername" isExternal>
              <IconButton
                aria-label="GitHub"
                icon={<FaGithub />}
                bg="transparent"
                _hover={{ color: "red.400" }}
                color="white"
              />
            </Link>
            <Link href="https://linkedin.com/in/yourusername" isExternal>
              <IconButton
                aria-label="LinkedIn"
                icon={<FaLinkedin />}
                bg="transparent"
                _hover={{ color: "red.400" }}
                color="white"
              />
            </Link>
            <Link href="https://twitter.com/yourusername" isExternal>
              <IconButton
                aria-label="Twitter"
                icon={<FaTwitter />}
                bg="transparent"
                _hover={{ color: "red.400" }}
                color="white"
              />
            </Link>
          </Stack>
        </Stack>

        {/* Divider Line */}
        <Divider borderColor="gray.700" />

        {/* Lower Section */}
        <Stack
          direction={{ base: "column", md: "row" }}
          justify={"space-between"}
          align={"center"}
        >
          {/* Copyright and Info */}
          <Text fontSize={"sm"} textAlign={{ base: "center", md: "left" }} color="gray.400">
            © 2024 MovieSite. All rights reserved. | Powered by TMDB API.
          </Text>

          {/* Small Tagline or Slogan */}
          <Text fontSize={"md"} textAlign={{ base: "center", md: "right" }} color="white">
            "Your gateway to the world of movies!"
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
