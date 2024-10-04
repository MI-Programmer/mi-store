import { cloneElement, createContext, useContext, useState } from "react";
import { createPortal } from "react-dom";
import { XMarkIcon } from "@heroicons/react/24/solid";

import { useOutsideClick } from "@/hooks/useOutsideClick";

const ModalContext = createContext({});

interface OpenProps {
  children: any;
  opens: string;
}

interface WindowProps {
  children: any;
  name: string;
}

const Modal = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  const [openName, setOpenName] = useState("");

  const open = setOpenName;
  const close = () => setOpenName("");

  return (
    <ModalContext.Provider value={{ openName, open, close }}>
      {children}
    </ModalContext.Provider>
  );
};

const useModal = () => {
  const context = useContext(ModalContext);
  return context;
};

const Open = ({ children, opens: opensWindowName }: OpenProps) => {
  const { open }: any = useModal();
  return cloneElement(children, { onClick: () => open(opensWindowName) });
};

const Window = ({ children, name }: WindowProps) => {
  const { openName, close }: any = useModal();
  const ref: any = useOutsideClick(close);

  if (openName !== name) return null;

  return createPortal(
    <div className="bg-backdrop fixed left-0 top-0 z-50 h-screen w-full backdrop-blur transition-all duration-500">
      <div
        className="fixed left-[15%] right-[15%] top-1/2 mx-auto max-w-xl -translate-y-1/2 transform rounded-lg bg-gray-50 p-8 shadow-lg transition-all duration-500"
        ref={ref}
      >
        <button
          className="absolute right-5 top-3 h-8 w-8 translate-x-2 transform rounded-sm border-none bg-none p-1 transition-all duration-200 hover:bg-gray-100"
          onClick={close}
        >
          <XMarkIcon className="text-gray-500" />
        </button>

        {cloneElement(children, { onCloseModal: close })}
      </div>
    </div>,
    document.body,
  );
};

Modal.Open = Open;
Modal.Window = Window;

export default Modal;
