const Spinner = (props) => {
    const { variant = "primary" } = props;

    const spinnerStyle = {
        primary: "w-12 h-12 rounded-full animate-spin border-8 border-solid border-[#C4C4C4] border-r-transparent border-t-transparent bg-[#F8F8F8]",
        secondary: "aspect-square w-8 h-8 rounded-full animate-spin border-4 border-solid border-primary-royal-blue border-r-transparent border-t-transparent bg-white",
    };

    const innerSpinnerStyle = {
        primary: "w-full h-full rounded-full bg-white",
        secondary: "w-full h-full rounded-full bg-[#E9F3FF]",
    };

    return (
        <div className={spinnerStyle[variant]}>
            <div className={innerSpinnerStyle[variant]}></div>
        </div>
    );
};

export default Spinner;
