import { IonButton, IonContent, IonHeader, IonInput, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import './Login.css'
import { useState } from 'react'

interface LoginProps {
  onConnect: (keypass: string) => void
}

const Login: React.FC<LoginProps> = ({ onConnect }: LoginProps) => {
  const [keypass, setKeypass] = useState<string>('')

  const onConnectCliked = onConnect.bind(this)

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle size="large">ACCESS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
          }}
        >
          <IonInput type='password' value={keypass} onChange={(e) => setKeypass(e.currentTarget.textContent ?? '')} placeholder='keypass' />
          <IonButton color="primary" onClick={() => onConnectCliked(keypass)}>
            SEND
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  )
}

export default Login