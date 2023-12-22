import { useState } from "react";
import OptionIcon from "../assets/option-icon.svg";

const BubbleChat = (props) => {
    const { message, position = "right", deleteAction, editAction, bubbleColorIndex } = props;
    const [isOption, setOption] = useState(false);

    const getTime = (date) => {
        const time = date.split("T")[1];
        return time.substring(0, 5);
    };

    const handleOpenOption = () => {
        setOption((currentValue) => !currentValue);
    };

    const bubbleColor = [
        {
            text: "text-chat-tulip-tree",
            bubbleBg: "bg-chat-pearl-lusta",
        },
        {
            text: "text-chat-ocean-green",
            bubbleBg: "bg-chat-iceberg",
        },
    ];

    return (
        <div className="flex w-full flex-col my-4">
            <div>
                <span className={`mb-1 font-bold block w-full ${position === "right" ? "text-right text-chat-medium-purple" : "text-left " + bubbleColor[bubbleColorIndex].text}`}>
                    {position === "left" ? message.owner.firstName : "You"}
                </span>
                <div className={`flex gap-4 items-start relative ${position === "right" ? "justify-end" : "justify-start"}`}>
                    <div className={`${position === "right" ? "bg-chat-blue-chalk" : bubbleColor[bubbleColorIndex].bubbleBg} p-3.5 rounded min-w-[132px]`}>
                        <p className=" text-primary-emperor">{message.message}</p>
                        <span className="text-primary-emperor text-xs">{getTime(message.publishDate)}</span>
                    </div>
                    {position === "right" && (
                        <div className={position === "right" ? "relative order-first" : "relative order-last"}>
                            <button className="w-6 h-6 aspect-square" onClick={handleOpenOption}>
                                <img src={OptionIcon} alt="option icon" />
                            </button>
                            {isOption && (
                                <div className="flex absolute bg-white flex-col border border-gray-border divide-y divide-gray-border rounded min-w-[124px]">
                                    <button
                                        className="py-1.5 px-4 text-left text-primary-royal-blue"
                                        onClick={() => {
                                            editAction(message.message);
                                            handleOpenOption();
                                        }}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="py-1.5 px-4 text-left text-notification-brunt-sienna"
                                        onClick={() => {
                                            deleteAction(message.id);
                                            handleOpenOption();
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default BubbleChat;
