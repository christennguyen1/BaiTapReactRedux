import React, { Component } from 'react'
import { ThemeProvider } from 'styled-components'
import { ToDoListLightTheme } from '../Themes/ToDoListLightTheme'
import { ToDoListDarkTheme } from '../Themes/ToDoListDarkTheme'
import { Container } from '../Component/Container'
import { ToDoListPrimaryTheme } from '../Themes/ToDoListPrimaryTheme'
import { Dropdown } from '../Component/Dropdown'
import { Heading1, Heading2, Heading3, Heading4, Heading5 } from '../Component/Heading'
import { TextField } from '../Component/TextFeild'
import { Button } from '../Component/Button'
import { Table, Th, Thead, Tr } from '../Component/Table'
import { connect } from 'react-redux'
import { ChangeTheme, DoneTaskActions, EditTaskActions, ThemTask, UpdateTaskActions, XoaTaskActions } from '../../reduxToDoList/actions/TodoListActions'
import { arrTheme } from '../Themes/ThemeManager'


class TodoList extends Component {
  state = {
    taskName: '',
    disabled:true,
  }
  // handleTaskName(event){
  //   let {name,value}=event.target
  //    this.setState({[name]:value});
  // }
  renderTaskToDo = () => {
    return this.props.taskList.filter(task => !task.done).map((task, index) => {
      // task=>task.done nghia la true
      return (
        <Tr key={index}>
          <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
          <Th className="text-right">
            <Button
             onClick={()=>{
               this.setState({
                  disabled:false,
               },()=>{
                this.props.handleEditTask(task)
               })
              //  vì setState là thằng bất đồng bộ nên nhiều lúc sẽ có thể 
              //  props chạy trước rồi state sau sẽ dân đễn render lại và bị lỗi nên mình làm ntn
            }}
            className="ml-1"><i className="fa fa-edit"></i></Button>
            <Button
            onClick={()=>{
              this.props.handleDoneTask(task.id)
            }}
            className="ml-1"><i className="fa fa-check"></i></Button>
            <Button
             onClick={()=>{
              this.props.handleXoaTask(task.id)
            }}
            className="ml-1"><i className="fa fa-trash"></i></Button>
          </Th>
        </Tr>
      )
    })
  }

  renderTaskComplete = () => {
    return this.props.taskList.filter(task => task.done).map((task, index) => {
      // task=>task.done nghia la false
      return (
        <Tr key={index}>
          <Th style={{ verticalAlign: 'middle' }}>{task.taskName}</Th>
          <Th className="text-right">
            <Button
             onClick={()=>{
              this.props.handleXoaTask(task.id)
            }}
            className="ml-1"><i className="fa fa-trash"></i></Button>
          </Th>
        </Tr>
      )
    })
  }

  renderTheme = () => {
    return (
      arrTheme.map((theme, index) => {
        return <option value={theme.id}>{theme.name}</option>
      })
    )
  }

  render() {
    return (
      <ThemeProvider theme={this.props.themToDoList}>
        <Container className="w-50">
          <Dropdown onChange={(event) => {
            let { value } = event.target;
            this.props.handleChangeTheme(value);
          }} >
            {this.renderTheme()}
          </Dropdown>
          <Heading3>To do list</Heading3>
          <TextField
             value={this.state.taskName}

            onChange={(event) => {
              this.setState({ taskName: event.target.value })
            }}
            name="taskName" label="Task Name" className="w-50">
          </TextField>

          <Button onClick={() => {
            let { taskName } = this.state;
            let newTask = {
              id: Date.now(),
              taskName: taskName,
              done: false,
            }
            console.log(newTask);
            this.props.handleAddTask(newTask);
          }} className="ml-2"><i className="fa fa-plus"></i> Add task</Button>
          {
            this.state.disabled ? ( <Button disabled
              onClick={()=>{
                this.props.handleUpdateTask(this.state.taskName)
              }}
              className="ml-2"><i className="fa fa-upload"></i> Udate task</Button>) :(
                <Button 
                onClick={()=>{
                     let {taskName}=this.state;
                     this.setState({
                       disabled:true,
                       taskName:'',
                     })

                  this.props.handleUpdateTask(taskName)
                }}
                className="ml-2"><i className="fa fa-upload"></i> Udate task</Button>
              )

          }
          <hr />
          <Heading3>Task do do</Heading3>
          <Table>
            <Thead>
              {this.renderTaskToDo()}
            </Thead>
          </Table>
          {/* <Table>
            <Thead>
              <Tr>
                <Th  style={{ verticalAlign: 'middle' }}>Task name</Th>
                <Th className="text-right">
                  <Button className="ml-1"><i className="fa fa-edit"></i></Button>
                  <Button className="ml-1"><i className="fa fa-check"></i></Button>
                  <Button className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
              </Tr>
              <Tr >
                <Th style={{ verticalAlign: 'middle' }}>Task name</Th>
                <Th className="text-right">
                  <Button className="ml-1"><i className="fa fa-edit"></i></Button>
                  <Button className="ml-1"><i className="fa fa-check"></i></Button>
                  <Button className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
              </Tr>
            </Thead>
          </Table> */}
          <hr />
          <Heading3>Task complete</Heading3>
          <Table>
            <Thead>
              {this.renderTaskComplete()}
            </Thead>
          </Table>
          {/* <Table>
            <Thead>
              <Tr>
                <Th style={{ verticalAlign: 'middle' }}>Task name</Th>
                <Th className="text-right">
                  <Button className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
              </Tr>
              <Tr>
                <Th style={{ verticalAlign: 'middle' }}>Task name</Th>
                <Th className="text-right">
                  <Button className="ml-1"><i className="fa fa-trash"></i></Button>
                </Th>
              </Tr>
            </Thead>
          </Table> */}
        </Container>
      </ThemeProvider>
    )
  }
     componentDidUpdate(prevProps,prevState){
      if(prevProps.taskEdit.id!== this.props.taskEdit.id){
        this.setState({
          taskName:this.props.taskEdit.taskName
        })
      }
    }

}

let mapStateToProps = (state) => {
  return {
    themToDoList: state.reducerToDoList.themeToDoList,
    taskList: state.reducerToDoList.taskList,
    taskEdit: state.reducerToDoList.taskEdit
  }
};
let mapDispatchToProps = (dispatch) => {
  return {
    handleAddTask: (value) => {
      dispatch(ThemTask(value));
    },
    handleChangeTheme: (value) => {
      dispatch(ChangeTheme(value));
    },
    handleXoaTask:(value)=>{
      dispatch(XoaTaskActions(value));
    },
    handleDoneTask:(value)=>{
      dispatch(DoneTaskActions(value))
    },
    handleEditTask:(value)=>{
      dispatch(EditTaskActions(value))
    },
    handleUpdateTask:(value)=>{
      dispatch(UpdateTaskActions(value))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(TodoList);