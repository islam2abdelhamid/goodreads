import React, { useEffect, useContext } from 'react';
import GuestHome from '../pages/Guest/Home';
import HomeAllBooks from '../pages/User/HomeAllBooks';
import HomeBooksRead from '../pages/User/HomeBooksRead';
import HomeBooksReading from '../pages/User/HomeBooksReading';
import HomeBooksWant from '../pages/User/HomeBooksWant';
import Search from '../pages/User/Search';
import Login from '../pages/Guest/Login';
import { AuthContext } from '../context/AuthContext';
import { CHECK_AUTH } from '../context/AuthContext/actionTypes';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Logout from '../pages/User/Logout';
import { Header } from './Header/Header';
import { Footer } from './Footer/Footer';
import Register from '../pages/Guest/Register';
import Books from '../pages/Guest/Books';
import Book from '../pages/User/SingleBook/SingleBook';
import AdminHome from '../pages/Admin/index';
import AllCategories from '../components/User/Categories'
import AllAuthors from '../components/User/Authors'
import AllBooks from '../components/User/Books'
import Category from '../components/User/Category'
import FourOFour from '../pages/404';

const App = () => {
  const context = useContext(AuthContext);

  useEffect(() => {
    context.dispatch({
      type: CHECK_AUTH,
    });
  }, []);

  return (
    <>
      <BrowserRouter>
        <Header
          isLogged={context.state.isLogged}
          isLoaded={context.state.isLoaded}
          isAdmin={context.state.isLogged && context.state.user.isAdmin}
          user={context.state.isLogged && context.state.user}
        />
        <Switch>
          <Route path='/' exact component={Books} />
          <Route path='/home' exact component={HomeAllBooks} />
          <Route path='/reading-books' exact component={HomeBooksReading} />
          <Route path='/read-books' exact component={HomeBooksRead} /> 
          <Route path='/want-to-read' exact component={HomeBooksWant} />
          <Route path='/search' exact component={Search} />
          <Route path='/login' exact component={Login} />
          <Route path='/register' exact component={Register} />
          <Route path='/logout' exact component={Logout} />
          <Route path='/Books' exact component={AllBooks} />
          <Route path='/Books/:id' exact component={Book} />
          <Route path='/admin' component={AdminHome} />
          <Route path='/categories/:id' component={Category} />
          <Route path='/categories' component={AllCategories} />
          <Route path='/authors' component={AllAuthors} />

          <Route path='' component={FourOFour} />
        </Switch>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;
