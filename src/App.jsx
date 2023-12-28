import { useState } from 'react'
import './App.css'
import { useEffect } from 'react';

function App() {

  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/users/')
      .then(res => res.json())
      .then(data => setUsers(data))
  }, [])

  const handleAddUser = e =>{
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    // console.log(name,email);
    const user = {name,email};
    console.log(user)

    fetch('http://localhost:5000/users/' , {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(user) 
    })
    .then(res => res.json())
    .then(data =>{
      console.log('inside post respons' , data)
      const newUser = [...users,data]
      setUsers(newUser)
      form.reset();
    })
  }


  return (
    <>
      <h1>Users management system</h1>
      <p>Numbers of users : {users.length}</p>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" id="" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="Add user" />
      </form>
      <div>
        {
          users.map(user => <p key={user.id}>{user.id} : {user.name} : {user.email}</p>)
        }
      </div>
    </>
  )
}

export default App
