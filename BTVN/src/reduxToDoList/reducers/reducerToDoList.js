
import { getValue } from "@testing-library/user-event/dist/utils";
import { arrTheme } from "../../TO_DO_LIST/Themes/ThemeManager";
import { ToDoListDarkTheme } from "../../TO_DO_LIST/Themes/ToDoListDarkTheme";
import { ADD_TASK, CHANGE_THEME, DONE_TASK, EDIT_TASK, UPDATE_TASK, XOA_TASK, } from "../constants/constantsToDoList";


let initialState={
  themeToDoList:ToDoListDarkTheme,
  taskList:[
    // {id:'task-1',taskName:'task 1',done:false},
    // {id:'task-2',taskName:'task 2',done:false},
    // {id:'task-3',taskName:'task 3',done:true},
    // {id:'task-4',taskName:'task 4',done:true},
  ],
  taskEdit:{id:'-1',taskName:'',done:true},
}

export const reducerToDoList=(state=initialState,action)=>{
    switch(action.type){
      case ADD_TASK:{
        // console.log("todo",action.payload);
        if(action.payload.taskName.trim()===''){
          alert('Chưa nhập Task');
          return{...state};
        }
        let taskListUpdate=[...state.taskList];
        let index=taskListUpdate.findIndex(task=>task.taskName===action.payload.taskName);
        if(index!==-1){
          alert('Trùng Task')
          return{...state};
        }
        taskListUpdate.push(action.payload)
        state.taskList=taskListUpdate;
        return {...state};
      }
      case CHANGE_THEME:{
        let theme=arrTheme.find((item)=>{
            return item.id==action.payload;
        })
        if(theme){
          state.themeToDoList={...theme.theme};
        }

        // console.log(theme);

        return {...state};
      }
      case XOA_TASK:{
        // let taskListDelete=[...state.taskList];
        // let index=taskListDelete.findIndex((item)=>{
        //   return item.id===action.payload;
        // })
        // if(index !== -1){
        //   taskListDelete.splice(index,1);
        // }
        // let taskListDelete=[...state.taskList];
        // let taskListDelet=taskListDelete.filter((item)=>{
        //   return item.id!==action.payload;
        // })

        return {...state,taskList:state.taskList.filter(task=>task.id!==action.payload)};
        // console.log(action);
        // return {...state}
      }
      case DONE_TASK:{
           let taskListUpdate=[...state.taskList];
           let index=taskListUpdate.findIndex((item)=>{
             return item.id===action.payload;
           })
           if(index !== -1){
             taskListUpdate[index].done=true;
           }
           return {...state,taskList:taskListUpdate};
      }
      case EDIT_TASK:{
        return {...state,taskEdit:action.payload};
      }
      case UPDATE_TASK:{
        state.taskEdit={...state.taskEdit,taskName:action.payload};
        let taskUpdate=[...state.taskList];
        let index = taskUpdate.findIndex((item)=>{
          return item.id===state.taskEdit.id;
        })
        if(index !== -1){
           taskUpdate[index]=state.taskEdit;
        }
        state.taskList=taskUpdate;
        state.taskEdit={id:'-1',taskName:'',done:false};
        return {...state}
      }
        default:
            return {...state};
    }
}