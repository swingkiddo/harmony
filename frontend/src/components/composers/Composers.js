import React from 'react';
import "./Composers.css";

function Composers(props) {
    return (
        <div className="composers-list">
            {props.composers.map(c => 
                <div className="composer-card" key={c.pk}>
                    <a href={"/composers/" + c.pk}>
                        <div className="composer-card-photo" style={{backgroundImage: `url(${c.photo})`}}></div>
                        <div className="composer-card-name">
                            <p><span>{c.name}</span></p>
                        </div>

                    </a>
                </div>)
            }
        </div>
    )
}

export default Composers;