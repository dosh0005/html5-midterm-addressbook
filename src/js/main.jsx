//imports
import ReactDOM from "react-dom";
import React from "react";
import { AddressList, ContactDetails } from "./lib";
import {contacts} from "./contacts";

//global variables
let state = {};

//on hash change
window.addEventListener("hashchange", ()=>setState({location: location.hash}));

//initializer
function setState(changes){
    //set changes to object state
    state = Object.assign({}, state, changes);

    let item;
    let location = state.location.replace(/^#\/?|\/$/g, "").split("/");

    //routing
    if (location[0] === "contact" ){
        item = state.items.find(item => item.id == location[1] ? true : false);
    }

    var MainView = (
        <div className="wrap">
            <AddressList items = {state.items} />
            <ContactDetails item = {item}/>
        </div>
    );

    ReactDOM.render(MainView, document.getElementById("react-app"));
}

//initial state
setState({
    items: contacts,
    location: location.hash
});