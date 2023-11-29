"use client"
import { FormEvent, Fragment, useRef } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { useModalStore } from '@/store/ModalStore'
import { useBoardStore } from '@/store/BoardStore'
import TaskTypeRadioGroup from './TaskTypeRadioGroup'
import Image from 'next/image'
import { MdPhoto } from 'react-icons/md'

export default function Modal() {
    const [addTask, image, setImage, newTaskInput, setNewTaskInput, newTaskType] = useBoardStore((state) => [
        state.addTask,
        state.image,
        state.setImage,
        state.newTaskInput,
        state.setNewTaskInput,
        state.newTaskType,
    ])

    const imagePickerRef = useRef<HTMLInputElement>(null);

    const [isOpen, closeModal] = useModalStore((state) => [
        state.isOpen,
        state.closeModal,
    ]);

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTaskInput) return;

        addTask(newTaskInput, newTaskType, image);

        setImage(null);
        closeModal();
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as='form' onSubmit={handleSubmit} className='relative z-10' onClose={closeModal}>
                <div className='fixed inset-0 overflow-y-auto'>
                    <div className='flex min-h-full items-center justify-center p-4 text-center'>

                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Panel
                                className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title
                                    as="h3"
                                    className="text-lg font-medium leading-6 text-gray-900"
                                >
                                    Add a Task
                                </Dialog.Title>
                                <div className="mt-2">
                                    <input
                                        type='text'

                                        value={newTaskInput}
                                        onChange={(e) => setNewTaskInput(e.target.value)}
                                        placeholder="Enter a task..."
                                        className='w-full p-4 border rounded-md outline-none bg-gray-300'
                                    />
                                </div>

                                <TaskTypeRadioGroup />

                                <div>
                                    <button
                                        type='button'
                                        onClick={() => {
                                            imagePickerRef.current?.click();
                                        }}
                                        className='w-full border border-gray-300 rounded-md outline-none p-5 focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 inline-block'>
                                        <MdPhoto className='h-6 w-6 MR-2 inline-block' />
                                        Upload Image
                                    </button>

                                    {image && (
                                        <Image
                                            alt="Uploaded image"
                                            width={200}
                                            height={200}
                                            src={URL.createObjectURL(image)}
                                            className='w-full h-44 object-cover mt-2 filter hover:grayscale'
                                            onClick={() => {
                                                setImage(null);
                                            }}
                                        />
                                    )}

                                    <input type='file' ref={imagePickerRef} hidden onChange={(e) => {
                                        if (!e.target.files![0].type.startsWith('image/')) return;
                                        setImage(e.target.files![0]);
                                    }}>
                                    </input>
                                    <span className='text-xs text-gray-500'>.jpg, .png, .jpeg</span>
                                </div>

                                <div className='mt-4'>

                                    <button
                                        type='submit'
                                        disabled={!newTaskInput}
                                        className='inline-flex justify-center rounded-md border-transparent bg-green-700 px-4 py-2 text-sm font-medium text-white hover:bg-green-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-800 focus-visible:ring-offset-2 disabled:bg-gray-100 disabled:text-gray-300 disabled:cursor-not-allowed'>
                                        Add Task
                                    </button>
                                </div>

                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}