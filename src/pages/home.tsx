import React, { ReactNode } from 'react';
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Link,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  List,
  ListItem,
  StackDivider,
} from '@chakra-ui/react';
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiChevronDown,
} from 'react-icons/fi';
import { IconType } from 'react-icons';
import { ReactText, useContext } from 'react';
import { Route, Routes, Link as ReachLink } from 'react-router-dom';

import AppContext from '../utils/context';

const LinkItems = [
  { name: 'Dashboard', icon: FiHome, path: "/dashboard",auth:['Client','Admin','God'] },
  { name: 'Ongoing Orders', icon: FiTrendingUp, path: "/orders", auth:['Client','Admin','God']},
  // { name: 'Completed Orders', icon: FiStar, path: "/invoices",auth:['Client','Admin','God'] },
  // { name: 'Submitted Orders', icon: FiStar, path: "/submitted",auth:['Client' ,'Admin','God'] },
  { name: 'Clients', icon: FiStar, path: "/clients", auth:['Client','Admin','God'] },
  // { name: 'Client Orders', icon: FiStar, path: "#", auth:['Admin','God'] },
  { name: 'Settings', icon: FiSettings, path: "/settings", auth:['Client','Admin','God'] },
];

export default function Home({ children }: { children: JSX.Element }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const appContext = useContext(AppContext);

  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}
      display={{ base: 'none', md: 'block' }}
    >
      <SidebarContent
        onClose={() => onClose}
      />
      <Drawer
        autoFocus={false}
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        {children}
      </Box>
    </Box>
  );
}


const SidebarContent = ({ onClose, ...rest }: { onClose: any }) => {
  const appContext = useContext(AppContext);
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
          Logo
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map(({ name, icon, path, auth }: { name: any, icon: any, path: String, auth:Array<String> }) => {
        // checking if the current user has rights to see this ui element
        // if(!auth.includes(appContext.user.type))return;
        return (<NavItem key={name} icon={icon} path={path}>
          {name}
        </NavItem>);
      })}
    </Box>
  );
};


const NavItem = ({ icon, children, path, ...rest }: { icon: any, children: any, path: any }) => {
  return (
    <Link to={path} as={ReachLink} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: 'cyan.400',
          color: 'white',
        }}
        {...rest}>
        {icon && (
          <Icon
            mr="4"
            fontSize="16"
            _groupHover={{
              color: 'white',
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ onOpen, ...rest }: { onOpen: any }) => {
  const appContext = useContext(AppContext);
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text
        display={{ base: 'flex', md: 'none' }}
        fontSize="2xl"
        fontFamily="monospace"
        fontWeight="bold">
        Logo
      </Text>

      <HStack spacing={{ base: '0', md: '6' }}>
        <IconButton
          size="lg"
          variant="ghost"
          aria-label="open menu"
          icon={<FiBell />}
        />
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              py={2}
              transition="all 0.3s"
              _focus={{ boxShadow: 'none' }}>
              <HStack>
                <Avatar
                  size={'sm'}
                  src={
                    ''
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">Admin</Text>
                  <Text fontSize="xs" color="gray.600">
                    
                  </Text>
                </VStack>
                <Box display={{ base: 'none', md: 'flex' }}>
                  <FiChevronDown />
                </Box>
              </HStack>
            </MenuButton>
            <MenuList
              bg={useColorModeValue('white', 'gray.900')}
              borderColor={useColorModeValue('gray.200', 'gray.700')}>
              {/* <MenuItem>Profile</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Billing</MenuItem> */}
              <MenuDivider />
              <MenuItem 
              onClick={()=>{appContext.signout(()=>{
                 
              })}}>Sign out</MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  );
};
