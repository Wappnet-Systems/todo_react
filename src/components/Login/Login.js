import React from 'react'
import FacebookLogin from 'react-facebook-login'
import { useDispatch, } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';

import { login } from '../../store/actions/auth'
import './style.css'

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const responseFacebook = (response) => {
    if (response.accessToken) {
      dispatch(login(response));
      navigate('/todo');
      toast.success('Login successful')
    } else {
      toast.error('Login Failed')
    }
  }

  return (
    <section className="vh-100 gradient-custom-2 d-flex justify-content-center align-items-center aos-init" data-aos="fade" data-aos-duration="1500" data-aos-delay="150">
      <div className="container py-5 mask-custom2 settingcard2">
        <div className="row">
          <div className="card-body p-5 text-center">
            <h2 className="fw-bold mb-5 text-uppercase pagetitle">Sign In</h2>
            <div className='loginwithfb'>
              <FacebookLogin
                appId={process.env.FACEBOOK_APP_ID}
                fields="name,email,picture"
                callback={responseFacebook}
                icon="fa-facebook"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login
