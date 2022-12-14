/**********************
    Name: Task.tsx
 
    Description: This component will have the content
    of a task and its status of change, or deletion.

 **********************/
import {
  Badge,
  Checkbox,
  Stack,
  Tag,
  IconButton,
  Box,
  Heading,
} from "@chakra-ui/react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { deleteTask, updateTask } from "../features/tasks/taskSlice";
import { Task as TaskInterface } from "../interfaces/interfaces";

const Task = ({ id, name, description, status, indent }: TaskInterface) => {
  const dispatch = useAppDispatch();
  const dataList = useAppSelector((state) => state.tasks);

  /* this function checks if you have unchecked dependent tasks and returns 'DONE' or 'COMPLETE'. */
  function verificationChildrenCheck(id: string): string {

    const childrenCheck = dataList.filter((task) => task.mainId === id);
    const allChecked = childrenCheck.every((task) => task.status === "COMPLETE");

    if (childrenCheck.length <= 0 || (childrenCheck.length > 0 && allChecked)) {
      return 'COMPLETE';
    }
    else {
      return 'DONE'
    }
  }
  /**************************************************/

  function verificationMainCheck(mainId: string): string {
    const mainCheck = dataList.find((task) => task.id === mainId)

    return 'h'
  }

  /*this function counts dependencies*/
  function countDependencies(id: string): number {
    const childrenCheck = dataList.filter((task) => task.mainId === id);
    return childrenCheck.length
  }
  /************************************************* */

  /*this function is responsible for handling the change of the status of a task with the help of the verificationChildrenCheck function. */
  const handleStatusChange = (value: any) => {
    dispatch(
      updateTask({
        id,
        name,
        description,
        status: value ? verificationChildrenCheck(id) : "INPROGRESS",
      })
    );
  };
  /************************************************* */



  
/*this function is in charge of deleting a task*/
  const handleDelete = () => {
    dispatch(deleteTask(id));
  };
  /************************************************* */




  return (
    <Stack direction="row" ml={`${indent}px`}>
      <Box display="flex" alignItems="center">
        <Tag
          variant="solid"
          colorScheme="blackAlpha"
          mt="2px"
          h="20px"
          fontSize="12px"
          size="sm"
          padding="4px 4px"
          maxW="150px"
        >
          {id.slice(0, 4)}

        </Tag>
      </Box>

      <Box
        px={3}
        flex="1"
        textAlign="left"
        minWidth={{ base: "250px", md: "450px" }}
        borderBottom="1px BlackAlpha.400"
        display="flex"
        alignItems="center"
        position='relative'
      >
        <Heading size="xs">{name}</Heading>
        <Tag
          fontSize='12px'
          position='absolute'
          right='0'
        >{`Dependencies: ${countDependencies(id)}`}</Tag>
      </Box>

      <Checkbox
        size="md"
        colorScheme="cyan"
        w="90px"
        justifyContent="flex-start"
        onChange={(e) => handleStatusChange(e.target.checked)}
        isChecked={status == "DONE" || status == "COMPLETE"}
      >
        <Badge fontSize="11px" colorScheme="cyan">
          {status}
        </Badge>
      </Checkbox>

      <Box display="flex" alignItems="center" maxW="40px">
        <IconButton
          onClick={handleDelete}
          aria-label="Delete task"
          colorScheme="none"
          _active={{
            transform: "scale(1.15)",
          }}
          icon={<DeleteIcon color="red.500" />}
        />
      </Box>
    </Stack>
  );
};

export default Task;
