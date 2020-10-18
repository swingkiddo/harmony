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
            searchValue: '',
            eraValue: '',

        }
        this.handleDelete = this.handleDelete.bind(this);
    }

    componentDidMount() {
        composersService.getComposers().then((result) => {
            this.setState({ composers: result.data})
        });
    }

    handleSearchChange = (e) => {
        this.setState({ searchValue: e.target.value.toLowerCase() })
    }

    handleEraChange = (e) => {
        this.setState({ eraValue: e.target.value })
    }

    sort = () => {
        console.log("hello");
        let sortedComposers = this.state.composers.sort(function(a, b) {
            if (a.name > b.name) return 1
            else if (a.name < b.name) return -1
        })
        this.setState({composers: sortedComposers})
    }

    handleDelete(e, pk) {
        composersService.deleteComposer({ pk: pk }).then(() => {
            var newArr = this.state.composers.filter((obj) => {
                return obj.pk !== pk;
            });
            this.setState({ composers: newArr })
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
    /*        <div className="container composers-main">
                <div className="filters">
                    <input type="text" onChange={this.handleSearchChange} style={{marginRight:10}}></input>
                    <select onChange={this.handleEraChange}>
                        <option value='' selected>Выберите эпоху</option>
                        <option value="Барокко">Барокко</option>
                        <option value="Классицизм">Классицизм</option>
                        <option value="Романтизм">Романтизм</option>
                        <option value="Импрессионизм">Импрессионизм</option>
                    </select>
                </div>
                {
                    filteredData 
                    ?   <Composers composers={filteredData} />
                    :   <Composers composers={this.state.composers} />
                }
            
            </div> */
            <div className="composers-wrapper">
                <div className="composers-filters">
                    <div className="composers-filters-name">
                        <input type="text" onChange={this.handleSearchChange}></input>
                    </div>
                    <div className="composers-filters-era">
                        <select onChange={this.handleEraChange}>
                            <option value='' selected>Выберите эпоху</option>
                            <option value="Барокко">Барокко</option>
                            <option value="Классицизм">Классицизм</option>
                            <option value="Романтизм">Романтизм</option>
                            <option value="Импрессионизм">Импрессионизм</option>
                        </select>
                    </div>
                    <div className="composers-filters-sort">
                        <button onClick={this.sort}>Sort</button>
                    </div>
                    
                </div>
                {
                    filteredData 
                    ?   <Composers composers={filteredData} />
                    :   <Composers composers={this.state.composers} />
                }
                </div>
        );
    }
}

export default ComposersList;