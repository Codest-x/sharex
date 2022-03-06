import React from 'react'
import './header.scss'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import GroupIcon from '@mui/icons-material/Group'
import HeaderOption from '../HeaderOption/header-option'
import Button from '../Button/button-component'
import { Link } from 'react-router-dom'

export default function Header() {
  return (
    <div className="header">
      <div className="header__left">
        <Link to="/" className="header__logo">ShareX</Link>
        {/* <img
          src="https://cdn-icons-png.flaticon.com/512/2065/2065064.png"
          alt="logo-icon"
          className=""
        /> */}
        <div className="header__search">
          <SearchIcon />
          <input type="text" placeholder="Search Something" />
        </div>
      </div>
      <div className="header__right">
        <HeaderOption title="Inicio" path="/" Icon={HomeIcon} />
        <HeaderOption title="Explorar" path="/explore" Icon={GroupIcon} />
        <HeaderOption
          title="Me"
          avatar="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50.jpg"
          path="/profile"
        />
        <Button type="primary" path="/login" size="medium">
          Login
        </Button>
      </div>
    </div>
  )
}
