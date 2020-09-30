import React, { Component } from 'react';
import ComposersService from "./ComposersService";

const composersService = new ComposersService();

class ComposerCreateUpdate extends Component {

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    
        this.state = {
            photo: null
        }
    }

    componentDidMount() {
        const { match: { params } } = this.props;
        if (params && params.pk) {
            composersService.getComposer(params.pk).then((c) => {
                this.refs.name.value = c.name;
                this.refs.era.value = c.era;
                this.refs.article.value = c.article;
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
        if (pk !== undefined) { formData.append('pk', pk); }
        formData.append('photo', this.state.photo, this.state.photo.name);
        formData.append('name', this.refs.name.value);
        formData.append('era', this.refs.era.value);
        formData.append('article', this.refs.article.value);
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
                alert("Customer updated!");
            }).catch(() => {
                alert("There was an error! Please re-check your form");
            });
    }

    handleSubmit(event) {
        const {match: { params} } = this.props;
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
                        <input className="form-control" type="text" ref="name" />

                        <label>Era:</label>
                        <input className="form-control" type="text" ref="era" />

                        <label>Article:</label>
                        <textarea className="form-control" type="text" ref="article" rows="10" />

                        <label>Photo:</label>
                        <input className="form-control" type="file" ref="photo" style={{marginBottom: 15}} onChange={this.handleImageChange}/>

                        <input className="btn btn-primary" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        )
    }
}

export default ComposerCreateUpdate;