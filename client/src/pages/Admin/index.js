import React from 'react';
import requireAdmin from '../../hocs/requireAdmin'
import AdminHeader from '../../components/Admin/Header'
import AdminBooks from '../../components/Admin/Books'
import AdminAuthors from '../../components/Admin/Authors'
import AdminCategories from '../../components/Admin/Categories'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';
import AdminContextProvider from '../../context/AdminContext/AdminContextProvider'

const Home = (props) => {
  return (
    <AdminContextProvider>
      <BrowserRouter>
      <AdminHeader />
      <Switch>
        <Route path='/admin/authors' exact component={AdminAuthors}/>
        <Route path='/admin/categories' exact component={AdminCategories}/>
        <Route path='/admin/books' exact component={AdminBooks}/>
      </Switch>
    </BrowserRouter>
  </AdminContextProvider>
  );
};
export default requireAdmin(Home);