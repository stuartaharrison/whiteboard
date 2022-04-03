import React, { useState } from "react";

const Column = ({ columnData, children, onCardAdd }) => {
    const [newCardTitle, setNewCardTitle] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (onCardAdd) {
            await onCardAdd(columnData, { 
                columnId: columnData.id,
                events: [],
                title: newCardTitle 
            });

            setNewCardTitle("");
        }
    };

    return (
        <div className="board-item">
            <div className="board-item-content">
                <div className="board-item-header">
                    <h2>{columnData?.title}</h2>
                </div>
                <div className="board-item-cards">
                    {children}
                </div>
                <div className="board-card-add-container">
                    <form onSubmit={handleSubmit}>
                        <div class="field is-grouped">
                            <p class="control is-expanded">
                                <input class="input is-small" 
                                    type="text" 
                                    placeholder="Add an item" 
                                    value={newCardTitle}
                                    onChange={(e) => setNewCardTitle(e.target.value)}
                                />
                            </p>
                            <p class="control">
                                <button className="button is-info is-small" type="submit">
                                    Add
                                </button>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Column;