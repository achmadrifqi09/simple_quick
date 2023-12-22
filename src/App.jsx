import FloatingButton from "./components/FloatingButton";
import MessageIcon from "./assets/message-icon.svg";
import MessageActiveIcon from "./assets/message-active-icon.svg";
import TaskIcon from "./assets/task-icon.svg";
import TaskActiveIcon from "./assets/task-active-icon.svg";
import Inbox from "./components/Inbox";
import { useSubPageStore } from "./store";
import RoomChat from "./components/RoomChat";
import Task from "./components/Task";

function App() {
    const { subPage } = useSubPageStore();
    const subMenus = [
        {
            name: "Task",
            icon: TaskIcon,
            activeIcon: TaskActiveIcon,
            activeBg: "bg-notification-rajah",
        },
        {
            name: "Inbox",
            icon: MessageIcon,
            activeIcon: MessageActiveIcon,
            activeBg: "bg-primary-royal-blue",
        },
    ];

    return (
        <main>
            <div className="fixed bottom-6 right-6 max-md:left-6 space-y-6">
                {subPage === "Inbox" && <Inbox />}
                {subPage === "RoomChat" && <RoomChat />}
                {subPage === "Task" && <Task />}
                <FloatingButton subMenu={subMenus} />
            </div>
        </main>
    );
}

export default App;
