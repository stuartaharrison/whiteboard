import React from "react";
import { NavLink } from "react-router-dom";
import useBoardsList from "../hooks/UseBoardsList";

const TopBoardsList = () => {
    const { boards, isLoadingBoards } = useBoardsList();
    return (
        <section className="p-3">
            <span>📋 My Recent Boards</span>
            <div className="columns is-multiline mt-3">
                {boards.map((el) => (
                    <div key={el.id} className="column is-one-third">
                        <NavLink to={`/b/${el.id}`}>
                            <div className="box is-clickable" style={{
                                backgroundColor: el.colour
                            }}>
                                {el.name}
                            </div>
                        </NavLink>
                    </div>
                ))}
            </div>
        </section>
        
    );
};

export default TopBoardsList;