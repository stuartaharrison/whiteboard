import { useEffect, useState  } from "react";
import { useAuth } from "../contexts/AuthContext";

// TODO: context?
import { db } from "../firebase-config";
import { collection, query, where, onSnapshot  } from "firebase/firestore";

const useBoardsList = () => {
    const { currentUser } = useAuth();
    const { uid } = currentUser;
    const [boards, setBoards] = useState([]);
    const [isLoadingBoards, setIsLoadingBoards] = useState(true);

    useEffect(() => {
        const q = query(collection(db, "boards"), where("uid", "==", uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            var mappedBoards = [];
            snapshot.forEach((doc) => {
                mappedBoards.push({
                    id: doc.id,
                    ...doc.data()
                });
            });

            setBoards(mappedBoards);
            setIsLoadingBoards(false);
        });

        return unsubscribe;
    }, [ uid ]);

    return { boards, isLoadingBoards };
};

export default useBoardsList;