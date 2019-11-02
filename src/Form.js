import React from 'react';
export class Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filmname: '',
            filmurl: '',
            whythisfilm: '',
        };
        this.onChange = this.onChange.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        });
    }
    submitForm(event) {
        const config = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(this.state),
        };
        const url = "http://campus-bordeaux.ovh:3001/api/quests/employees/";
        fetch(url, config)
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    alert(res.error);
                }
                else {
                    alert(`Added Film with the ID ${res}!`);
                }
            }).catch(event => {
                console.error(event);
                alert('Error, film not added');
            });
        event.preventDefault();
    }
    render() {
        return (<div className="FormFavMovie">
            <h1> Your favorite film:</h1>

            <form onSubmit={this.submitForm}>
                <fieldset>
                    <legend>Information</legend>
                    <div className="form-data">
                        <label htmlFor="filmname">Film Name</label>
                        <input type="text" id="filmname" name="filmname" onChange={this.onChange} value={this.state.filmname} />
                    </div>

                    <div className="form-data">
                        <label htmlFor="filmurl">Film URL</label>
                        <input type="text" id="filmurl" name="filmurl" onChange={this.onChange} value={this.state.filmurl} />
                    </div>

                    <div className="form-data">
                        <label htmlFor="email">why do you like this film? what drew you to this film?</label>
                        <input type="text" id="whythisfilm" name="whythisfilm" onChange={this.onChange} value={this.state.whythisfilm} />
                    </div>
                    <hr />
                    <div className="form-data">
                        <input type="submit" value="Send" />
                    </div>
                </fieldset>
            </form>
        </div>);
    }
}
