import { useEffect, useState  } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";

const useBoard = (boardId) => {
    const [board, setBoard] = useState(null);
    const [isLoadingBoard, setIsLoadingBoard] = useState(true);

    useEffect(() => {
        const unsubscribe = onSnapshot(doc(db, "boards", boardId), (doc) => {
            setBoard({
                id: doc.id,
                ...doc.data()
            });
            setIsLoadingBoard(false);
        });

        return unsubscribe;
    }, [ boardId ]);

    return { boardId, board, isLoadingBoard };
};

export default useBoard;