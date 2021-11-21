import {useState} from 'react'


const AddTask = ({onAdd}) => {

    const onSubmit=(e)=>{
        e.preventDefault()
        if(!text){
            alert('Please add a task')
            return
        }

        onAdd({text, date, reminder})
        setText('')
        setDate('')
        setReminder(false)
    }

    const [text, setText] = useState('')
    const [date, setDate] = useState('')
    const [reminder, setReminder] = useState(false)
    return (
        <form className='add-form'>
            <div className="form-control">
                <label htmlFor="">Task</label>
                <input
                    type="text"
                    placeholder='Add Task'
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
            </div>
            <div className="form-control">
                <label htmlFor="">Date</label>
                <input
                    type="text"
                    placeholder='Add date'
                    value={date}
                    onChange={(e) => setDate(e.target.value)}

                />
            </div>
            <div className="form-control form-control-check">
                <label htmlFor="">Set Reminder</label>
                <input
                    type="checkbox"
                    checked={reminder}
                    value={reminder}
                    onChange={(e) => setReminder(e.currentTarget.checked)}
                />
            </div>

            <input onClick={onSubmit} className='btn btn-block' type="submit" value='Save Task'/>
        </form>
    );
};

export default AddTask;
