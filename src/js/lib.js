import React, {Component} from "react"; // eslint-disable-line no-unused-vars
import PropTypes from "prop-types";


// Left side - Address list
export class AddressList extends Component {
    render() {
        return (
            <div className='container list'>
                <li>Scroll for more contacts</li>
                <ul>
                    {this.props.items.map( item => (
                        <li key={item.key} >
                            <a href={"#contact/" + item.id}>
                                <figure>
                                    <img src={item.picture.thumbnail} alt={formatName(item.name)} />
                                    <figcaption>
                                        <p>{formatName(item.name)}</p>
                                        <span>{formatDOB(item.dob)}</span>
                                    </figcaption>
                                </figure>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

AddressList.propTypes = {
    items: PropTypes.array
};


// Right side - Contact details
export class ContactDetails extends Component {
    render() {
        if (!this.props.item){
            return (
                <div className='container details'>
                    <p>Please select a contact</p>
                </div>
            );
        } else {
            return (
                <div className='container details'>
                    <div>
                        <figure>
                            <img src={this.props.item.picture.large} alt={formatName(this.props.item.name)} />
                            <figcaption>
                                <h2>{formatName(this.props.item.name, true)}</h2>
                            </figcaption>
                        </figure>
                        <p>DoB:&emsp;&emsp;{formatDOB(this.props.item.dob)} ( {formateAge(this.props.item.dob)} years old )</p>
                        <p>Email:&emsp;&nbsp;&nbsp;{this.props.item.email}</p>
                        <p>Phone:&emsp;&nbsp;&nbsp;{this.props.item.phone}</p>
                        <p>Cell:&emsp;&emsp;{this.props.item.cell}</p>
                        <p>Address:&nbsp;&nbsp;{formateAddress(this.props.item.location, 1)}</p>
                        <p>&emsp;&emsp;&emsp;&emsp;{formateAddress(this.props.item.location, 2)}</p>
                        <p>&emsp;&emsp;&emsp;&emsp;{formateAddress(this.props.item.location, 3)}</p>
                    </div>
                </div>
            );
        }
    }
}

ContactDetails.propTypes = {
    item: PropTypes.object
};

// month name list
const fullMonthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];


// Format Contact Name
function formatName({title = "empty", first = "empty", last = "empty"}, withTitle = false) {
    let fullName = "";
    if (withTitle) {
        fullName = upperCase(title) + " ";
    }
    fullName += upperCase(first) + " " + upperCase(last);

    return fullName;
}

// Format DOB
function formatDOB(dob = "1900-01-01 00:00:01") {
    let date = new Date(dob);
    return fullMonthName[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}


// Format Address
function formateAddress({street = "empty", city = "empty", state = "empty", postcode = 0}, line = 1) {
    switch (line) {
    case 1:
        return upperCase(street);
    case 2:
        return upperCase(city) + ", " + upperCase(state);
    case 3:
        return postcode;
    }
}

// Format Age
function formateAge(dob = "1900-01-01 00:00:01") {
    let date = new Date(Date.now() - new Date(dob).getTime());
    return Math.abs(date.getUTCFullYear() - 1970);
}

// First alphabet Uppercase
function upperCase(text) {
    return text.split(" ").map(str => str[0].toUpperCase() + str.substring(1)).join(" ");
}
