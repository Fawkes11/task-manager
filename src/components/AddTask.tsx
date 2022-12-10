/**********************
    Name: AddTask.tsx
 
    Description: The component responsible for receiving
    the data of a new task and using the corresponding
    action to add the task with its indentation.

 **********************/
import {
  Input,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Select,
  HStack,
  Tooltip,
} from "@chakra-ui/react";
import { InfoIcon } from "@chakra-ui/icons";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { addTask } from "../features/tasks/taskSlice";
import { v4 as uuid } from "uuid";
import { useState } from "react";

const AddTask = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [task, setTask] = useState({
    id: "",
    name: "",
    description: "",
    status: "",
    mainId: "",
    indent: -1
  });

  const tasksList = useAppSelector((state) => state.tasks);
  const dispatch = useAppDispatch();

/*A change handler for the inputs name and mainId*/
  const handleChange = (event: any) => {
    setTask({
      ...task,
      [event.target.name]: event.target.value,
    });
  };
/**************************************************/

/*The following function is used to generate an indentation in the aggregate tasks in case they become dependent on each other*/
  function calcIndent(): number {
    if(task.mainId !== 'NONE'){
      const mainTaskIndent = tasksList.find(t => t.id === task.mainId)?.indent
      console.log(mainTaskIndent)
      return mainTaskIndent ? mainTaskIndent + 12 : 1;
  }
  return 0
}
/**************************************************/

/*The following function is responsible for saving the data of a new task*/
  const handleSubmit = (event: any) => {
    event.preventDefault();
    dispatch(
      addTask({...task,
        id: uuid(),
        status: "INPROGRESS",
        indent: calcIndent(),
      })
    );
    onClose();
  };
/**************************************************/



  return (
    <>
      <Button onClick={onOpen} variant="solid" colorScheme="cyan" size="sm">
        New Task
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter new task</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                variant="outline"
                size="sm"
                h="37px"
                ps={4}
                colorScheme="cyan"
                fontSize="15px"
                placeholder="Enter name"
                name="name"
                onChange={handleChange}
                isRequired
              />

              <HStack>
                <Select
                  name="mainId"
                  onChange={handleChange}
                  placeholder="Select main task id"
                  mt="8px"
                  colorScheme="cyan"
                  fontSize="15px"
                  isRequired
                >
                  <option value="NONE">*** Without main ID ***</option>
                  {tasksList.map((task) => (
                    <option key={task.id} value={task.id}>
                      {task.name}
                    </option>
                  ))}
                </Select>
                <Tooltip
                  label="You can choose a parent for this task "
                  fontSize="md"
                >
                  <InfoIcon />
                </Tooltip>
              </HStack>
            </ModalBody>

            <ModalFooter>
              <Button
                type="submit"
                colorScheme="green"
                mr={3}
              >
                Save
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTask;
