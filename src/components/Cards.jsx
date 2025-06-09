function Cards({ heading, subheading, children }) {
    return (
        <div className="px-4 py-6 rounded-lg border border-gray-300 bg-white dark:bg-gray-300 divide-y-2 divide-gray-50 flex flex-col gap-4">
            <div>
                <h2 className="font-semibold text-xl text-gray-700 ">
                    {heading}
                </h2>
                <h3 className="text-sm text-gray-400 font-semibold mb-6">
                    {subheading}
                </h3>
            </div>
            {children}
        </div>
    );
}

export default Cards;
