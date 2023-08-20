import { Box, Stack, VStack } from "@chakra-ui/react";

type Node = {
  value: string;
  leftChild: Node | null;
  rightChild: Node | null;
  visited: boolean;
  current: boolean;
};

type StackRendererProps = {
  stack: Node[];
};

export function StackRenderer({ stack }: StackRendererProps) {
  return (
    <VStack marginLeft={10} marginTop={400} spacing={4} alignItems="center">
      <Stack
        width="100px"
        maxW="100px"
        spacing="0"
        borderBottomRadius="md"
        borderTopWidth="0"
        height="300px"
        display="flex"
        flexDirection="column-reverse"
        overflowY="auto"
        border="1px solid black"
      >
        {stack.map((Node) => (
          <Box
            height="40px"
            borderWidth="0px"
            borderTop="1px"
            borderColor="gray.500"
            textAlign="center"
            py="1"
            bg="gray.100"
          >
            {Node.value}
          </Box>
        ))}
      </Stack>
      <Box textAlign="center" fontWeight="500">
        Stack
      </Box>
    </VStack>
  );
}