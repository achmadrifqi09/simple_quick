import { useEffect, useState } from "react";
import PopupBox from "../components/PopupBox";
import SearchIcon from "../assets/search-icon.svg";
import Spinner from "./Spinner";
import axios from "axios";
import PersonIcon from "../assets/person-icon.svg";
import PersonActiveIcon from "../assets/person-active-icon.svg";
import { useDebounce } from "use-debounce";
import { useSubPageStore } from "../store";

const Inbox = () => {
    const [roomChatData, setRoomChatData] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const [isLoading, setLoading] = useState(false);
    const [keyword, setKeyword] = useState("");
    const [keywordValue] = useDebounce(keyword, 600);
    const [filterData, setFilterData] = useState([]);
    const { setSubPage, setSubPageData } = useSubPageStore();

    const handleEntringRoomChat = (roomChatData) => {
        setSubPage("RoomChat");
        setSubPageData(roomChatData);
    };

    const converDate = (date) => {
        const newData = new Date(date);
        return `${newData.getDay()}/${newData.getMonth()}/${newData.getFullYear()}`;
    };

    const getParticipant = (messages) => {
        let userIds = [];
        messages.forEach((value) => {
            const userId = value.owner.id;
            if (!userIds.includes(userId)) {
                userIds.push(userId);
            }
        });
        return userIds.length;
    };

    const getMessage = async (data) => {
        try {
            const messages = await axios(`${import.meta.env.VITE_API_BASE_URL}/post/${data.id}/comment`, {
                headers: {
                    "app-id": import.meta.env.VITE_API_APP_ID,
                },
            });

            const participant = getParticipant(messages.data.data);
            const message = messages.data.data.sort((a, b) => a.publishDate - b.publishDate).pop();

            message.publishDate = converDate(message.publishDate);
            data.participant = participant;
            data.latestMessage = message;

            return data;
        } catch {
            setErrorMessage("An error occurred while retrieving data");
        }
    };

    useEffect(() => {
        setLoading(true);
        const fetchData = async () => {
            try {
                const rooms = await axios(`${import.meta.env.VITE_API_BASE_URL}/user/${import.meta.env.VITE_DEFAULT_USER}/post?page=1&limit=5`, {
                    headers: {
                        "app-id": import.meta.env.VITE_API_APP_ID,
                    },
                });
                const result = await Promise.all(
                    rooms.data.data.map(async (room) => {
                        return await getMessage(room);
                    })
                );
                setRoomChatData(result);
            } catch {
                setErrorMessage("An error occurred while retrieving data");
            } finally {
                setLoading(false);
                setErrorMessage(null);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const filterResult = roomChatData.filter((result) => {
            if (keywordValue === "") {
                return result;
            }
            if (result.text.toLowerCase().includes(keywordValue.toLowerCase())) {
                return result;
            }
        });
        setFilterData(filterResult);
    }, [keywordValue, roomChatData]);

    return (
        <PopupBox>
            <div className="pt-6 px-8 w-full rounded-t mb-6">
                <div className="rounded border border-primary-gray w-full relative">
                    <input type="text" className="w-full rounded py-1.5 px-14 placeholder:text-[#333333]" placeholder="Search" onChange={(e) => setKeyword(e.target.value)} />
                    <img src={SearchIcon} alt="search icon" className="absolute top-1.5 right-14" />
                </div>
            </div>
            {errorMessage && (
                <div className="absolute bottom-0 py-6 px-8 w-full">
                    <div className="w-full bg-chat-pearl-lusta p-3 rounded font-bold">{errorMessage}</div>
                </div>
            )}

            <div className="px-8 h-max overflow-y-scroll no-scrollbar max-h-[58vh]">
                <div className="min-h-[60vh] bg-white">
                    {isLoading && (
                        <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
                            <Spinner variant="primary" />
                            <span className="block text-primary-emperor">Loading Chat ...</span>
                        </div>
                    )}
                    {filterData.length === 0 && (
                        <div className="flex h-[60vh] items-center justify-center flex-col gap-4">
                            <span className="block text-primary-emperor">Not Found</span>
                        </div>
                    )}
                    {filterData.map((room, i) => {
                        return (
                            <button className="text-left w-full flex pt-6 pb-6 gap-10 border-b border-b-primary-gray" key={i} onClick={() => handleEntringRoomChat(room)}>
                                <div className="flex relative">
                                    <div className="w-9 h-9 bg-primary-alto rounded-full flex items-center justify-center aspect-square">
                                        <img src={PersonIcon} alt="person icon" className="w-4 h-4 aspect-square" />
                                    </div>
                                    <div className="w-9 h-9 bg-notification-malibu rounded-full flex items-center justify-center aspect-square absolute left-[18px]">
                                        <img src={PersonActiveIcon} alt="person icon" className="w-4 h-4 aspect-square" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex gap-4 items-center max-xs:flex-col max-xs:gap-1">
                                        <span className="text-left block font-bold text-primary-royal-blue max-xs:w-full">{room.text}</span>
                                        <span className="text-left block text-primary-emperor text-sm leading-4 max-xs:w-full">{room.latestMessage?.publishDate}</span>
                                    </div>
                                    <span className="block text-primary-emperor font-bold text-sm">{room.latestMessage?.owner?.firstName}</span>
                                    <span className="block text-primary-emperor text-sm xs:leading-3">{room.latestMessage?.message}</span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </PopupBox>
    );
};

export default Inbox;
