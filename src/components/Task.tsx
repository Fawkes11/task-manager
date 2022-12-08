/**********************
    Name: Task.tsx
 
    Description: This component will have the content of a task

 **********************/
import { Checkbox, Input, Stack, Text } from "@chakra-ui/react";

const Task = () => {
  return (
    <Stack direction="row" w="full">
      <Input
        variant="flushed"
        size="sm"
        colorScheme="cyan"
        fontSize="15px"
        placeholder="Enter description"
      />
      <Checkbox size="md" colorScheme="cyan" minW="90px">
        <Text fontSize="12px">In progress</Text>
      </Checkbox>
    </Stack>
  );
};

export default Task;
