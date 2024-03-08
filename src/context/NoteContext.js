//WHY TO USE CONTEXT API?
//1. Context provides a way to pass data through the component tree without having to pass props down manually at every level.
//2.In a typical React application, data is passed top-down (parent to child) via props, but such usage can be cumbersome for certain types of props that are required by many components within an application
//3.context API is used with useContext[] hook


//Yha hum react ko keh rahe hai ki hum createContext API ko use krna chahte hai
import { createContext } from "react";

const NoteContext=createContext();

export default NoteContext;