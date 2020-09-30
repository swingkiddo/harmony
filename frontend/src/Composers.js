import React from 'react';

function Composers(props) {
    return (
        <table className="table">
            <thead key="thead">
                <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Era</th>
                    <th>Article</th>
                    <th>Photo</th>
                </tr>
            </thead>
            <tbody>
                {props.composers.map(c => 
                <tr key={c.pk}>
                    <td>{c.pk}</td>
                    <td>{c.name}</td>
                    <td>{c.era}</td>
                    <td>{c.article}</td>
                    <td><img src={c.photo} style={{height: 100}}></img></td>
                    <td>
                        <button onClick={(e) => props.handleDelete(e, c.pk)}> Delete</button>
                        <a href={"composers/" + c.pk}> Update </a>
                    </td>
                </tr>)}
            </tbody>
        </table>
        
    )
}

export default Composers;