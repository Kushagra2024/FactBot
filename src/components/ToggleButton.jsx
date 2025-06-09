function ToggleButton({ checked, handleToggle, name }) {
    return (
        <label
            className={`w-12 h-6 rounded-xl border-2 relative cursor-pointer ${
                checked
                    ? "border-blue-600 bg-blue-600"
                    : "border-gray-600 bg-gray-600"
            }`}
        >
            <input
                type="checkbox"
                name={name}
                checked={checked}
                onChange={handleToggle}
                className="opacity-0 cursor-pointer"
            />
            <div
                className={`aspect-square h-full bg-gray-50 rounded-2xl absolute top-0 right-0 transition-transform duration-300 ${
                    checked ? "" : "-translate-x-[120%]"
                } `}
            ></div>
        </label>
    );
}

export default ToggleButton;
