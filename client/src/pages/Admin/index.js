import React from 'react';
import requireAdmin from '../../hocs/requireAdmin'
import AdminHeader from '../../components/Admin/Header'
import AdminBooks from '../../components/Admin/Books'
import AdminAuthors from '../../components/Admin/Authors'
import AdminCategories from '../../components/Admin/Categories'
import { BrowserRouter, Switch, Link, Route } from 'react-router-dom';

const Home = (props) => {
  return (
    <BrowserRouter>
    <AdminHeader />
    <Switch>
      <Route path='/admin/authors' exact component={AdminAuthors}/>
      <Route path='/admin/categories' exact component={AdminCategories}/>
      <Route path='/admin/books' exact component={AdminBooks}/>
    </Switch>
  </BrowserRouter>
  );
};
export default requireAdmin(Home);