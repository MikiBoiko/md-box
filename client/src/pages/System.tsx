import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonProgressBar } from "@ionic/react";
import "./System.css"
import DirectoryList from "../components/SystemElements";
import { folderOutline, documentOutline } from 'ionicons/icons';
import { socket } from "../socket";
import { useCallback, useContext, useEffect, useState } from "react";
import appContext from "../context/appContext";
import { ElementQuery } from "../types/files";

const System: React.FC = () => {
  const { system } = useContext(appContext)

  const [newElement, setNewElement] = useState<ElementQuery | undefined>()
  const [selectedDirectory, setSelectedDirectory] = useState<string>('/')

  const onCancelElement = useCallback(() => {
    console.log('on cancel')
    setNewElement(undefined)
  }, [setNewElement])
  
  const onCommitElement = useCallback((name: string) => {
    console.log(name)

    if(newElement !== undefined && name.length > 0)
      socket.emit('system:create', { ...newElement, name })

    onCancelElement()
  }, [newElement, setNewElement, onCancelElement])

  // TODO : abstract please
  const onNewFile = useCallback(() => {
    const newElement: ElementQuery = {
      name: "",
      type: "file",
      path: selectedDirectory
    }
    setNewElement(newElement)
  }, [selectedDirectory, setNewElement])

  const onNewFolder = useCallback(() => {
    const newElement: ElementQuery = {
      name: "",
      type: "folder",
      path: selectedDirectory
    }
    setNewElement(newElement)
  }, [selectedDirectory, setNewElement])

  useEffect(() => {
    socket.emit('system:get')
  }, [])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">MD-BOX</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={onNewFolder}>
              <IonIcon icon={folderOutline} />
            </IonButton>
            <IonButton onClick={onNewFile}>
              <IonIcon icon={documentOutline} />
            </IonButton>
          </IonButtons>
          {
            (system === undefined)
              ? <IonProgressBar color="success" type="indeterminate"></IonProgressBar>
              : null
          }
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {
          (system !== undefined)
            ? <DirectoryList
              path="/"
              directory={system}
              newElement={newElement}
              selectedDirectory={selectedDirectory} 
              setSelectedDirectory={setSelectedDirectory}
              onCancelNewElement={onCancelElement}
              onCommitNewElement={onCommitElement}
            />
            : null
        }
      </IonContent>
    </IonPage>
  )
}

export default System;