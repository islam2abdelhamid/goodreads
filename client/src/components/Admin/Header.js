import React from 'react';

import {
	Link
  } from "react-router-dom";

const AdminHeader = () => {
  return (
    <div className='sign section--bg' data-bg='img/section/section.jpg'>
      <nav className="navbar navbar-dark bg-dark col-3 m-auto">
        <p className="navbar-brand" style={{marginTop: "-2rem"}} href="">Admin Pages</p>
        <Link className="header__nav-link" to="/admin/categories/">Categories</Link>
        <Link className="header__nav-link" to="/admin/books/">Books</Link>
        <Link className="header__nav-link" to="/admin/authors/">Authors</Link>
      </nav>
    </div>
  );
};
export default AdminHeader;