import React, { Component } from 'react';
import ComposersService from './ComposersService';
import Composers from './Composers';

const composersService = new ComposersService();

class ComposersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            composers: [],
            nextPageURL: '',
            searchValue: '',
            eraValue: ''
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        composersService.getComposers().then((result) => {
            this.setState({composers: result.data, nextPageURL: result.nextlink})
        });
    }

    handleSearchChange = (e) => {
        this.setState({searchValue: e.target.value.toLowerCase()})
    }

    handleEraChange = (e) => {
        this.setState({eraValue: e.target.value})
    }

    handleDelete(e, pk) {
        composersService.deleteComposer({pk: pk}).then(() => {
            var newArr = this.state.composers.filter((obj) => {
                return obj.pk !== pk;
            });
            this.setState({composers: newArr})
        });
    }

    nextPage() {
        composersService.getCustomerByURL(this.state.nextPageURL).then((result) => {
            this.setState({composers: result.data, nextPageURL: result.nextlink})
        });
    }

    eraFilter = (data) => data.filter(c => c.era === this.state.eraValue)

    searchFilter = (data) => data.filter(c => c.name.toLowerCase().includes(this.state.searchValue))

    render() {
        let filteredData;
        if (this.state.eraValue && !filteredData) {
            filteredData = this.eraFilter(this.state.composers)
        } else if (this.state.eraValue && filteredData) {
            filteredData = this.eraFilter(filteredData)
        } 

        if (this.state.searchValue && !filteredData) {
            filteredData = this.searchFilter(this.state.composers)
        } else if (this.state.searchValue && filteredData) {
            filteredData = this.searchFilter(filteredData)
        } 
        
        return (
            <div className="composers--list">
                <div className="input-group search-bar">
                    <div className="input-group-prepend">
                        <span className="input-group-text" id="addon-wrapping">Поиск</span>
                    </div>
                    <input className="input-group form-control" type="search" onChange={this.handleSearchChange} />
                    <div className="composers-filters">
                        <select onChange={this.handleEraChange}>
                            <option selected value="">Выберите эпоху</option>
                            <option value="Романтизм">Романтизм</option>
                        </select>
                    </div>
                </div>
                {filteredData ? <Composers composers={filteredData} handleDelete={this.handleDelete}/>
                              : <Composers composers={this.state.composers} handleDelete={this.handleDelete} />}

                <button className="btn btn-primary hvr-pulse" onClick={ this.nextPage }>Next</button>

                <div className="composers">
                    {this.state.composers.map(c => 
                        <div className="composer-card" key={c.pk}>
                            <a href={"/composers/" + c.pk}>
                                <img src={c.photo} style={{height: 300}}></img>
                            </a>
                            <p><span>{c.name}</span></p>
                        </div>)}
                </div>
            </div>
        );
    }
}

export default ComposersList;