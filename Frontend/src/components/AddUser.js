import React from 'react';
import {
    Table,
    TableBody,
    TableHeader,
    TableHeaderColumn,
    TableRow,
    TableRowColumn,
  } from 'material-ui/Table';
  import { Field,FieldArray, reduxForm } from 'redux-form'
  import { Input } from '../common-component/FormComponent';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import { Validation } from '../utility/validationUtility';
import { connect } from 'react-redux';
import { addUpdateUser, selectUser, fetchUsers } from '../actions/userActions';
import { Link } from 'react-router-dom';
// skill component to make dynamic component
const renderSkills = ({fields, meta: {error, submitFailed}}) => (
    <div>
        <RaisedButton label="Add Skill" primary={true}  onClick={() => fields.push({})} />
       {fields.length > 0 ? 
       <Table selectable={false}>
       <TableHeader displaySelectAll={false} adjustForCheckbox={false} >
        <TableRow>
          <TableHeaderColumn>#</TableHeaderColumn>
          <TableHeaderColumn>Name</TableHeaderColumn>
          <TableHeaderColumn># of Year</TableHeaderColumn>
          <TableHeaderColumn>Sample Url</TableHeaderColumn>
          <TableHeaderColumn>Action</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
      {fields.map((skill, index) => (
            <TableRow key={index}  displayBorder={false}>
            <TableRowColumn>Skill #{index + 1}</TableRowColumn>
            <TableRowColumn> <Field
                        name={`${skill}.skill`}
                        component={Input}
                        label="Skill Name"
                    /></TableRowColumn>
            <TableRowColumn> <Field
                        name={`${skill}.year`}
                        type="number"
                        component={Input}
                        label="# of year"
                    />                    
            </TableRowColumn>
            <TableRowColumn> <Field
                        name={`${skill}.samplecodeurl`}
                        type="text"
                        component={Input}
                        label="Sample Code Url"
                    />                    
            </TableRowColumn>
            <TableRowColumn>
            <IconButton touch={true} onClick={() => fields.remove(index)}>
            <FontIcon className="fa fa-remove" color='#e02222' />
        </IconButton></TableRowColumn>
            </TableRow>
      ))}
       </TableBody>
    </Table> : null}
    </div>
  )








// add user component
class AddUser extends React.Component {

  
  componentWillMount(){
    const { users:{list}, fetchUsers} = this.props;
    if(list.length === 0) {
        fetchUsers(()=>this.componentDidMount());
      }
  }

  componentDidMount(){
      const {match, users:{list}, selectUser} = this.props;
      
      if(match.params.id) {
        var user  = list.find(e=>e.id+'' === match.params.id+'');
        if(user) {
            selectUser(user);
        }
      }
  }
//submit add user data
  submitForm(data) {
      const { reset, history } = this.props;
      this.props.addUpdateUser(data, ()=>{
           alert('datasave successfully')
           reset();
           history.push('/admin')
      });
  }

  render() {

    const { handleSubmit, match } = this.props;
    return (
        <div>
         <form onSubmit={handleSubmit(this.submitForm.bind(this))}>
         <Table selectable={false}>
            <TableBody displayRowCheckbox={false}>
                <TableRow displayBorder={false}>
                    <TableRowColumn><Field name="firstname" label="First Name" component={Input}  /></TableRowColumn>
                    <TableRowColumn><Field name="lastname" label="Last Name" component={Input}  /></TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                    <TableRowColumn><Field name="city" label="City" component={Input}  /></TableRowColumn>
                    <TableRowColumn><Field name="state" label="State" component={Input}  /></TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                    <TableRowColumn><Field name="country" label="Country" component={Input}  /></TableRowColumn>
                    <TableRowColumn><Field name="company" label="Company" component={Input}  /></TableRowColumn>
                </TableRow>
                <TableRow displayBorder={false}>
                    <TableRowColumn><Field name="linkedinurl" label="LinkedIn profile URL" component={Input}  /></TableRowColumn>
                    <TableRowColumn><Field name="portfoliourl" label="Portfolio URL" component={Input}  /></TableRowColumn>
                </TableRow>
            </TableBody>
         </Table>
            <br/>
            <br/>
            <FieldArray name="skills" component={renderSkills} />
            
            <div className="btncontainer">
                <RaisedButton type="submit" label={ match.params.id?'Update User' : 'Add User'} primary={true} />
                <Link to={`/admin/`}><RaisedButton label="User List" primary={true} /></Link>
            </div>
            </form>
        </div>
    );
  }
}
// valid user field
const validate = values => {
    const errors = {}
    Validation.required(values, errors, 'firstname');
    Validation.required(values, errors, 'lastname');
    Validation.required(values, errors, 'country');
    Validation.validURL(values, errors, 'linkedinurl');
    Validation.validURL(values, errors, 'portfoliourl');

    const skillArrayErrors = [];
    (values.skills || []).forEach((skill, index) => {
      const skillErrors = {}
      Validation.required(skill, skillErrors, 'skill');    
      Validation.required(skill, skillErrors, 'year');
      Validation.validURL(skill, skillErrors, 'samplecodeurl');
      

      skillArrayErrors[index] = skillErrors;
    });
    if (skillArrayErrors.length>0) {
        errors.skills = skillArrayErrors
      }
    return errors;
  }


  // add user component
  AddUser = reduxForm({
    form: 'add_user_form',
    enableReinitialize: true,
    validate
})(AddUser);

export default connect(state=>({ users: state.users, initialValues: state.users.selected }), { addUpdateUser, fetchUsers, selectUser })(AddUser);