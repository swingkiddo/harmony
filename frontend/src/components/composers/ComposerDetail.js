import React from 'react';
import ComposersService from './ComposersService';
import "./ComposerDetail.css";

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
        const composer = this.state.composer;
        return (
        <div className="composer-detail">
            <div className="composer-detail-hero">
                <div className="composer-detail-photo" style={{backgroundImage: `url(${composer.photo})`}}></div>
                <div className="composer-detail-hero-container">
                    <div id="composer-name">
                        <h1>{composer.name}</h1>
                    </div>
                    <div id="composer-date">
                        <span>{composer.date_of_birth}</span>
                    </div>
                    <div id="composer-nationality">
                        <span>{composer.nationality}</span>    
                    </div>
                </div>
            </div>
            <div className="composer-detail-content">

            </div>
        </div>
        )
    }
}

export default ComposerDetail;