import { IonHeader, IonToolbar, IonTitle, IonProgressBar } from "@ionic/react"

export default function Loading() {
    return (
        <IonHeader>
            <IonToolbar>
                <IonTitle>MD-BOX</IonTitle>
                <IonProgressBar type="indeterminate"></IonProgressBar>
            </IonToolbar>
        </IonHeader>
    )
}

