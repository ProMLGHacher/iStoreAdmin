import { useState } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { authThunk, selectAuthError } from "../../feauters/authSlice"

export const Login = () => {

  const [mail, setMail] = useState("")
  const [password, setPassword] = useState("")

  const dispath = useAppDispatch()

  const error = useAppSelector(selectAuthError)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()

    dispath(authThunk({
      email: mail,
      password: password
    }))
  }

  return (
    <div>
      <form onSubmit={submit}>
        <input value={mail} onChange={(e) => {
          setMail(e.target.value)
        }} type="text" />
        <input value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" />
        <button type="submit">Войти</button>
        {
          error
        }
      </form>
    </div >
  )
}
