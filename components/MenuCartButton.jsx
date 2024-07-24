import { Popover, PopoverTrigger, PopoverContent, PopoverArrow, PopoverCloseButton, PopoverHeader, PopoverBody, IconButton, ButtonGroup, Button, Flex, Box, Avatar, Heading, Text } from '@chakra-ui/react';
import { ShoppingCartIcon } from "@heroicons/react/24/outline";

const MenuCartButton = () => {

  const itemList = [
    {
        name: "Totoya Camry",
        description: "Description test"
    },{
        name: "Totoya Camry",
        description: "Description test"
    },{
        name: "Totoya Camry",
        description: "Description test"
    },
  ];

  const Item = (props) => {
    return (
        <Flex>
            <Box w='5rem' h='5rem'>
                <Avatar src="" name="" />
            </Box>
            <Box>
                <Heading size='xs'>{props.name}</Heading>
                <Text fontSize={12}>{props.description}</Text>
                <Text fontSize={12}>{props.description}</Text>
            </Box>
        </Flex>
    );
  }

  return (
    <Popover>
      <PopoverTrigger>
        <IconButton
          border='none'
          icon={<ShoppingCartIcon className="h-6 w-6" />}
          variant="outline"
          mt='-4'
          rounded={25}
          _hover={{bg:'transparent'}}
        />
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader><Heading size='xs'>Cart</Heading></PopoverHeader>
        <PopoverBody>
            {
                itemList.map((value, i) => <Item key={i} {...value} />)
            }
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
};

export default MenuCartButton;
