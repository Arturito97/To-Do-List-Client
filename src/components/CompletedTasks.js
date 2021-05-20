import React, {useState} from 'react';
import '../App.css';
import ListTasks from './ListTasks';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';


// Move item from one list to other
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};

class CompletedTasks extends React.Component {
    // id2List = {
    //     toDoTasks: 'filteredTasks',
    //     doneTasks: 'completedTasks'
    //   };
  
    //   getList = id => this.state[this.id2List[id]];

    // handleOnDragEnd = async (result) => {
    // if (result.source.droppableId === result.destination.droppableId) {
    //     const items = reorder(
    //         this.getList(result.source.droppableId),
    //         result.source.index,
    //         result.destination.index
    //     );

    //     let state = { items };

    //     if (result.source.droppableId === 'completedTasks') {
    //         state = { completedTasks: items };
    //     }

    //     this.setState(state);
    // } else {
    //     result = move(
    //         this.getList(result.source.droppableId),
    //         this.getList(result.destination.droppableId),
    //         result.source,
    //         result.destination
    //     );

    //     this.setState({
    //         filteredTasks: result.toDoTasks,
    //         doneTasks: result.completedTasks
    //     });
    // }


    //}

    render() {
        return (
            // <div><h3>Done:</h3>
            {/* <Droppable droppableId="doneTasks" > 
              {(provided) => (
              <ul className="doneTasks" {...provided.droppableProps} ref={provided.innerRef}>
                {this.state.completedTasks.map((task, index) => {
                  return <Draggable key={index} draggableId={index.toString()} index={index}>
                    {(provided) =>(
                    <li key={index} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                      {task.title}
                        &nbsp;
                      <button onClick={() => this.handleDeleteTask(task._id)}>Delete</button>
                        &nbsp;
                  </li>
                  )}
                  </Draggable>
                })}
              {provided.placeholder}
              </ul>
            )}
            
            </Droppable>
</div> */}
        )
    }
}

export default CompletedTasks;