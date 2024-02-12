import { useState } from "react"
import styles from './Login.module.scss'
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
    <div className={styles.wrapper}>
      <img src="/logo.png" alt="" />
      <form onSubmit={submit}>
        <input className={`input`} placeholder="Почта" value={mail} onChange={(e) => {
          setMail(e.target.value)
        }} type="text" />
        <input className={`input`} placeholder="Пароль" value={password} onChange={(e) => {
          setPassword(e.target.value)
        }} type="password" />
        <button className="button" type="submit">Войти</button>
        {
          error
        }
      </form>
    </div >
  )
}
