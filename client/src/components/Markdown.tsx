import { IonTextarea } from '@ionic/react'
import { useEffect, useState } from 'react'
import * as MD from 'react-markdown'
import remarkGfm from 'remark-gfm'

type MarkdownViewerProps = {
  children: string
}

const MarkdownViewer = ({ children }: MarkdownViewerProps) => {
  return (
    <div className='ion-padding'>
      <MD.default remarkPlugins={[remarkGfm]}>{children}</MD.default>
    </div>
  )
}

type MarkdownEditorProps = {
  state: string
  setState: (state: string) => void
}

const MarkdownEditor = ({ state, setState }: MarkdownEditorProps) => {
  const [currentState, setCurrentState] = useState<string>(state)

  useEffect(() => {
    setCurrentState(state)
  }, [state])

  return (
    <IonTextarea
      placeholder='Start writing a new file...'
      color="none"
      className='ion-padding'
      autoGrow={true}
      value={currentState}
      onIonChange={(e) => {
        setCurrentState(e.detail.value ?? '')
      }}
    />
  )
}

export { MarkdownViewer, MarkdownEditor }