import { LockClosedIcon } from '@heroicons/react/solid'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import myAxios from '../helpers/Request'

export default function Signup() {
    const navigate = useNavigate()
    const [resultSubmit, setResultSubmit] = useState('')
    const [form, setForm] = useState({name: '',email: '', password:'', admin:true})
    const inputHandler = (text) => {
        setForm({...form, ...{[text.target.name]: text.target.value}})
    }
    const onSubmit = (e) => {
        e.preventDefault()
        myAxios.post('/users/signup', form)
        .then(res => {
            console.log(res.data)
            setResultSubmit(res.data.error +' ' +res.data.message)
            if(res.data.status === "ok"){
                navigate('/login')

            }
        })
        .catch(err => console.log(err))
    }

    useEffect(()=>{
      myAxios.get('/users/cookie')
      .then(res => {
        if(res.data.cookie){
          navigate('/')
        }
      })
      .catch(err => console.log(err))
    },[])
  return (
    <>
      <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Daftar!</h2>
          </div>
          <form className="mt-8 space-y-6" action="#" method="POST">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="rounded-md shadow-sm space-y-4">
              <div>
                <label htmlFor="name" className="sr-only">
                  Nama lengkap
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Nama Lengkap"
                  onChange={inputHandler}
                  />
              </div>
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Email address"
                  onChange={inputHandler}
                  />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none rounded relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                  onChange={inputHandler}
                />
              </div>
            </div>
            <p className="text-red-500">{resultSubmit}</p>
            <div>
              <button
                type="submit"
                onClick={onSubmit}
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                </span>
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}