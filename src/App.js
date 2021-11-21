import {useState, useEffect} from 'react'
import Header from './components/Header'
import Tasks from './components/Tasks'
import AddTask from './components/AddTask'
import Footer from './components/Footer'
import About from './components/About'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'

const App = () => {
    const [showAddTask, setShowAddTask] = useState(false);

    // 第一个参数tasks：给这个state起一个名字
    // 第二个参数setTasks：更新这个state的方法
    // useState()中是一个数组，用来放我们的state
    // 命名规则：[xxx, setXxx]
    const [tasks, setTasks] =useState([])

    // 使用useEffect来从后端获取数据
    // 第一个参数：UI渲染后执行的方法
    // 第二个参数：依赖数据，也就是依赖的数据发生改变时，就执行第一个参数中的方法，如果没有依赖参数，则写一个空数组即可
    useEffect(() =>{
        // 定义一个方法，里面异步调用fetchTasks()方法，用来从后端获取数据，并更新state
        const getTasks=async () =>{
            const tasksFromserver=await fetchTasks()
            setTasks(tasksFromserver)
        }

        // 定义完方法，别忘了调用！调用这个方法
        getTasks()
    }, [])

    // 获取所有tasks
    // 定义一个从后端fetch数据的方法，这个方法使用fetch方法，且使用了异步加载，用来从后端获取数据
    // http://localhost:5000/tasks是用jsons server模拟的后端地址
    const fetchTasks=async () =>{
        const res = await fetch('http://localhost:5000/tasks')
        const data = await res.json()
        return data
    }

    // 根据id查找一个task
    const fetchTask=async (id) =>{
        const res = await fetch(`http://localhost:5000/tasks/${id}`)
        const data = await res.json()
        return data
    }

    // 使用fetch和DELETE请求删除数据
    // 删除数据的请求使用DELETE
    const deleteTask=async (id)=>{
        await fetch(
            `http://localhost:5000/tasks/${id}`,
            {
                method: 'DELETE'
            }
    )
        setTasks(tasks.filter((eachTask) => {
            return eachTask.id!=id
        }))
    }

    // 双击task，reminder变成相反的bool值，并改变css
    // 更新数据的请求使用PUT
    const toggleReminder=async (id) => {
        const taskToToggle= await fetchTask(id)
        const updatedTask={
            ...taskToToggle,
            reminder: !taskToToggle.reminder
        }

        const res=await fetch(`http://localhost:5000/tasks/${id}`,{
            method:'PUT',
            headers:{
                'Content-type':'application/json'
            },
            body:JSON.stringify(updatedTask)
        })

        const data=await res.json()

        setTasks(tasks.map((eachTask) => {
           return eachTask.id===id?
               {...eachTask, reminder:data.reminder}
               :
               eachTask
        }))
    }

    // 添加Task
    // 添加数据的请求使用POST
    const addTask=async (task)=>{
        const res = await fetch(`http://localhost:5000/tasks`, {
            method: 'POST',
            headers:{
                'Content-type':'application/json',
            },
            body:JSON.stringify(task)
        })

        const data=await res.json()

        setTasks([...tasks, data])

        // const id=Math.floor(Math.random()*10000)+1
        // const newTask={
        //     id,
        //     ...task
        // }
        // setTasks([...tasks, newTask])
    }

  return (
      // 所有的内容都需要用Router包裹起来
      <Router>
        <div className="container">
            <Header
                title='Task Tracker'
                onAdd={() => setShowAddTask(!showAddTask)}
                showAdd={showAddTask}
            />

            {/*必须使用Routes包裹Route*/}
            <Routes>
                {/*这句话的意思是：当路由地址变成类似于:localhost/3000/about时，才会加载About组件*/}
                <Route path='/about' element={<About />} />
                {/*这句话的意思是：当路由地址变成类似于:localhost/时，才会加载element中的内容*/}
                <Route path='/'
                       exact // exact为严格匹配
                       element={(
                           <>
                               {showAddTask && <AddTask onAdd={addTask}/>}
                               {tasks.length<=0?
                                   "No Task yet":
                                   <Tasks
                                       tasks={tasks}
                                       onDelete={deleteTask}
                                       onToggle={toggleReminder}
                                   />}
                           </>
                       )}
                        />
            </Routes>
            <Footer/>
        </div>
      </Router>
  );
}

export default App;
