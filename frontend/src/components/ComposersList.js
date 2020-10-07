import React, { Component } from 'react';
import ComposersService from './ComposersService';
import Composers from './Composers';
import "./Composers.css";

const composersService = new ComposersService();

class ComposersList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            composers: [],
            fullData: [],
            nextPageURL: '',
            searchValue: '',
            eraValue: '',
            activePage: 1,
            totalItems: null
        }
        this.nextPage = this.nextPage.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        composersService.getComposers().then((result) => {
            this.setState({ composers: result.data, nextPageURL: result.nextlink, fullData: result.fullData, totalItems: result.count })
        });
    }

    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value.toLowerCase() })
    }

    handleEraChange = (e) => {
        this.setState({ eraValue: e.target.value })
    }


    handleDelete(e, pk) {
        composersService.deleteComposer({ pk: pk }).then(() => {
            var newArr = this.state.composers.filter((obj) => {
                return obj.pk !== pk;
            });
            this.setState({ composers: newArr })
        });
    }

    nextPage() {
        composersService.getComposersByURL(this.state.nextPageURL).then((result) => {
            this.setState({ composers: result.data, nextPageURL: result.nextlink })
        });
        console.log("check");
    }

    eraFilter = (data) => data.filter(c => c.era === this.state.eraValue)

    searchFilter = (data) => data.filter(c => c.name.toLowerCase().includes(this.state.searchValue))

    render() {
        let filteredData;

        if (this.state.eraValue && !filteredData) {
            filteredData = this.eraFilter(this.state.fullData)
        } else if (this.state.eraValue && filteredData) {
            filteredData = this.eraFilter(filteredData)
        }

        if (this.state.searchValue && !filteredData) {
            filteredData = this.searchFilter(this.state.fullData)
        } else if (this.state.searchValue && filteredData) {
            filteredData = this.searchFilter(filteredData)
        }
        
        return (
            <div className="container composers-main">
                <input type="text" onChange={this.handleSearchChange}></input>
                <select onChange={this.handleEraChange}>
                    <option value='' selected>Выберите эпоху</option>
                    <option value="Барокко">Барокко</option>
                    <option value="Классицизм">Классицизм</option>
                    <option value="Романтизм">Романтизм</option>
                    <option value="Импрессионизм">Импрессионизм</option>
                </select>

                {filteredData 
                    ?   <Composers composers={filteredData} />
                    :   <Composers composers={this.state.composers} />}

                <button className="btn btn-primary hvr-pulse" onClick={this.nextPage}>Next</button>
            </div>
        );
    }
}

export default ComposersList;