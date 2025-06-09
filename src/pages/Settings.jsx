import { useContext, useEffect, useState } from "react";
import Cards from "../components/Cards";
import Header from "../components/Header";
import ToggleButton from "../components/ToggleButton";
import {
    ChevronRightIcon,
    ExclamationTriangleIcon,
    TrashIcon,
} from "@heroicons/react/16/solid";
import Modal from "../components/Modal";
import { conversationThreadContext, userProfileContext } from "../App";

function Settings() {
    const defaultValues = {
        first_name: "",
        last_name: "",
        email: "",
        timezone: "asia Time (UTC-8)",
        response_style: "Detailed - Comprehensive facts with explanations",
        num_of_facts: "7 Facts",
        auto_save: true,
        categories: [
            "science",
            "history",
            "technology",
            "nature",
            "sports",
            "arts",
        ],
        data_collection: true,
    };

    const [formData, setFormData] = useState(defaultValues);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const { setMessages } = useContext(conversationThreadContext);
    const { userProfile, setUserProfile } = useContext(userProfileContext);

    function handleChange(e) {
        const { name, value, type, checked } = e.target;

        setFormData((prev) => {
            return { ...prev, [name]: type === "checkbox" ? checked : value };
        });
    }

    function handleMultipleCheckBoxInput(e) {
        const { value, checked } = e.target;

        setFormData((prev) => {
            const categories = checked
                ? [...prev.categories, value]
                : prev.categories.filter((item) => item !== value);

            return { ...prev, categories };
        });
    }

    function handleReset() {
        setFormData({
            first_name: "",
            last_name: "",
            email: "",
            timezone: "asia Time (UTC-8)",
            response_style: "Detailed - Comprehensive facts with explanations",
            num_of_facts: "7 Facts",
            auto_save: true,
            categories: [
                "science",
                "history",
                "technology",
                "nature",
                "sports",
                "arts",
            ],
            data_collection: true,
        });
    }

    function handleFormSubmission(e) {
        e.preventDefault();

        localStorage.setItem("settings", JSON.stringify(formData));

        setUserProfile((prev) => {
            return {
                ...prev,
                name: `${formData.first_name} ${formData.last_name}`,
                email: formData.email,
            };
        });

        // setFormData((prev) => {
        //     return { ...prev, first_name: "", last_name: "", email: "" };
        // });
    }

    function handleModalClose() {
        setIsModalOpen(false);
    }

    function handleClearConversation() {
        localStorage.removeItem("factBot-Conversation-Thread");

        setMessages([
            {
                sender: "bot",
                text: "Hello, I am Fact Bot. Give me any topic and I'll share 7 fascinating facts about it. What would you like to learn about, today ?",
                status: "sent",
            },
        ]);

        handleModalClose();
    }

    useEffect(() => {
        const locallyStoredSettings = JSON.parse(
            localStorage.getItem("settings")
        );

        if (locallyStoredSettings) {
            setFormData({
                ...locallyStoredSettings,
                // first_name: "",
                // last_name: "",
                // email: "",
            });

            setUserProfile((prev) => {
                return {
                    ...prev,
                    name: `${locallyStoredSettings.first_name} ${locallyStoredSettings.last_name}`,
                    email: locallyStoredSettings.email,
                };
            });
            return;
        }

        setFormData(defaultValues);
    }, []);

    return (
        <div className="col-span-4 flex flex-col  col-start-2 ">
            {/* Header */}
            <Header
                heading={"User Settings"}
                subheading={"Customize your FactBot Experience"}
                icon={"setting"}
            />

            {/* settings */}
            <form
                className="px-12 py-5 bg-gray-50 dark:bg-gray-900 flex flex-col gap-4"
                // autoComplete="off"
                onSubmit={handleFormSubmission}
            >
                {/* Profile */}
                <Cards
                    heading={"Profile Information"}
                    subheading={"Update your personal information"}
                >
                    {/* Profile Inputs */}
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 px-2">
                        {/* Avatar */}
                        {userProfile.name && userProfile.email && (
                            <div className="flex gap-5 col-span-2">
                                <span>
                                    <img
                                        src={userProfile.avatar_url}
                                        className="aspect-square w-16"
                                    />
                                </span>
                                <div>
                                    <h2 className="text-xl font-semibold text-gray-700">
                                        {userProfile.name}
                                    </h2>
                                    <h2 className="font-semibold text-gray-400">
                                        {userProfile.email}
                                    </h2>
                                    <h3 className="text-sm text-gray-400">
                                        Member since March 2024
                                    </h3>
                                </div>
                            </div>
                        )}

                        {/* First name */}
                        <label className="text-sm text-gray-500 font-semibold flex flex-col gap-2">
                            First name
                            <input
                                type="text"
                                name="first_name"
                                placeholder="John"
                                value={formData?.first_name}
                                onChange={handleChange}
                                className="outline outline-gray-400 border-none px-3 py-1 rounded text-gray-800 focus:outline-blue-400 focus:outline-2"
                            />
                        </label>

                        {/* last name */}
                        <label className="text-sm text-gray-500 font-semibold flex flex-col gap-2">
                            Last name
                            <input
                                type="text"
                                name="last_name"
                                placeholder="Doe"
                                value={formData.last_name}
                                onChange={handleChange}
                                className="outline outline-gray-400 border-none px-3 py-1 rounded text-gray-800 focus:outline-blue-400 focus:outline-2"
                            />
                        </label>

                        {/* email address */}
                        <label className="text-sm text-gray-500 font-semibold flex flex-col gap-2">
                            Email Address
                            <input
                                type="text"
                                name="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="outline outline-gray-400 border-none px-3 py-1 rounded text-gray-800 focus:outline-blue-400 focus:outline-2"
                            />
                        </label>

                        {/* timezone */}
                        <label className="text-sm text-gray-500 font-semibold flex flex-col gap-2">
                            Timezone
                            <select
                                name="timezone"
                                value={formData.timezone}
                                onChange={handleChange}
                                className="text-gray-700 outline outline-gray-400 border-none py-1 px-2 rounded"
                            >
                                <option
                                    value="pacific Time (UTC-8)"
                                    className="text-gray-500"
                                >
                                    Pacific Time (UTC-8)
                                </option>
                                <option
                                    value="asia Time (UTC-8)"
                                    className="text-gray-500"
                                >
                                    Asia Time (UTC-8)
                                </option>
                                <option
                                    value="europe Time (UTC-8)"
                                    className="text-gray-500"
                                >
                                    Europe Time (UTC-8)
                                </option>
                            </select>
                        </label>
                    </div>
                </Cards>

                {/* Chat */}
                <Cards
                    heading={"Chat Preferences"}
                    subheading={"Customize how Factbot responds to you"}
                >
                    {/* Chat Preferences */}
                    <div className="flex flex-col gap-4">
                        {/* response Style */}
                        <div className="flex flex-col gap-2">
                            <h3 className="text-sm text-gray-500 font-semibold">
                                Response Style
                            </h3>

                            <label className="w-fit text-gray-700 flex justify-start gap-3">
                                <input
                                    type="radio"
                                    name="response_style"
                                    value="Detailed - Comprehensive facts with explanations"
                                    checked={
                                        formData.response_style ===
                                        "Detailed - Comprehensive facts with explanations"
                                    }
                                    onChange={handleChange}
                                />
                                Detailed - Comprehensive facts with explanations
                            </label>

                            <label className="w-fit text-gray-700 flex justify-start gap-3">
                                <input
                                    type="radio"
                                    name="response_style"
                                    value="Concise - Brief and to-the-point facts"
                                    checked={
                                        formData.response_style ===
                                        "Concise - Brief and to-the-point facts"
                                    }
                                    onChange={handleChange}
                                />
                                Concise - Brief and to-the-point facts
                            </label>

                            <label className="w-fit text-gray-700 flex justify-start gap-3">
                                <input
                                    type="radio"
                                    name="response_style"
                                    value="Fun - Entertaining and engaging facts"
                                    checked={
                                        formData.response_style ===
                                        "Fun - Entertaining and engaging facts"
                                    }
                                    onChange={handleChange}
                                />
                                Fun - Entertaining and engaging facts
                            </label>
                        </div>

                        {/* Number of facts */}
                        <label className="text-sm text-gray-500 font-semibold flex flex-col gap-3">
                            Number of facts per Response
                            <select
                                name="num_of_facts"
                                value={formData.num_of_facts}
                                onChange={handleChange}
                                className="text-gray-700 outline outline-gray-400 border-none py-1 px-2 rounded"
                            >
                                <option
                                    value="7 Facts"
                                    className="text-gray-500"
                                >
                                    7 Facts
                                </option>
                                <option
                                    value="8 Facts"
                                    className="text-gray-500"
                                >
                                    8 Facts
                                </option>
                                <option
                                    value="9 Facts"
                                    className="text-gray-500"
                                >
                                    9 Facts
                                </option>
                            </select>
                        </label>

                        {/* Auto-save */}
                        <div>
                            <h3 className="text-sm text-gray-500 font-semibold">
                                Auto-save Conversations
                            </h3>
                            <label className="text-sm text-gray-400 font-semibold flex justify-between items-center">
                                Automatically save all your facts discoveries
                                <ToggleButton
                                    name={"auto_save"}
                                    checked={formData.auto_save}
                                    handleToggle={handleChange}
                                />
                            </label>
                        </div>

                        {/* prefered fact categories */}
                        <div>
                            <h3 className="text-sm text-gray-500 font-semibold mb-1">
                                Preferred Fact Categories
                            </h3>
                            <div className="grid grid-cols-3">
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="science"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "science"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    Science
                                </label>
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="history"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "history"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    History
                                </label>
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="technology"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "technology"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    Technology
                                </label>
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="nature"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "nature"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    Nature
                                </label>
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="sports"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "sports"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    Sports
                                </label>
                                <label className="flex justify-start items-center gap-2.5 ">
                                    <input
                                        type="checkbox"
                                        value="arts"
                                        name="categories"
                                        checked={formData.categories?.includes(
                                            "arts"
                                        )}
                                        onChange={handleMultipleCheckBoxInput}
                                    />
                                    Arts
                                </label>
                            </div>
                        </div>
                    </div>
                </Cards>

                {/* Privacy & Security */}
                <Cards
                    heading={"Privacy & Security"}
                    subheading={"Control your data and security settings"}
                >
                    <div className="flex flex-col gap-4">
                        {/* Data collection */}
                        <div>
                            <h3 className="text-sm text-gray-500 font-semibold">
                                Data Collection
                            </h3>
                            <label className="text-sm text-gray-400 font-semibold flex justify-between items-center">
                                Allow factbot to improve using your interactions
                                <ToggleButton
                                    name={"data_collection"}
                                    checked={formData.data_collection}
                                    handleToggle={handleChange}
                                />
                            </label>
                        </div>

                        {/* Clear Conversation */}
                        <button
                            className="w-full px-3 py-2 flex justify-between border rounded-md border-red-200 text-left text-red-600 cursor-pointer"
                            onClick={() => {
                                setIsModalOpen(true);
                            }}
                        >
                            <span className="flex items-center gap-1.5">
                                <span>
                                    <TrashIcon className="aspect-square h-4" />
                                </span>
                                <p>Clear Conversation</p>
                            </span>
                            <span>
                                <ChevronRightIcon className="aspect-square h-6" />
                            </span>
                        </button>
                    </div>
                </Cards>

                {/* Buttons */}
                <div className="flex gap-3 justify-end">
                    {/* reset btn */}
                    <button
                        className="px-4 py-2 rounded-lg border border-gray-300 cursor-pointer active:scale-95 dark:bg-gray-300"
                        onClick={handleReset}
                        type="submit"
                    >
                        Reset to defaults
                    </button>

                    {/* Save changes btn */}
                    <button
                        className="px-4 py-2 rounded-lg bg-blue-700 text-white cursor-pointer active:scale-95"
                        type="submit"
                    >
                        Save Changes
                    </button>
                </div>
            </form>

            {isModalOpen && (
                <Modal closeModel={handleModalClose}>
                    <div className="flex flex-col gap-4 justify-center items-center">
                        <h1 className="font-semibold text-xl text-left">
                            Clear Conversation
                        </h1>
                        <span>
                            <ExclamationTriangleIcon className="aspect-square h-8 bg-red-200 p-2 rounded-full text-red-600" />
                        </span>
                        <h1 className="font-semibold text-xl">
                            Are you Absolutely sure?
                        </h1>
                        <p className="text-center">
                            This action cannot be undone. This will permanently
                            delete your conversation from our server
                        </p>
                        <div className="flex gap-2 justify-center items-center">
                            <button
                                className="px-6 py-2 border border-gray-300 rounded-md cursor-pointer active:scale-95"
                                onClick={handleModalClose}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-6 py-2 border text-gray-50 border-red-500 bg-red-500 rounded-md cursor-pointer active:scale-95"
                                onClick={handleClearConversation}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>
            )}
        </div>
    );
}

export default Settings;
