import { useState } from 'react';
import CheckIcon from '../assets/check-icon.svg';
import UncheckIcon from '../assets/uncheck-icon.svg';
import ArrowTopIcon from '../assets/arrow-top.svg';
import OptionVerticalIcon from '../assets/option-vertical.svg';
import ClockIcon from '../assets/clock-icon.svg';
import PencilIcon from '../assets/pencil-icon.svg';

const TaskForm = (props) => {
    const { checkedId } = props;
    const [checkbox, setCheckbox] = useState(false);
    const [isExpand, setExpand] = useState(true);
    const [isDelete, setDelete] = useState(false);
    const [inputType, setInputType] = useState('text');
    const [inputCondition, setInputCondition] = useState({
        title: true,
        date: false,
        description: true,
    });

    const titleStyle = {
        finished:
            'block text-primary-gray line-through py-2 px-4 border border-primary-gray rounded w-full',
        notFinished:
            'block text-primary-emperor py-2 px-4 border border-primary-gray rounded w-full',
    };

    const handleChecked = () => {
        setCheckbox(!checkbox);
    };

    const handleExpand = () => {
        setExpand((value) => !value);
    };

    const handleExpandDelete = () => {
        setDelete((value) => !value);
    };

    const handleInputCondition = (key) => {
        setInputCondition({
            ...inputCondition,
            [key]: !inputCondition[key],
        });
    };

    return (
        <div className="my-6 border-b border-b-primary-gray pb-4 flex gap-4">
            <div className="flex gap-4 mt-2">
                <div className="relative">
                    <label
                        htmlFor={checkedId}
                        className="block w-6 h-6 relative z-10"
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
                        src={checkbox ? CheckIcon : UncheckIcon}
                        alt="checkbox icon"
                        className="w-6 h-6 absolute top-0"
                    />
                </div>
            </div>
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    <div className="w-full max-w-[320px]">
                        <input
                            type="text"
                            className={
                                !checkbox
                                    ? titleStyle.notFinished
                                    : titleStyle.finished
                            }
                            placeholder="Type Task Title"
                        />
                    </div>
                    <div className="flex gap-4 items-center relative">
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
                                <button className="text-left text-notification-brunt-sienna">
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
                                type={inputType}
                                className="py-2 px-4 border border-primary-gray rounded"
                                placeholder="Set Date"
                                onFocus={(e) => {
                                    setInputType(
                                        e.target.type === 'text'
                                            ? 'date'
                                            : 'text'
                                    );
                                }}
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
                                value="lorem tesetin"
                                disabled={inputCondition.description}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskForm;
