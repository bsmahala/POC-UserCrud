import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import Drawer from 'material-ui/Drawer';
import { login } from '../actions/loginLogoutActions';
import { removeAll } from '../utility/localStorageUtility';
import { connect } from 'react-redux';

// logout popmenu
const PopOverMenu = ({logout=e=>{} }) => <IconMenu
    iconButtonElement={
      <IconButton><MoreVertIcon /></IconButton>
    }
    targetOrigin={{horizontal: 'right', vertical: 'top'}}
    anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <MenuItem primaryText="Sign out" onClick={logout} />
  </IconMenu>;

PopOverMenu.muiName = 'IconMenu';


const menu = [
    {route:'/home', title: 'Home'},
    {route:'/adduser', title: 'Add User'},
];


// side bar
class SideBar extends Component {
  state = {};

 changeRoute(menu){
     this.setState({open : false})
     this.props.history.push(this.props.match.url+menu.route);
     this.setState({title: menu.title});
 }

  render() {
    return (
    <div>
        <Drawer docked={false}
          width={200}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}>
         {menu.map((menu, index) => 
                <MenuItem key={index} onClick={this.changeRoute.bind(this, menu)}>{menu.title}</MenuItem>
            )}
        </Drawer>
        <div className="fixedbar">
        <AppBar
          className	="appbar"
          title={this.state.title || 'Home'}
          onLeftIconButtonClick={e=>this.setState({open:!this.state.open})}
          iconElementLeft={this.state.open?<IconButton><NavigationClose /></IconButton>:null}
          iconElementRight={<PopOverMenu logout={e=>{
            removeAll();
            this.props.login();
            this.props.history.replace('/');
          }} />}
        />
        </div>
        </div>
    );
  }
}

export default connect(state=>({ loginData: state.loginData }), { login })(SideBar);