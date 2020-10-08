import React from 'react';
import TextbooksService from './TextbooksService';
const textbooksService = new TextbooksService();

class TextbooksList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            textbooks: []
        }
    }

    componentDidMount() {
        textbooksService.getTextbooks().then((result) => {
            this.setState({textbooks: result.data})
        });
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Название</th>
                            <th scope="col">Описание</th>
                            <th scope="col">Ссылка</th>
                        </tr>
                    </thead>
                    <tbody>
                    {this.state.textbooks.map(t => 
                        <tr>
                            <th scope="row">{t.name}</th>
                            <td>{t.description}</td>
                            <td><a href={t.textbook}>Скачать</a></td>
                        </tr>)}
                    </tbody>
                </table>  
            </div>
        )
    }
}

export default TextbooksList;