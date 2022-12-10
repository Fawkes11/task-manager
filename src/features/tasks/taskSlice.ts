import { createSlice } from "@reduxjs/toolkit";
import { Task } from "../../interfaces/interfaces";

const initialState: Task[] = [
  {
    id: "0001",
    name: "Sweep the room",
    description: "First task description",
    status: "INPROGRESS",
    mainId: "NONE",
    indent: 1,
  },
  {
    id: "0002",
    name: "Go to market",
    description: "Task description",
    status: "INPROGRESS",
    mainId: "0001",
    indent: 12,
  },
  {
    id: "0003",
    name: "Buy broom",
    description: "Task description",
    status: "INPROGRESS",
    mainId: "0002",
    indent: 23,
  },
  {
    id: "0004",
    name: "Laundry",
    description: "Task description",
    status: "INPROGRESS",
    mainId: "NONE",
    indent: 1,
  },
];

export const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask: (state, action) => {
      if (action.payload.mainId !== "NONE") {
        const taskIndex = state.findIndex(
          (task) => task.id === action.payload.mainId
        );
        state.splice(taskIndex + 1, 0, action.payload);
      } else state.push(action.payload);
    },

    deleteTask: (state, action) => {
      const taskFound = state.find((task) => task.id === action.payload);
      if (taskFound) {
        state.splice(state.indexOf(taskFound), 1);
      }
    },

    updateTask: (state, action) => {
      const { id, status } = action.payload;
      const taskFound = state.find((task) => task.id === id);
      if (taskFound) {
        taskFound.status = status;
      }
    },
  },
});



export default taskSlice.reducer;

export const { addTask, deleteTask, updateTask } = taskSlice.actions;
