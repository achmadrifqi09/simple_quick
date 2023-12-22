const PopupBox = (props) => {
    const { children } = props;
    return <div className="bg-white rounded h-[70vh] w-full min-w-[272px] md:w-screen max-w-[637px] relative flex flex-col">{children}</div>;
};

export default PopupBox;
