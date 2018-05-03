import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import { Field, reduxForm } from 'redux-form'
  import { Input } from '../common-component/FormComponent';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { connect } from 'react-redux';
import { fetchUsers, deleteUser } from '../actions/userActions';
import { Link } from 'react-router-dom';
import RaisedButton from 'material-ui/RaisedButton';
// 
const UserListComponent = ({users=[], deleteUser, edit}) => (
    <Table selectable={false}>
      <TableHeader displaySelectAll={false}
            adjustForCheckbox={false}>
        <TableRow>
        <TableHeaderColumn>#</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn>Country</TableHeaderColumn>
          <TableHeaderColumn>State</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      {users.map((row, index)=>
         <TableRow key={index}>
            <TableRowColumn>{index + 1}</TableRowColumn>
            <TableRowColumn>{row.firstname} {row.lastname}</TableRowColumn>
            <TableRowColumn>{row.country}</TableRowColumn>
            <TableRowColumn>{row.state}</TableRowColumn>
            <TableRowColumn>
              <Link to={`/admin/adduser/${row.id}`}><IconButton touch={true}>
              <FontIcon className="fa fa-edit" color='#e02222'/>
          </IconButton></Link>
          <IconButton touch={true} onClick={e=>deleteUser(row)}>
              <FontIcon className="fa fa-remove" color='#e02222'/>
          </IconButton>
        </TableRowColumn>
       </TableRow>        
      )}
      </TableBody>
    </Table>
  );


class UserList extends React.Component {

  constructor(props) {
    super(props);
    this.state={searchKey:''}
  }

  componentDidMount(){
    this.props.fetchUsers();
  }

  deleteUser(user) {
    this.props.deleteUser({id: user.id}, ()=>{
      alert('user delelesuccessfully')
    })    
  }

  searchResult() {
    const { searchKey } = this.state;
    const { list } = this.props.users;
    if(searchKey.length <=0 ) {
      return list;
    }

   return list.filter(row=>
      (row.firstname || '').toLowerCase().startsWith(searchKey) || (row.lastname || '').toLowerCase().startsWith(searchKey) 
      );
  }

  render() {
    return (
      <div>
        <Link to={`/admin/adduser`}><RaisedButton label="Add User" primary={true} /></Link>
      <Field name="search" label="Search Name" component={Input} onChange={(element,searchKey)=>this.setState({searchKey :searchKey.toLowerCase()})}  />
      <UserListComponent users={this.searchResult()} deleteUser={this.deleteUser.bind(this)} />
      </div>
    );
  }
}


UserList = reduxForm({
  form: 'list_user_form'
})(UserList);

export default connect(state=>({ users: state.users }), { fetchUsers, deleteUser })(UserList);