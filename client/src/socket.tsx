import { io } from 'socket.io-client'

const HOST: string = 'http://localhost'
const PORT: string = '3000'
const URL: string = `${HOST}:${PORT}`

export const socket = io(URL)