import React from 'react'
import MainCyberbug from '../../components/Cyberbug/MainCyberbug'
import MenuCyberbug from '../../components/Cyberbug/MenuCyberbug'
import SideBarCyberbug from '../../components/Cyberbug/SideBarCyberbug'

export default function JiraCyberbug() {
  return (
    <div className='jira'>
        <SideBarCyberbug/>
        <MenuCyberbug/>
    </div>
  )
}
