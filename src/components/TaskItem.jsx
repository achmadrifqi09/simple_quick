import { useEffect, useState } from 'react';
import CheckIcon from '../assets/check-icon.svg';
import UncheckIcon from '../assets/uncheck-icon.svg';
import ArrowTopIcon from '../assets/arrow-top.svg';
import OptionVerticalIcon from '../assets/option-vertical.svg';
import ClockIcon from '../assets/clock-icon.svg';
import PencilIcon from '../assets/pencil-icon.svg';
import axios from 'axios';

const TaskItem = (props) => {
    const { checkedId, data, handleDelete } = props;
    const [checkbox, setCheckbox] = useState(false);
    const [isExpand, setExpand] = useState(true);
    const [isDelete, setDelete] = useState(false);
    const [deadline, setDeadline] = useState(null);
    const [inputCondition, setInputCondition] = useState({
        title: true,
        date: false,
        description: true,
    });

    const titleStyle = {
        finished: 'block text-primary-gray font-bold line-through',
        notFinished: 'block text-primary-emperor font-bold',
    };

    const handleChecked = async () => {
        setCheckbox(!checkbox);
        try {
            const res = await axios.put(
                `${import.meta.env.VITE_API_BASE_URL_TASK}/todos/${data.id}`,
                {
                    ...data,
                    is_done: !checkbox,
                }
            );
        } catch {
            console.log('errors');
        }
    };

    const handleExpand = () => {
        setExpand((value) => !value);
    };

    const handleExpandDelete = () => {
        setDelete((value) => !value);
    };

    const handleChange = (e) => {};

    const formatDate = (date) => {
        const splitDate = date.split('-');
        setDeadline(`${splitDate[2]}-${splitDate[1]}-${splitDate[0]}`);
    };

    const getNumberOfDays = (date) => {
        const today = new Date();
        const splitDate = date.split('-');
        const endDate = new Date(
            `${splitDate[1]}/${splitDate[0]}/${splitDate[2]}`
        );

        let difference = endDate.getTime() - today.getTime();
        let TotalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return TotalDays;
    };

    const handleInputCondition = (key) => {
        setInputCondition({
            ...inputCondition,
            [key]: !inputCondition[key],
        });
    };

    useEffect(() => {
        formatDate(data.deadline);
        setCheckbox(JSON.parse(data.is_done));
    }, []);

    return (
        <div className="my-6 border-b border-b-primary-gray pb-4 flex gap-4">
            <div className="flex gap-4">
                <div className="relative">
                    <label
                        htmlFor={checkedId}
                        className="block w-6 h-6 relative z-10 cursor-pointer"
                    >
                        <input
                            type="checkbox"
                            id={checkedId}
                            className="checkbox opacity-0"
                            onChange={handleChecked}
                            checked={checkbox}
                        />
                    </label>
                    <img
                        src={checkbox == true ? CheckIcon : UncheckIcon}
                        alt="checkbox icon"
                        className="w-6 h-6 absolute top-0"
                    />
                </div>
            </div>
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        className={
                            checkbox === true
                                ? titleStyle.finished
                                : titleStyle.notFinished
                        }
                        value={data.title || ''}
                        onChange={handleChange}
                    />

                    <div className="flex gap-4 items-center relative">
                        {checkbox === false && (
                            <span className="block text-sm text-notification-brunt-sienna">
                                {getNumberOfDays(data.deadline)} days left
                            </span>
                        )}
                        <span className="block text-sm text-primary-emperor">
                            {data.deadline}
                        </span>
                        <button
                            className="aspect-square"
                            onClick={handleExpand}
                        >
                            <img
                                src={ArrowTopIcon}
                                alt="expand icon"
                                className={isExpand ? 'rotate-0' : 'rotate-180'}
                            />
                        </button>
                        <button
                            className="aspect-square"
                            onClick={handleExpandDelete}
                        >
                            <img src={OptionVerticalIcon} alt="expand icon" />
                        </button>
                        {isDelete && (
                            <div className="absolute right-0 top-6 bg-white rounded border border-primary-gray py-2 px-4 min-w-[126px]">
                                <button
                                    className="text-left text-notification-brunt-sienna"
                                    onClick={() => handleDelete(data.id)}
                                >
                                    Delete
                                </button>
                            </div>
                        )}
                    </div>
                </div>
                {isExpand && (
                    <div className="space-y-2">
                        <div className="flex gap-4">
                            <button
                                onClick={() => handleInputCondition('date')}
                            >
                                <img src={ClockIcon} alt="schedule icon" />
                            </button>
                            <input
                                type="date"
                                className="py-2 px-4 border border-primary-gray rounded"
                                value={deadline || ''}
                                onChange={handleChange}
                                disabled={inputCondition.date}
                            />
                        </div>
                        <div className="flex gap-4">
                            <button
                                onClick={() =>
                                    handleInputCondition('description')
                                }
                            >
                                <img src={PencilIcon} alt="schedule icon" />
                            </button>
                            <input
                                type="text"
                                className=" border-primary-gray rounded w-full disabled:bg-white"
                                onChange={handleChange}
                                disabled={inputCondition.description}
                                value={data.description || 'No description'}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
