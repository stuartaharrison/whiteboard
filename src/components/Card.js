import React, { useState } from "react";
import useCard from "../hooks/UseCard";

const Card = ({ cardId }) => {
    const [itemTitle, setItemTitle] = useState("");
    const { card, isLoadingCard, updateCard } = useCard(cardId);

    const handleCheck = async (event, index) => {
        event.isDone = !event.isDone;
        await updateCard(event);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        card.events.push({
            title: itemTitle,
            isDone: false
        });

        await updateCard(card);
        setItemTitle("");
    }

    // TODO: skeleton loading
    if (isLoadingCard) {
        return <div>Loading</div>
    }

    return (
        <div className="board-item-card">
            <div className="card-list-header">
                <h3>{card.title}</h3>
            </div>
            <div className="card-list-content-wrapper">
                {(!card.events || card.events.length === 0) && (
                    <div>
                        No Items in list...
                    </div>
                )}
                {card.events && card.events.length > 0 && (
                    <ul className="card-list">
                        {card.events.map((evt, i) => (
                            <li key={i} className="card-list-item">
                                <label class="checkbox">
                                    <input 
                                        type="checkbox" 
                                        checked={evt.isDone} 
                                        onChange={() => handleCheck(evt, i)}
                                    />
                                    {evt.title}
                                </label>
                            </li>
                        ))}
                    </ul>
                )}
                <form className="card-list-add" onSubmit={handleSubmit}>
                    <div class="field is-grouped">
                        <p class="control is-expanded">
                            <input class="input is-small" 
                                type="text" 
                                placeholder="Add an item" 
                                value={itemTitle}
                                onChange={(e) => setItemTitle(e.target.value)}
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
    );
};

export default Card;