//@ts-ignore
import CloseIcon from "../assets/Close.svg?react";

import React, { ReactNode, createContext, useState } from "react";

type modalStyle = {
  title?: string,
  opacity?: string,
  styleBody?: string
}

type CancelFunction = () => void;
type ContentModal = (() => ReactNode) | null;

type ModalContextProps = {
  handleModal: (
    content: ContentModal,
    modalStyle: modalStyle,
    cancelModal: CancelFunction
  ) => void
}

type ModalProps = {
  modalContent: ContentModal,
  modalStyle: modalStyle,
  cancelFunction: CancelFunction
}

type ModalProvider = {
  children: React.ReactNode
}

export const ModalContext = createContext({} as ModalContextProps);

export function ModalProvider({ children }) {
  const [modalProps, setModalProps] = useState<ModalProps>({
    modalContent: () => <div></div>,
    cancelFunction: () => { },
    modalStyle: { opacity: '0.80', title: "", styleBody: "" }
  })

  const isOpenModal = !!modalProps.modalContent;

  return (
    <ModalContext.Provider value={{ handleModal }}>
      {children}

      <section
        className={`${isOpenModal ? 'flex animation-open-modal' : 'hidden'} items-center absolute h-full w-full top-0 left-0`}
        style={{ background: `rgba(0,0,0,${modalProps.modalStyle.opacity})` }}
      >
        <div className={`flex flex-col items-center px-4 bg-base-100 h-[80%] w-full mx-2  border-base-600 rounded-md ${modalProps.modalStyle.styleBody}`}>
          <header
            className="flex relative justify-center items-center py-4 w-full"
          >
            <h1>{modalProps.modalStyle?.title || "Selecione pastas de músicas"}</h1>

            <div
              onClick={cancelModalFunction}
              className="absolute right-0 cursor-pointer"
            >
              <CloseIcon className="w-7 h-7" />
            </div>
          </header>

          <div className="overflow-visible w-full">
            {
              modalProps.modalContent ?
                <modalProps.modalContent /> :
                null
            }
          </div>
        </div>
      </section>
    </ModalContext.Provider>
  )

  function cancelModalFunction() {
    modalProps.cancelFunction();
    setModalProps({ ...modalProps, modalContent: null })
  }

  function handleModal(
    modalContent: ContentModal,
    modalStyle: modalStyle,
    cancelFunction = () => { }
  ) {
    setModalProps({ modalContent, modalStyle, cancelFunction })
  }
}

