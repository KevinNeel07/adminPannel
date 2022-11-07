import React from 'react'

import { Link, NavLink } from 'react-router-dom'

const QuickLinks = () => {
  return (
    <>
    <Link to='/admin/summary'>Summary</Link>
    <Link to='/admin/user'>User</Link>
    <Link to='/admin/product'>Product</Link>

    </>
  )
}

export default QuickLinks