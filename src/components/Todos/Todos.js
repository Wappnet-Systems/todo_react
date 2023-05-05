import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import { logout } from '../../store/actions/auth'
import { addTodo, updateTodo, deleteTodo, completedTodo, inCompletedTodo } from '../../store/actions/todo'
import './style.css'

const Todos = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  let todoList = useSelector(state => { return state.todos });
  const [todo, setTodo] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editTodo, setEditTodo] = useState({});

  useEffect(() => {
    setSearchQuery("");
  }, [todoList]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredTodos = todoList?.todos?.filter((todo) =>
    todo.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('Logout successful')
  }
  const handleAddTodo = () => {
    if (todo === "") {
      toast.error('Please enter todo name');
    } else {
      dispatch(addTodo(todo));
      setTodo("")
      toast.success('Todo added successfully')
    }
  }
  const handleUpdateTodo = ({ id, text }) => {
    dispatch(updateTodo(id, text));
    setIsEditing(false);
    setEditTodo({});
    toast.success('Todo updated successfully')
  }

  const handleDeleteTodo = (id) => {
    dispatch(deleteTodo(id));
    toast.success('Todo deleted successfully')
  }

  const handleCompletedTodo = (id) => {
    dispatch(completedTodo(id));
    toast.success('Todo completed successfully')
  }

  const handleInCompletedTodo = (id) => {
    dispatch(inCompletedTodo(id));
    toast.error('Todo incompleted successfully')
  }

  return (
    <div>
      <section className="pageheight gradient-custom-2 aos-init" data-aos="fade" data-aos-duration="1500" data-aos-delay="150">
        <div className="container py-5 h-100">
          <div className='righticons'>
            <Link data-mdb-toggle="tooltip" title="Logout" onClick={handleLogout}><i className="fa-solid fa-right-from-bracket fa-lg me-3" style={{ color: '#fff', float: 'right' }}></i></Link>
            <Link data-mdb-toggle="tooltip" title="Settings" to='/settings'><i className="fa-solid fa-gear fa-lg me-3" style={{ color: '#fff', float: 'right' }}></i></Link>
          </div>
          <div className="todopage row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-12 col-xl-8">
              <div className="card mask-custom">
                <div className="card-body text-white">
                  <div className="text-center pt-3 pb-2 px-4">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-todo-list/check1.webp"
                      alt="Check" width="60" />
                    <h2 className="my-4">Todo List</h2>

                    <div className='inputfields'>
                      {
                        todoList?.todos?.length ?
                          <form className="d-flex justify-content-center align-items-center mb-4">
                            <div className="form-outline flex-fill">
                              <input type="text" id="form2" className="form-control" value={searchQuery} onChange={handleSearchChange} placeholder='Search Todo...' />
                            </div>
                          </form> : ''
                      }
                      {
                        !isEditing ?
                          <form className="d-flex justify-content-center align-items-center mb-4">
                            <div className="form-outline flex-fill">
                              <input type="text" id="form2" className="form-control" placeholder='Add Todo...' value={todo} onChange={(e) => setTodo(e.target.value)} autoComplete='off' />
                            </div>
                            <button type="button" className="btn btn-info ms-2 custombt" onClick={handleAddTodo}>Add</button>
                          </form> :
                          <form className="d-flex justify-content-center align-items-center mb-4">
                            <div className="form-outline flex-fill">
                              <input type="text" id="form2" className="form-control" value={editTodo.text} onChange={(e) => setEditTodo({ ...editTodo, text: e.target.value })} />
                            </div>
                            <button type="button" className="btn btn-info ms-2 custombt" onClick={() => handleUpdateTodo(editTodo)}>Update</button>
                          </form>
                      }
                    </div>
                  </div>
                  {
                    todoList?.todos?.length ?
                      <div className='table-scroll'>
                        <table className="customtable table text-white mb-0">
                          <thead>
                            <tr>
                              <th scope="col">Todo</th>
                              <th scope="col">Actions</th>
                            </tr>

                          </thead>
                          <tbody>
                            {
                              setSearchQuery !== "" ?
                                filteredTodos.map((todo) => {
                                  return (
                                    <tr className="fw-normal" key={todo.id}>
                                      <td className="align-middle tdtag">
                                        {todo.inComplete ? <s style={{ color: 'red' }}>{todo.text}</s> :
                                          (todo.completed ? <s style={{ color: 'rgb(149, 230, 28)' }}>{todo.text}</s> : <span>{todo.text}</span>)}
                                      </td>
                                      <td className="align-middle">
                                        {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Done"><i className="fa-solid fa-check fa-lg me-3" style={{ color: '#41e506' }} onClick={() => handleCompletedTodo(todo.id)}></i></a> : ''}
                                        {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Undone"><i className="fa-sharp fa-solid fa-xmark fa-lg me-3" style={{ color: '#d40202' }} onClick={() => { handleInCompletedTodo(todo.id) }}></i></a> : ''}
                                        {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Edit"><i className="fa-solid fa-pen-to-square fa-lg me-3" style={{ color: '#7ddb1f' }} onClick={() => { setIsEditing(true); setEditTodo(todo) }}></i></a> : ''}
                                        <a data-mdb-toggle="tooltip" title="Delete"><i className="fas fa-trash-alt fa-lg text-warning" onClick={() => { handleDeleteTodo(todo.id) }}></i></a>
                                      </td>
                                    </tr>
                                  )
                                })
                                :
                                todoList?.todos?.map((todo) => {
                                  return (
                                    <>
                                      <tr className="fw-normal" key={todo.id}>
                                        <td className="align-middle">
                                          {todo.inComplete ? <s style={{ color: 'red' }}>{todo.text}</s> :
                                            (todo.completed ? <s style={{ color: 'rgb(149, 230, 28)' }}>{todo.text}</s> : <span>{todo.text}</span>)}
                                        </td>
                                        <td className="align-middle">
                                          {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Done"><i className="fa-solid fa-check fa-lg me-3" style={{ color: '#41e506' }} onClick={() => handleCompletedTodo(todo.id)}></i></a> : ''}
                                          {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Undone"><i className="fa-sharp fa-solid fa-xmark fa-lg me-3" style={{ color: '#d40202' }} onClick={() => { handleInCompletedTodo(todo.id) }}></i></a> : ''}
                                          {(!todo.completed && !todo.inComplete) ? <a data-mdb-toggle="tooltip" title="Edit"><i className="fa-solid fa-pen-to-square fa-lg me-3" style={{ color: '#7ddb1f' }} onClick={() => { setIsEditing(true); setEditTodo(todo) }}></i></a> : ''}
                                          <a data-mdb-toggle="tooltip" title="Delete"><i className="fas fa-trash-alt fa-lg text-warning" onClick={() => { handleDeleteTodo(todo.id) }}></i></a>
                                        </td>
                                      </tr>
                                    </>
                                  )
                                })
                            }
                          </tbody>
                        </table>

                      </div> : ''
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Todos
