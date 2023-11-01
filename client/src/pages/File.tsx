import { useContext, useEffect, useState } from 'react'
import { IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { chevronBackOutline, eyeOutline, pencilOutline } from "ionicons/icons"
import { MarkdownEditor, MarkdownViewer } from '../components/Markdown'
import './File.css'
import { socket } from '../socket'
import appContext from '../context/appContext'

const File: React.FC = () => {
  const { file, setFile } = useContext(appContext)

  const [editing, setEditing] = useState<boolean>(false)

  const path = window.location.pathname.split("%20").join(" ")

  const viewer = <MarkdownViewer>{file}</MarkdownViewer>
  const editor = <MarkdownEditor state={file} setState={setFile} />

  useEffect(() => {
    socket.emit('file:read', path)
  }, [])


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">{path}</IonTitle>
          <IonButtons slot='start'>
            <IonButton routerLink={``} routerDirection='back'>
              <IonIcon icon={chevronBackOutline} />
            </IonButton>
          </IonButtons>
          <IonButtons slot='end'>
            <IonButton
              onClick={() => {
                setEditing(!editing)
              }}
              size="large"
            >
              <IonIcon icon={editing ? eyeOutline : pencilOutline} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          editing
            ? editor
            : viewer
        }
      </IonContent>
    </IonPage>
  )
}

export default File
