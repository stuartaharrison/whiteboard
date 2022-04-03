import { useEffect, useState  } from "react";
import { addDoc, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const useCard = (cardId) => {
    const [card, setCard] = useState(null);
    const [isLoadingCard, setIsLoadingCard] = useState(true);
 
    const addCard = async (columnId, title) => {
        try {
            await addDoc(collection(db, "cards"), {
                columnId,
                events: [],
                title
            });
        }
        catch (error) {
            // TODO: error out message
            console.log(error.message);
        }
    };

    const updateCard = async (card) => {
        try {
            const docRef = await doc(db, "cards", card.id);
            await updateDoc(docRef, card);
        }
        catch (error) {
            // TODO: error out message
            console.log(error.message);
        }
    };

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "cards", cardId), (doc) => {
            setCard({
                id: doc.id,
                ...doc.data()
            });
            setIsLoadingCard(false);
        });

        return unsubscribe;
    }, [ cardId ]);

    return { addCard, cardId, card, isLoadingCard, updateCard }
}

export default useCard;