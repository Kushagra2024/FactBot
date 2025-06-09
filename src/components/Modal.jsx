import { XMarkIcon } from "@heroicons/react/16/solid";
import { createPortal } from "react-dom";

const container = document.getElementById("modal-root");

function Modal({ children, closeModel }) {
    return createPortal(
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-md shadow-lg absolute w-1/3">
                <button
                    onClick={closeModel}
                    className="absolute top-2 right-2 text-gray-500 cursor-pointer"
                >
                    <XMarkIcon className="aspect-square h-6" />
                </button>
                {children}
            </div>
        </div>,
        container
    );
}

export default Modal;
