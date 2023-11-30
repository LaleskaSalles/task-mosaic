'use client'

import getUrl from '@/lib/getUrl';
import { useBoardStore } from '@/store/BoardStore';
import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from '@hello-pangea/dnd'
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { HiTrash } from 'react-icons/hi2';

type Props = {
    todo: Todo;
    index: number;
    id: TypedColumn;
    innerRef: (element: HTMLElement | null) => void;
    draggableProps: DraggableProvidedDraggableProps;
    dragHandleProps: DraggableProvidedDragHandleProps | null | undefined;
};

export default function TodoCard({
    todo,
    index,
    id,
    innerRef,
    draggableProps,
    dragHandleProps,
}: Props) {

    const deleteTask = useBoardStore((state) => state.deleteTask);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    useEffect(() => {
        if (todo.image) {
            const fetchImage = async () => {
                const url = await getUrl(todo.image!);
                if (url) {
                    setImageUrl(url.toString());
                }
            }
            fetchImage();
        }
    }, [todo])

    return (
        <div
            ref={innerRef}
            {...draggableProps}
            {...dragHandleProps}
            className="bg-white shadow-md rounded-md p-4 space-y-2"
        >
            <div className="flex justify-between items-center">
                <h3 className="text-lg ">{todo.title}</h3>
                <button
                    onClick={() => deleteTask(index, todo, id)}
                    className="text-gray-400 hover:text-red-600"
                >
                    <HiTrash className="ml-5 h-6 w-6" />
                </button>
            </div>

            {imageUrl && (
                <div className='w-full rounded-b-md h-full'>
                    <Image
                        src={imageUrl}
                        alt="Task Image"
                        width={400}
                        height={200}
                        priority={true}
                        className='w-full h-44 object-contain rounded-d-md'
                    />

                </div>
            )}

        </div>
    )
}
