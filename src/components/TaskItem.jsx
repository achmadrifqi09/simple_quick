import { useState } from "react";
import CheckIcon from "../assets/check-icon.svg";
import UncheckIcon from "../assets/uncheck-icon.svg";
import ArrowTopIcon from "../assets/arrow-top.svg";
import OptionVerticalIcon from "../assets/option-vertical.svg";
import ClockIcon from "../assets/clock-icon.svg";
import PencilIcon from "../assets/pencil-icon.svg";

const TaskItem = (props) => {
    const { checkedId, data } = props;
    const [checkbox, setCheckbox] = useState(data.is_done);
    const [isExpand, setExpand] = useState(true);
    const [isDelete, setDelete] = useState(false);

    const titleStyle = {
        finished: "block text-primary-gray font-bold line-through",
        notFinished: "block text-primary-emperor font-bold",
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

    const handleChange = (e) => {};

    return (
        <div className="my-6 border-b border-b-primary-gray pb-4 flex gap-4">
            <div className="flex gap-4">
                <div className="relative">
                    <label htmlFor={checkedId} className="block w-6 h-6 relative z-10">
                        <input type="checkbox" id={checkedId} className="checkbox opacity-0" onChange={handleChecked} checked={checkbox} />
                    </label>
                    <img src={checkbox ? CheckIcon : UncheckIcon} alt="checkbox icon" className="w-6 h-6 absolute top-0" />
                </div>
            </div>
            <div className="w-full space-y-4">
                <div className="flex justify-between items-center">
                    <span className={checkbox ? titleStyle.notFinished : titleStyle.finished}>{data.title}</span>
                    <div className="flex gap-4 items-center relative">
                        {!checkbox && <span className="block text-sm text-notification-brunt-sienna">2 days left</span>}
                        <span className="block text-sm text-primary-emperor">{data.deadline}</span>
                        <button className="aspect-square" onClick={handleExpand}>
                            <img src={ArrowTopIcon} alt="expand icon" className={isExpand ? "rotate-0" : "rotate-180"} />
                        </button>
                        <button className="aspect-square" onClick={handleExpandDelete}>
                            <img src={OptionVerticalIcon} alt="expand icon" />
                        </button>
                        {isDelete && (
                            <div className="absolute right-0 top-6 bg-white rounded border border-primary-gray py-2 px-4 min-w-[126px]">
                                <button className="text-left text-notification-brunt-sienna">Delete</button>
                            </div>
                        )}
                    </div>
                </div>
                {isExpand && (
                    <div>
                        <div className="flex gap-4">
                            <img src={ClockIcon} alt="schedule icon" />
                            <input type="date" className="py-2 px-4 border border-primary-gray rounded" value={data.deadline}/>
                        </div>
                        <div className="flex gap-4">
                            <img src={PencilIcon} alt="schedule icon" />
                            <input type="text" className=" border-primary-gray rounded w-full disabled:bg-white" onChange={handleChange} disabled />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskItem;
