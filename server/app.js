// project path
const { dirname } = require('path');
const PROJECT = dirname(require.main.filename)

// enviroment variables
require('dotenv').config()
const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || '3000'
const CLIENT = process.env.CLIENT || 'http://localhost:8100'
const BOX_PATH = process.env.BOX || `${PROJECT}`

const fs = require("fs")
// create box folder if it does not exist
if (!fs.existsSync(BOX_PATH)) {
  fs.mkdirSync(BOX_PATH)
}

// express server
const app = require('express')();
const server = require('http').createServer(app)

// add cors
const cors = {
  origin: CLIENT
}
app.use(require('cors')(cors))

// add socket.io with cors to express server
const io = require('socket.io')(server, { cors })

// define event methods
function getSystem(path = `${BOX_PATH}/box/`, name = 'box') {
  const read = fs.readdirSync(path)

  let files = [], directories = []
  read.forEach((filename) => {
    const split = filename.split('.')

    if(split.length === 1)
      directories.push(getSystem(`${path}/${filename}/`, split[0]))
    else if(split.length === 2 &&  split[1] === 'md') {
      files.push({
        name: split[0]
      })
    }
  })

  return { name, directories, files }
}

// client connection
io.on('connection', socket => {
  console.log(`connection (${socket.id}).`)
  
  // define generic methods
  const handleError = (message) => {
    console.error(`${message} (${socket.id})`)
    socket.emit("error", message)
  }
  
  // register system events
  socket.on('system:get', () => {
    try {
      console.log(`system:get (${socket.id}).`)

      const { name, directories, files } = getSystem()
      
      socket.emit('system:get', { name, directories, files })
    } catch (err) {
      handleError(err)
    }
  })

  socket.on('system:create', (element) => {
    console.log(`system:create (${socket.id}).`)
    console.log(element)
    
  })

  socket.on('file:open', (path) => {
    console.log(`file:open ${path} (${socket.id}).`)
    
    try {
      const content = fs.readFileSync(`${BOX_PATH}${path}.md`, 'utf8')
    } catch (err) {
      handleError(err)
    }

    socket.join(path)
    socket.emit('file:update', path, content)
  })

  socket.on('file:close', (path) => {
    socket.leave(path)
  })
  
  socket.on('file:update', (path, content) => {
    console.log(path, content)
    io.to(path).emit('file:update', path, content)
  })
})


server.listen(PORT, HOST, (err) => {
  if (err) console.error(err)
  else console.log(`MD-BOX server started at http://${HOST}:${PORT} for client at ${CLIENT}.\nBox path at ${BOX_PATH}.`)
})