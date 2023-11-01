import { IonAccordion, IonAccordionGroup, IonButton, IonButtons, IonIcon, IonInput, IonItem, IonLabel, IonList, IonTextarea } from "@ionic/react"
import { File, Directory, ElementQuery } from "../types/files"
import { folderOutline, logoMarkdown, checkmarkOutline, closeOutline } from 'ionicons/icons';
import { useState } from "react";

type FileElementProps = {
  path: string
  file: File
}

const FileElement = ({ path, file }: FileElementProps) => {
  const { name } = file

  return (
    <IonItem lines="none" routerLink={`box${path}${name}`} routerDirection="none" color="light">
      <IonIcon className="ion-padding" icon={logoMarkdown} />
      <IonLabel>{name}</IonLabel>
    </IonItem>
  )
}

type DirectoryListProps = {
  path: string
  directory: Directory
  selectedDirectory: string
  setSelectedDirectory: (path: string) => void
  newElement: ElementQuery | undefined
  onCancelNewElement: () => void
  onCommitNewElement: (name: string) => void
}

const DirectoryList = ({ path, directory, newElement, selectedDirectory, setSelectedDirectory, onCancelNewElement: onCancel, onCommitNewElement: onCommit }: DirectoryListProps) => {
  const { directories, files } = directory

  return (
    <div>
      <IonAccordionGroup multiple={true}>
        {
          directories.map((directory: Directory, index) => {
            const { name } = directory

            const nextPath = `${path}${name}/`
            const isSelected: boolean = selectedDirectory === nextPath

            return (
              <IonAccordion key={index} value={index.toString()}>
                <IonItem
                  lines="none"
                  slot="header"
                  onClick={() => setSelectedDirectory(isSelected ? '/' : nextPath)}
                  color={isSelected ? "medium" : "light"}
                >
                  <IonIcon className="ion-padding" icon={folderOutline} />
                  <IonLabel>
                    {name}
                  </IonLabel>
                </IonItem>
                <div style={{ paddingLeft: "1rem" }} slot="content">
                  <DirectoryList
                    path={nextPath}
                    directory={directory}
                    newElement={newElement}
                    selectedDirectory={selectedDirectory}
                    setSelectedDirectory={setSelectedDirectory}
                    onCancelNewElement={onCancel}
                    onCommitNewElement={onCommit}
                  />
                </div>
              </IonAccordion>
            )
          })
        }
      </IonAccordionGroup>
      <div>
        {
          newElement !== undefined
            && newElement.type === "folder"
            && newElement.path === path
            ? <NewDirectoryElement onCommit={onCommit} />
            : null
        }
        {
          files.map((file: File, index: number) => {
            return (
              <FileElement
                key={index}
                path={path}
                file={file}
              />
            )
          })
        }
        {
          newElement !== undefined
            && newElement.type === "file"
            && newElement.path === path
            ? <NewFileElement onCommit={onCommit} />
            : null
        }
      </div>
    </div>
  )
}

// TODO : abstract
type NewElementProps = {
  onCommit: (name: string) => void
}

const NewFileElement = ({ onCommit }: NewElementProps) => {
  const [name, setName] = useState<string>('')

  return (
    <IonItem color="medium">
      <IonIcon className="ion-padding" icon={logoMarkdown} />
      <IonInput
        placeholder="File name..."
        autofocus={true}
        onKeyDown={
          (e) => {
            if (e.code === 'Enter')
              onCommit(name)
          }
        }
        onIonChange={(e) => {
          const value = e.target.value as string
          setName(value)
        }}
      />
      <IonButtons slot="end">
        <IonButton size="large" onClick={() => onCommit(name)}>
          <IonIcon icon={name !== undefined && name.length > 0 ? checkmarkOutline : closeOutline} />
        </IonButton>
      </IonButtons>
    </IonItem>
  )
}

const NewDirectoryElement = ({ onCommit }: NewElementProps) => {
  const [name, setName] = useState<string>('')

  return (
    <IonItem color="medium">
      <IonIcon className="ion-padding" icon={folderOutline} />
      <IonInput
        placeholder="Folder name..."
        autofocus={true}
        onKeyDown={
          (e) => {
            if (e.code === 'Enter')
              onCommit(name)
          }
        }
        onChange={(e) => {
          const value = e.currentTarget.value as string
          setName(value)
        }}
      />
      <IonButtons slot="end">
        <IonButton size="large" onClick={() => onCommit(name)}>
          <IonIcon icon={name !== undefined && name.length > 0 ? checkmarkOutline : closeOutline} />
        </IonButton>
      </IonButtons>
    </IonItem>
  )
}

export default DirectoryList;