import Task from './Task'

const Tasks = ({tasks, onDelete, onToggle}) => {

    return (
        <>
            {tasks.map((eachTask) => {
                return <Task
                    onToggle={onToggle}
                    onDelete={onDelete}
                    key={eachTask.id}
                    task={eachTask} />
            })}
        </>
    );
};

export default Tasks;
