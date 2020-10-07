import React, { Component } from 'react';
import ComposersService from "./ComposersService";
import "./Composers.css";

const composersService = new ComposersService();

class ComposerCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
            photo: null
        }

        this.nameInput = React.createRef();
        this.eraInput = React.createRef();
        this.articleInput = React.createRef();
        this.photoInput = React.createRef();
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            composersService.getComposer(params.pk).then((c) => {
                this.nameInput.current.value = c.name;
                this.eraInput.current.value = c.era;
                this.articleInput.current.value = c.article;            
            });
        }
    }

    handleImageChange = (e) => {
        this.setState({
            photo: e.target.files[0]
        })
    };

    createFormData(pk) {
        let formData = new FormData();
        if (pk !== undefined) { formData.append('pk', pk) }
        formData.append('photo', this.state.photo, this.state.photo.name);
        formData.append('name', this.nameInput.current.value);
        formData.append('era', this.eraInput.current.value);
        formData.append('article', this.articleInput.current.value);
        return formData;
    }

    handleCreate() {
        composersService.createComposer(this.createFormData()).then((result) => {
            alert("Composer created!");
        }).catch(() => {
            alert("There was an error! Please re-check your form");
        });
    }

    handleUpdate(pk) {
        composersService.updateComposer(this.createFormData(pk), pk).then((result) => {
                alert("Composer updated!");
            }).catch(() => {
                alert("There was an error! Please re-check your form");
            });
    }

    handleSubmit(event) {
        const {match: { params } } = this.props;
        if (params && params.pk) {
            this.handleUpdate(params.pk);
        } else {
            this.handleCreate();
        }
        event.preventDefault();
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="container">
                    <div className="form-group">
                        <label>Name:</label>
                        <input className="form-control" type="text" ref={this.nameInput} />

                        <label>Era:</label>
                        <select className="form-control" ref={this.eraInput}>
                            <option value='' selected>Выберите эпоху</option>
                            <option value="Барокко">Барокко</option>
                            <option value="Классицизм">Классицизм</option>
                            <option value="Романтизм">Романтизм</option>
                            <option value="Импрессионизм">Импрессионизм</option>
                        </select>

                        <label>Article:</label>
                        <textarea className="form-control" type="text" ref={this.articleInput} rows="10" />

                        <label>Photo:</label>
                        <input className="form-control" type="file" ref={this.photoInput} style={{marginBottom: 15}} onChange={this.handleImageChange}/>

                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        )
    }
}

export default ComposerCreateUpdate;