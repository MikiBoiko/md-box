import { Redirect, Route } from 'react-router-dom'
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import File from './pages/File'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css'

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css'
import '@ionic/react/css/structure.css'
import '@ionic/react/css/typography.css'

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css'
import '@ionic/react/css/float-elements.css'
import '@ionic/react/css/text-alignment.css'
import '@ionic/react/css/text-transformation.css'
import '@ionic/react/css/flex-utils.css'
import '@ionic/react/css/display.css'

/* Theme variables */
import './theme/variables.css'

/* React */
import { useEffect, useState } from 'react'

/* Socket connection */
import { socket } from './socket'

/* App context */
import appContext from './context/appContext'

/* App types */
import { Directory, ElementQuery } from './types/files'

/* Pages */
import System from './pages/System'
import Login from './pages/Login'
import Loading from './pages/Loading'
setupIonicReact()

const App: React.FC = () => {
  const [logged, setLogged] = useState<boolean>()
  const [system, setSystem] = useState<Directory>()
  const [file, setFile] = useState<string>('')

  useEffect(() => {
    function onConnect() {
      setLogged(true)
    }

    function onDisconnect() {
      setLogged(false)
    }

    function onSystemGet(list: Directory) {
      console.log(list)
      setSystem(list)
    }

    function onFileRead(path: string, file: string) {
      setFile(file)
    }

    socket.on('connect', onConnect)
    socket.on('disconnect', onDisconnect)
    socket.on('system:get', onSystemGet)
    socket.on('file:read', onFileRead)

    return () => {
      socket.off('connect', onConnect)
      socket.off('disconnect', onDisconnect)
      socket.off('system:get', onSystemGet)
      socket.off('file:read', onFileRead)
    }
  }, [setLogged])


  const appContent = (
    <appContext.Provider value={{ logged, system, file, setFile }}>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/system">
            <System />
          </Route>
          <Route path="/box">
            <File />
          </Route>
          <Route exact path="/">
            <Redirect to="/system" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </appContext.Provider>
  )

  return (
    <IonApp>
      {
        (logged === undefined)
          ? <Loading />
          : (logged === true)
            ? appContent
            : <Login onConnect={() => setLogged(true)} />
      }
    </IonApp>
  )
}

export default App
