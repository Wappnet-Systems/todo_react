import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import './style.css'

const Settings = () => {

  const user = useSelector(state => state.auth.authData);

  return (
     <section className="vh-100 gradient-custom-2 aos-init" data-aos="fade" data-aos-duration="1500" data-aos-delay="150">
      <div className="container py-5 h-100">
        <Link data-mdb-toggle="todo" title="Todo List" to='/todo' className='todoicn'><i className="fa-solid fa-rectangle-list fa-lg me-3" style={{color: '#fff', float: 'right'}}></i></Link>
        <div className='mask-custom settingcard'>
          <h1 className='pagetitle pt-5'>Profile Details</h1>
            <div className="mb-4 p-5">
              <div className="card-body text-center">
                <img src={user?.picture?.data?.url} alt="avatar"
                  className="rounded-circle img-fluid" style={{width: '150px'}} />
                <h5 className="subtitle my-3">{ user?.name }</h5>
                <p className="ptext mb-1">{ user?.email }</p>
              </div>
            </div>
        </div>
      </div>
    </section>
  )
}

export default Settings
