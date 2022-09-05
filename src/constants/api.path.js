import { environment } from "./environment";

// Login User Token
export const TOKEN = localStorage.getItem("token");

// Register
export const REGISTER_URL = `${environment.apiUrl}/register`;

// Login
export const LOGIN_URL = `${environment.apiUrl}/login`;
export const LOGOUT_URL = `${environment.apiUrl}/logout`;

// Home
export const HOME_URL = `${environment.apiUrl}/home`;
export const GET_TODOLIST_URL = `${environment.apiUrl}/home-service/show-todolist`;
export const CREATE_TIMESCHEDULE_URL = `${environment.apiUrl}/home-service/set-time-schedule`;
export const CREATE_BUSSCHEDULE_URL = `${environment.apiUrl}/home-service/set-bus-schedule`;
export const GET_BUSSCHEDULE_URL = `${environment.apiUrl}/home-service/show-busSchedule`;
export const GET_MOVIETIME_URL = `${environment.apiUrl}/home-service/show-movie-time`;

