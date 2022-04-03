import { useEffect, useState  } from "react";
import { addDoc, arrayUnion, collection, query, where, onSnapshot, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase-config";

const useColumns = (boardId) => {
    const [columns, setColumns] = useState([]);
    const [isLoadingColumns, setIsLoadingColumns] = useState(true);
 
    const addCardToColumn = async (column, cardData) => {
        try {
            const docRef = await addDoc(collection(db, "cards"), cardData);
            const colRef = await doc(db, "columns", column.id);

            await updateDoc(colRef, {
                cards: arrayUnion(docRef.id)
            });
        }
        catch (error) {
            console.log(error.message);
        }
    };

    useEffect(() => {
        const q = query(collection(db, "columns"), where("boardId", "==", boardId));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            var mappedColumns = [];
            snapshot.forEach((doc) => {
                mappedColumns.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setColumns(mappedColumns);
            setIsLoadingColumns(false);
        });

        return unsubscribe;
    }, [ boardId ]);

    return { addCardToColumn, boardId, columns, isLoadingColumns }
}

export default useColumns;