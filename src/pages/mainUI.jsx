import React, { useEffect, useState } from "react";


function MainUI() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([]);
  const [check, setChecked] = useState(false);
  //const [usability, setUsability] = useState(true);

  const handleAdd = async (e) => {
    e.preventDefault();
    const res = await fetch("http://127.0.0.1:8000/AddTask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({title}),

    });
  
    const data = await res.json();
    setTitle("")

    if (res.ok) {
    console.log("task added sucessfully");
  } else {
    alert(data.detail)
  }

  setTasks([data, ...tasks]);
  }


  const fetchData = async () => {
    const res = await fetch("http://127.0.0.1:8000/retrive", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    });
    const data = await res.json();
    const newarr = data.reverse()
    setTasks(newarr);
    console.log(data);
    if (res.ok) {
    console.log("retived sucessfully");
  } else {
    alert(data.detail);
  }
  
  }

  useEffect( () => {
    fetchData();
  }, []);



  
//delete
const handleDel = async (id) => {
    const res = await fetch("http://127.0.0.1:8000/delete", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({id}),

    });
  
    const data = await res.json();
    
    if (res.ok) {
      console.log("task added sucessfully");
    } else {
      alert(data.detail)
    }

    setTasks(prev => prev.filter(task  => task.id != id))
  
  }

  const handleComplete = async (id) => {
    const res = await fetch("http://127.0.0.1:8000/complete", {
      method: "PUT",
      headers: {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({id})
    })
    const data = res.json();
     if (res.ok) {
      console.log("task added Completed");
    } else {
      alert(data.detail)
    }
   setTasks(prev => prev.map(task => task.id == id? {...task, completed: !task.completed} : task))
   fetchData()

  }

  
  return (
    <div className="App bg-amber-500 h-screen overflow-clip w-screen flex justify-center items-center">
    <div className="container bg-amber-50 w-50 h-100 ">
        <div className="">
            <h1 className="text-red-400 pt-3 ">ToDo</h1>
            <div className="flex gap-3 justify-between">
            <input type="text"
             className=""
             value={title}
             onChange={e => setTitle(e.target.value)}/>
            <button 
            className="bg-green-400 text-white border-none"
            disabled = {title.length == 0}
            onClick={handleAdd}
            >ADD</button>
            </div>
        <div className="todos bg-emerald-900 h-80 rounded-2xl m-5 p-5 overflow-auto">
            {tasks.map((task, index) => (
              <div key={index} className="task bg-green-400 text-black p-2 m-2 rounded h-15 w-140 flex flex-row justify-between items-center">
                <input type="checkbox" 
                checked = {task.completed}
                onChange={() => {
                  handleComplete(task.id)
                }}
                id="" 
                className="w-5 h-5 border-green-500" />
                <div className="pl-4 flex justify-start h-15 w-full">
                  
                  <h1 className={`text-sm w-300  
                  flex ${task.completed? "decoration-dotted text-green-900  opacity-[50%]": ""}`}>
                  {task.title}</h1>
                </div>
                
                <button  type="button" 
                className="w-30 h-auto flex items-center"
                onClick={() => {handleDel(task.id)}}
                >delete</button>
              </div>
            ))}
        </div>
        </div>
    </div>
    </div>
  );
}

export default MainUI;