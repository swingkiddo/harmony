import React from 'react';
import "./Composers.css";

function Composers(props) {
    return (
        <div className="composers">
            {props.composers.map(c => 
                <div className="composer-card" key={c.pk}>
                    <a href={"/composers/" + c.pk}>
                        <figure><img src={c.photo} style={{ height: 300 }}></img></figure>
                        <p><span>{c.name}</span></p>
                    </a>
                </div>)
            }
        </div>
    )
}

export default Composers;