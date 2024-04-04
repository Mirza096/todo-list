#! /usr/bin/env node


import inquirer from "inquirer";

interface ITodoList {
    task: string;
    completed: boolean;
}

const todoList: ITodoList[] = [];

const mainMenu = async () => {
    const { action } = await inquirer.prompt({
        type: "list",
        name: "action",
        message: "What would you like to do with the task?",
        choices: ["Add Task", "View Task", "Mark as complete", "Delete Task", "Exit"],
    });

    switch (action) {
        case "Add Task":
            await addTask();
            break;
        case "View Task":
            viewTask();
            break;
        case "Mark as complete":
            await markAsComplete();
            break;
        case "Delete Task":
            // Implement delete task logic
            break;
        case "Exit":
            console.log("Goodbye!");
            return;
    }

    // Call mainMenu again for the next action
    mainMenu();
};

const addTask = async () => {
    const { task } = await inquirer.prompt({
        type: "input",
        name: "task",
        message: "Enter the task description:",
    });

    todoList.push({ task, completed: false });
    console.log("Task added successfully!");
};

const viewTask = () => {
    console.log("Viewing tasks:");
    todoList.forEach((item, index) => {
        console.log(`${index + 1}. ${item.task} [${item.completed ? "Completed" : "Pending"}]`);
    });
};

const markAsComplete = async () => {
    const { taskIndex } = await inquirer.prompt({
        type: "number",
        name: "taskIndex",
        message: "Enter the task number to mark as complete:",
    });

    if (taskIndex >= 1 && taskIndex <= todoList.length) {
        todoList[taskIndex - 1].completed = true;
        console.log("Task marked as complete!");
    } else {
        console.log("Invalid task number.");
    }
};

// Call mainMenu to start the program
mainMenu();
