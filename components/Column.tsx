import { Draggable, Droppable } from '@hello-pangea/dnd';
import { HiPlusCircle } from "react-icons/hi2";
import TodoCard from './TodoCard';

type Props = {
    id: TypedColumn
    todos: Todo[]
    index: number
}

const idToColumnText: {
    [key in TypedColumn]: string
} = {
    'todo': 'To Do',
    'inprogress': 'In Progress',
    'done': 'Done',
}

export default function Column({ id, todos, index }: Props) {

    return (
        <Draggable draggableId={id} index={index}>
        {(provided) => (
            <div
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
            >
               <Droppable
                    droppableId={index.toString()}
                    type='card'
               >
                    {(provided, snapshot) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className={`p-2 rounded-md ${snapshot.isDraggingOver ? 'bg-green-200' : 'bg-white/50'}`}
                      >
                        <h2 className='flex justify-between items-center text-lg font-medium mb-3'>{idToColumnText[id]}
                         <span className="text-right text-xs text-white bg-gray-400 p-1 rounded-full px-2"> 
                         {todos.length}</span>
                        </h2>
                        <div className='space-y-2'>
                          {
                            todos.map((todo, index) => {
                              return (
                                <Draggable
                                  key={todo.$id}
                                  draggableId={todo.$id}
                                  index={index}
                                >
                                  {(provided) => (
                                    <TodoCard
                                      todo={todo}
                                      index={index}
                                      id={id}
                                      innerRef={provided.innerRef}
                                      draggableProps={provided.draggableProps}
                                      dragHandleProps={provided.dragHandleProps}
                                    />
                                  )}
                                </Draggable>
                              );
                            } )
                          }
                          {provided.placeholder}
                          <div className='flex items-end justify-end p-2'>
                            <button className='text-[#008000] hover:text-green-800'>
                              <HiPlusCircle className='h-10 w-10' />
                            </button>
                          </div>
                        </div>

                      </div>
                    )}
               </Droppable>
            </div>
        )}
    </Draggable>
    )
}

