/**********************
    Name: TaskList.tsx
 
    Description: This component creates the list of tasks
    with the option to filter by status, and also calls
    the addtask component to add tasks.

 **********************/

import React from "react";
import Task from "./Task";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { Box, HStack, Radio, RadioGroup, Stack } from "@chakra-ui/react";
import AddTask from "./AddTask";
import { useState } from "react";
import { Task as TaskInterface } from "../interfaces/interfaces";

const TaskList = () => {
  const tasksList = useAppSelector((state) => state.tasks);
  const [radioValue, setRadioValue] = useState("ALL");

  function filterTask(task: TaskInterface): boolean {
    if (radioValue === "ALL") return true;
    else return task.status === radioValue;
  }

  const newTaskLIst = tasksList.filter((task) => filterTask(task));

  return (
    <>
      {/* //here the addtask functionality is called and the option is given to filter the list of tasks */}
      <Box
        border="1px"
        borderColor="gray.200"
        borderRadius={7}
        p={{ base: 3, md: 5 }}
        mt={{ base: 5, md: 10 }}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <AddTask />
        <RadioGroup
          colorScheme="cyan"
          onChange={setRadioValue}
          value={radioValue}
        >
          <Stack direction={{ base: "column", md: "row" }}>
            <Radio size="sm" value="ALL">
              All
            </Radio>
            <Radio size="sm" value="INPROGRESS">
              In Progress
            </Radio>
            <Radio size="sm" value="DONE">
              Done
            </Radio>
            <Radio size="sm" value="COMPLETE">
              Complete
            </Radio>
          </Stack>
        </RadioGroup>
      </Box>

      {/* Here the tasks will be listed with or without filters. */}
      <Box
        overflow="scroll"
        border="1px"
        borderColor="gray.200"
        borderRadius={7}
        p={{ base: 3, md: 5 }}
        mt={{ base: 3, md: 5 }}
      >
        {newTaskLIst.map((task: TaskInterface) => (
          <Task key={task.id} {...task} />
        ))}
      </Box>
    </>
  );
};

export default TaskList;
