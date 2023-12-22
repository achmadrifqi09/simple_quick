import PopupBox from "./PopupBox";
import ArrowDownIcon from "../assets/arrow-down.svg";
import { useEffect, useState } from "react";
import TaskItem from "./TaskItem";
import TaskForm from "./TaskForm";
import axios from "axios";

const Task = () => {
    const [tasks, setTasks] = useState([]);
    const [isTaskCategory, setTaskCategory] = useState(false);
    const [currentCategory, setCurrentCategory] = useState("Personal Errands");
    const taskCategory = ["Personal Errands", "Urgent To-Do"];
    const [isForm, setForm] = useState(false);

    const handleChageDropdown = (e) => {
        setCurrentCategory(e.target.innerText);
        setTaskCategory((value) => !value);
    };

    const handleChangeDone = () => {};

    const fetchTask = async () => {
        const response = await axios(`${import.meta.env.VITE_API_BASE_URL_TASK}/todos`);
        setTasks(response.data);
    };

    console.log(tasks);

    useEffect(() => {
        fetchTask();
    }, []);

    return (
        <PopupBox>
            <div className="pt-6 pr-8 pl-[72px] w-full rounded-t mb-6 flex justify-between gap-4">
                <div id="cars" className="py-2 px-4 border border-primary-emperor rounded flex hover:cursor-default" onClick={() => setTaskCategory((value) => !value)}>
                    <span className="text-primary-emperor">{currentCategory}</span>
                    <img src={ArrowDownIcon} alt="" />
                </div>
                {isTaskCategory && (
                    <div className="absolute left-8 top-16 mt-2 rounded border border-primary-gray min-w-[288px] bg-white z-20">
                        <ul className=" divide-y divide-primary-gray hover:cursor-default">
                            {taskCategory.map((value, i) => {
                                return (
                                    <li className="p-3 text-primary-emperor" onClick={(e) => handleChageDropdown(e)} key={i}>
                                        {value}
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                )}
                <button
                    className="py-2 px-4 bg-primary-royal-blue text-white rounded disabled:opacity-50"
                    onClick={() => {
                        setForm((value) => !value);
                    }}
                >
                    New Task
                </button>
            </div>
            {/* {errorMessage && (
                <div className="absolute bottom-0 py-6 px-8 w-full">
                    <div className="w-full bg-chat-pearl-lusta p-3 rounded font-bold"></div>
                </div>
            )} */}

            <div className="px-8 h-max overflow-y-scroll no-scrollbar max-h-[58vh]">
                <div className="min-h-[60vh] bg-white">
                    {isForm && <TaskForm />}
                    {tasks.map((task, i) => {
                        return <TaskItem key={i} data={task} />;
                    })}
                    {/* {isLoading && (
                        <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
                            <Spinner variant="primary" />
                            <span className="block text-primary-emperor">Loading Chat ...</span>
                        </div>
                    )} */}
                </div>
            </div>
        </PopupBox>
    );
};
export default Task;
