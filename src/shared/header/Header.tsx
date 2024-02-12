import React from 'react'
import { useDispatch } from 'react-redux'
import { logOut } from '../../feauters/authSlice'
import { Link } from 'react-router-dom'

const Header = () => {
    const dispatch = useDispatch()

    return (
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '30px'
        }}>
            <Link to={'/'} style={{
                fontFamily: 'monospace',
                fontSize: '28px',
                textDecoration: 'none',
                color: 'black',
                cursor: 'pointer'
            }}>{'<'}</Link>
            <img src="logo.png" alt="" />
            <button style={{
                border: 'none',
                backgroundColor: 'transparent',
                color: 'black',
                opacity: '0.4',
                textDecoration: 'underline',
                fontSize: '18px',
                cursor: 'pointer'
            }} onClick={() => {
                dispatch(logOut())
            }}>Выйти</button>
        </div>
    )
}

export default Header
