import { ADD_TASK, CHANGE_THEME, DONE_TASK, EDIT_TASK, UPDATE_TASK, XOA_TASK } from "../constants/constantsToDoList";


export const ThemTask = (value) => {
  return {
    type: ADD_TASK,
    payload: value,
  }
}

export const ChangeTheme=(value)=>{
  return {
    type:CHANGE_THEME,
    payload:value,
  }
}

export const XoaTaskActions=(value)=>{
  return {
    type:XOA_TASK,
    payload:value,
  }
}

export const DoneTaskActions=(value)=>{
  return {
    type:DONE_TASK,
    payload:value,
  }
}

export const EditTaskActions=(value)=>{
  return {
    type:EDIT_TASK,
    payload:value,
  }
}

export const UpdateTaskActions=(value)=>{
  return {
    type:UPDATE_TASK,
    payload:value,
  }
}