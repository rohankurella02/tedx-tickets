import React, { useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import './Login.css'
import { useNavigate } from 'react-router-dom'

// Create a single supabase client for interacting with your database


function Login() {
  const supabase = createClient('https://kljpojhmwfmckmspbmmp.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtsanBvamhtd2ZtY2ttc3BibW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODI4NzM0NzAsImV4cCI6MTk5ODQ0OTQ3MH0.XGm-s5m8nninpQiWi-Xa79Qi3-_SFm0kYceM09TJGpY')
  const { user } = supabase.auth
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')
  let navigate = useNavigate()
  
  const [otp, setOtp] = React.useState('')


  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    .then((res) => {
      console.log(res)
      alert('Logged in successfully')
      navigate('/')
    })
    .catch((err) => {
      console.log(err)
      alert('Error logging in')
    })
    // console.log(data, error)
  }

  const verify = async (otp) => {
    const { data, error } = await supabase.auth.verifyOtp({
      phone: '+916300303632',
      token: otp,
      type: 'sms'
    })
    localStorage.setItem('token', data?.session.access_token)
    console.log(data, error)
  }

  const logout = async () => {
    const { error } = await supabase.auth.signOut()
    console.log(error)
  }



  return (
    <div className='login'>
    <div class="container">
      <h2 class="login-title">Log in</h2>

      <div class="login-form" >
        <div>
          <label for="email">Email </label>
          <input
            id="email"
            type="email"
            placeholder="me@example.com"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label for="password">Password </label>
          <input
            id="password"
            type="password"
            placeholder="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button class="btn btn--form" type="submit" value="Log in" onClick={login} >
          Log in
        </button>
      </div>
    </div>
    </div>
    // <div>Login
    //   <button onClick={login}>
    //     Login
    //   </button>
    //   <input type="text" onChange={(e) => setOtp(e.target.value)}  />
    //   <button onClick={() => verify(otp)}>/verify</button>
    //   <button onClick={logout}>Logout</button>
    // </div>
  )
}

export default Login