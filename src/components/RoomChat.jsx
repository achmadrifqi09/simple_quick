import PopupBox from "./PopupBox";
import { useSubPageStore, useSubMenuStore } from "../store";
import BackIcon from "../assets/back-icon.svg";
import XIcon from "../assets/x-icon.svg";
import Spinner from "./Spinner";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import BubbleChat from "./BubbleChat";

const RoomChat = () => {
    const { subPageData, setSubPage, resetSubPage } = useSubPageStore();
    const { deactiveSubMenu } = useSubMenuStore();
    const [errorMessage, setErrorMessage] = useState(null);
    const [messages, setMessages] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [onSubmit, setOnSubmit] = useState(false);
    let userIds = [];

    const handleBackButton = () => {
        setSubPage("Inbox");
    };

    const handleClose = () => {
        resetSubPage();
        deactiveSubMenu();
    };

    const handleSendMessage = async () => {
        setOnSubmit(true);
        try {
            await axios.post(
                `${import.meta.env.VITE_API_BASE_URL}/comment/create`,
                {
                    message: message,
                    owner: import.meta.env.VITE_DEFAULT_USER,
                    post: subPageData.id,
                },
                {
                    headers: {
                        "app-id": import.meta.env.VITE_API_APP_ID,
                    },
                }
            );
            setMessage("");
            fetchRoomMessage();
        } catch {
            setErrorMessage("An error occurred while retrieving data");
        } finally {
            setOnSubmit(false);
        }
    };

    const handleDelete = async (messageId) => {
        const res = await axios.delete(`${import.meta.env.VITE_API_BASE_URL}/comment/${messageId}`, {
            headers: {
                "app-id": import.meta.env.VITE_API_APP_ID,
            },
        });
        fetchRoomMessage();
    };

    const handleUpdate = (message) => {
        setMessage(`${message}  |  Service tidak menyediakan endpoint update`);
    };

    const handleChangeInput = (e) => {
        setMessage(e.target.value);
    };

    const handleBubbleColorIndex = (userId) => {
        if (!userIds.includes(userId)) {
            userIds.push(userId);
            return userIds.length % 2 === 0 ? 0 : 1;
        } else {
            const userIndex = userIds.findIndex((id) => id === userId);
            return userIndex % 2 === 0 ? 0 : 1;
        }
    };

    const getTime = (dateValue) => {
        const date = new Date(dateValue);
        return `${date.getHours()}:${date.getMinutes()}`;
    };

    const groupByDate = (groupedMessage) => {
        const groups = groupedMessage.reduce((groups, groupedMessage) => {
            const date = new Date(groupedMessage.publishDate).toString().split(" ").slice(0, 4).join(" ");

            if (!groups[date]) {
                groups[date] = [];
            }

            groupedMessage.time = getTime(groupedMessage.publishDate);
            groups[date].push(groupedMessage);
            return groups;
        }, {});

        const grouped = Object.keys(groups).map((date) => {
            return {
                date,
                messageDatas: groups[date],
            };
        });

        const result = sortData(grouped);
        return result;
    };

    const sortData = (sortedData) => {
        sortedData.sort(function (a, b) {
            let key1 = a.messageDatas[0].publishDate;
            let key2 = b.messageDatas[0].publishDate;

            if (key1 < key2) {
                return -1;
            } else if (key1 == key2) {
                return 0;
            } else {
                return 1;
            }
        });

        return sortedData;
    };

    const fetchRoomMessage = async () => {
        try {
            const response = await axios(`${import.meta.env.VITE_API_BASE_URL}/post/${subPageData.id}/comment`, {
                headers: {
                    "app-id": import.meta.env.VITE_API_APP_ID,
                },
            });
            const groupedMessage = groupByDate(response.data.data);

            setMessages(groupedMessage);
        } catch {
            setErrorMessage("An error occurred while retrieving data");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchRoomMessage();
    }, []);

    return (
        <PopupBox>
            <div className="pb-6 border-b border-b-primary-gray rounded-t">
                <div className="flex pt-6 px-8 w-full justify-between items-center">
                    <div className="flex items-center gap-3.5">
                        <button className="aspect-square w-6 h-6" onClick={handleBackButton}>
                            <img src={BackIcon} alt="back icon" />
                        </button>
                        <div>
                            <span className="font-bold text-primary-royal-blue block">{subPageData.text}</span>
                            <span className=" text-primary-emperor block">{subPageData.participant} Participant</span>
                        </div>
                    </div>
                    <button className="aspect-square w-6 h-6" onClick={handleClose}>
                        <img src={XIcon} alt="back icon" />
                    </button>
                </div>
            </div>
            {isLoading && (
                <div className="absolute bottom-16 py-6 px-8 w-full z-10">
                    <div className="w-full bg-sticker-zumthor p-3 rounded flex items-center gap-2.5">
                        <Spinner variant="secondary" />
                        <span className="block font-bold text-primary-emperor">Please wait while we connect you with one of our team ...</span>
                    </div>
                </div>
            )}

            <div className="pl-8 pr-6 h-max overflow-y-scroll max-h-[58vh] pt-4">
                <div className="bg-white mb-20">
                    {messages.map((message, i) => {
                        return (
                            <div key={i}>
                                <div className="w-full flex items-center gap-4">
                                    <span className="block h-[1px] w-full bg-primary-emperor"></span>
                                    <span className="text-primary-emperor font-bold min-w-max">{message.date}</span>
                                    <span className="block h-[1px] w-full bg-primary-emperor"></span>
                                </div>
                                {message.messageDatas.map((messageData, x) => {
                                    return (
                                        <BubbleChat
                                            key={x}
                                            position={messageData.owner.id === import.meta.env.VITE_DEFAULT_USER ? "right" : "left"}
                                            bubbleColorIndex={handleBubbleColorIndex(messageData.owner.id)}
                                            message={messageData}
                                            deleteAction={handleDelete}
                                            editAction={handleUpdate}
                                        />
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
            <div className="w-full absolute bottom-0 px-8">
                <div className=" pb-6 pt-4 bg-white rounded-b flex gap-3">
                    <input
                        type="text"
                        className="w-full rounded py-1.5 px-4 border border-[#333333] placeholder:text-[#333333]"
                        placeholder="Type a new message"
                        onChange={(e) => handleChangeInput(e)}
                        value={message || ""}
                    />
                    <button className="py-1.5 px-4 bg-primary-royal-blue text-white rounded disabled:opacity-50" onClick={handleSendMessage} disabled={onSubmit}>
                        Send
                    </button>
                </div>
            </div>
        </PopupBox>
    );
};

export default RoomChat;
