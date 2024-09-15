// src/socket.js
import { io } from 'socket.io-client';

const socket = io(process.env.REACT_APP_SERVER_URL); // Ensure this points to your backend
export default socket;
