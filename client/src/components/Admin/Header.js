import React from 'react';

import { Link } from 'react-router-dom';

const AdminHeader = () => {
  return (
    <div className='sign section--bg mb-3'>
      <h2 className='text-center text-white'>Admin Pages</h2>
      <nav className='navbar navbar-dark bg-dark col-6 m-auto text-center'>
        <Link className='header__nav-link' to='/admin/categories/'>
          Categories
        </Link>
        <Link className='header__nav-link' to='/admin/books/'>
          Books
        </Link>
        <Link className='header__nav-link' to='/admin/authors/'>
          Authors
        </Link>
      </nav>
    </div>
  );
};
export default AdminHeader;
