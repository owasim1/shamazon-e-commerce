import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PersonIcon from '@material-ui/icons/Person';
import SupervisorAccountOutlinedIcon from '@material-ui/icons/SupervisorAccountOutlined';

import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import OrdersScreen from './screens/OrdersScreen';
import { categories } from './categories';

function App() {

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const useStyles = makeStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    listItemText: {
      fontSize: '1.5rem'
    }
  });

  const classes = useStyles();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === 'top' || anchor === 'bottom',
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <h3 style={{marginLeft: '1.4rem'}}>Shop by Category</h3>
      <Divider />
      <List>
        {categories.map((text, index) => (
          <ListItem component={Link}  to={"/category/" + text} button key={text}>
            <ListItemText disableTypography className={classes.listItemText} primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <BrowserRouter>
      <div className="grid-container">
        <header className="header">
          <div className="brand">
            {['left'].map((anchor) => (
              <React.Fragment key={anchor}>
                <button onClick={toggleDrawer(anchor, true)}>&#9776;</button>
                <Drawer anchor={anchor} open={state[anchor]} onClose={toggleDrawer(anchor, false)}>
                  {list(anchor)}
                </Drawer>
              </React.Fragment>
            ))}
            <Link style={{marginLeft: '0.6rem'}} to="/">Shamazon</Link>
          </div>
          <div className="header-links">
    <Link to="/cart">
      <ShoppingCartIcon className="icon" fontSize='Large' /> Cart
    </Link>
            {userInfo ? (
              <Link to="/profile">
                <PersonIcon className="icon" fontSize='Large' /> {userInfo.name}</Link>
            ) : (
              <Link to="/signin">
                <PersonIcon className="icon" fontSize='Large' /> Sign In
              </Link>
            )}
            {userInfo && userInfo.isAdmin && (
              <div className="dropdown">
                <a href="#"><SupervisorAccountOutlinedIcon className="icon" fontSize="Large" /> Admin</a>
                <ul className="dropdown-content">
                  <li>
                    <Link to="/orders">Orders</Link>
                    <Link to="/products">Products</Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </header>
        <main className="main">
          <div className="content">
            <Route path="/order/:id" component={OrderScreen} />
            <Route path="/orders" component={OrdersScreen} />
            <Route path="/profile" component={ProfileScreen} />
            <Route path="/products" component={ProductsScreen} />
            <Route path="/shipping" component={ShippingScreen} />
            <Route path="/payment" component={PaymentScreen} />
            <Route path="/placeorder" component={PlaceOrderScreen} />
            <Route path="/signin" component={SigninScreen} />
            <Route path="/register" component={RegisterScreen} />
            <Route path="/product/:id" component={ProductScreen} />
            <Route path="/cart/:id?" component={CartScreen} />
            <Route path="/category/:id" component={HomeScreen} />
            <Route path="/page/:id" component={HomeScreen} />
            <Route path="/" exact={true} component={HomeScreen} />
          </div>
        </main>
        <footer className="footer">All rights reserved.</footer>
      </div>
    </BrowserRouter>
  );
}
export default App;
