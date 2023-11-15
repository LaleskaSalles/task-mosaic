'use client'

import { DraggableProvidedDragHandleProps, DraggableProvidedDraggableProps } from '@hello-pangea/dnd'
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
                    className="text-gray-400 hover:text-red-600"
                >
                    <HiTrash className="ml-5 h-6 w-6" />
                </button>
            </div>

        </div>
    )
}
