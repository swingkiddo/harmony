import React from 'react';
import ComposersService from './ComposersService';
import "./Composers.css";

const composersService = new ComposersService();

class ComposerDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            composer: {}
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            composersService.getComposer(params.pk).then((c) => {
                this.setState({composer: c})
            })
        }
    }

    render() {
        return (
            <div className="container" >
                <a href={"/composers/update/" + this.state.composer.pk}>Update</a>
                <img src={this.state.composer.photo} className="detail-image"></img>
                <h1 className="detail-name">{this.state.composer.name}</h1>
                <p className="detail-article">{this.state.composer.article}</p>
            </div>
        )
    }
}

export default ComposerDetail;