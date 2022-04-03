import React from "react";
import { useParams } from "react-router-dom";
import useBoard from "../hooks/UseBoard";
import useColumns from "../hooks/UseColumns";
import Card from "./Card";
import Column from "./Column";
import ColumnAdd from "./ColumnAdd";


const Whiteboard = () => {
    let params = useParams();
    const { boardId } = params;
    const { board, isLoadingBoard } = useBoard(boardId);
    const { addCardToColumn, columns, isLoadingColumns } = useColumns(boardId);

    const handleAddCard = async (column, cardData) => {
        await addCardToColumn(column, cardData);
    };

    if (isLoadingBoard) {
        return <div>Loading...</div>
    }

    return (
        <div className="board-wrapper" style={{
            backgroundColor: board?.colour
        }}>
            <div className="board-main-content">
                <div className="board-header">
                    <span>{board?.name}</span>
                </div>
                <div className="board-canvas">
                    <div className="board">
                        {columns?.map((col) => (
                            <Column key={col.id} columnData={col} onCardAdd={handleAddCard}>
                                {col.cards?.map((cId) => (
                                    <Card key={cId} cardId={cId} />
                                ))}
                            </Column>
                        ))}
                        <ColumnAdd />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Whiteboard;