import React, { useState, useEffect, useRef } from 'react';
import Home from './Home.js'
import Article from './Article.js'
import App from '../App.js'
import './Authorlist.css';
import ReactMarkdown from 'react-markdown'
const axios = require('axios');

function Authorlist() {

    const [data, updateData] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8080/api/collections/get/author?=ff2102c27c881fa65e3768d48230bf";
        axios.post(url)
            .then(function (response) {
                updateData(response.data.entries);
            });
    }, []);

    let authorList = data.map(x => {

        return (
            <>
                <div className="author_container">
                    <div className="author_name">{x.name}</div><br/>
                    <div className="row_container">
                        <div className="author_info"><ReactMarkdown>{x.description}</ReactMarkdown></div>
                        <div className="author_imageContainer"><img className="author_image" src={"http://localhost:8080/" + x.author.path} /></div>
                    </div>
                </div>
            </>
        )
    }
    )

    return (
        <div className="Authorlist">
            {authorList}
        </div>
    );
}

export default Authorlist;