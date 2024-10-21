// src/redux/taskSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    taskQueue: JSON.parse(localStorage.getItem('tasks')) || [],
    completedTasks: [],
};

const homeworkSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        addTask: (state, action) => {
            if (!Array.isArray(state.taskQueue)) {
                state.taskQueue = []
                localStorage.setItem(JSON.stringify([]))
            }
            state.taskQueue.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.taskQueue));

        },
        deleteTask: (state, action) => {
            const index = state.taskQueue.findIndex(task => task.id === action.payload);
            if (index !== -1) {
                state.taskQueue.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(state.taskQueue));
            }
        },
        completeTask: (state, action) => {
            const index = state.taskQueue.findIndex(task => task.id === action.payload);
            if (index !== -1) {
                const completedTask = state.taskQueue.splice(index, 1)[0];
                completedTask.completed = true;
                state.completedTasks.push(completedTask);
                localStorage.setItem('tasks', JSON.stringify(state.taskQueue));
            }
        },
        viewPendingTasks: (state) => {
            return state.taskQueue.filter(task => !task.completed);
        },
        viewCompletedTasks: (state) => {
            return state.completedTasks;
        },
    },
});

export const { addTask, deleteTask, completeTask, viewPendingTasks, viewCompletedTasks } = homeworkSlice.actions;
export default homeworkSlice.reducer;
