import React, { useState, useEffect, useRef } from 'react';
import Home from './Home.js'
import App from '../App.js'
import Authorlist from './Authorlist.js'
import ReactMarkdown from 'react-markdown'
import './Article.css';

const axios = require('axios');


function Article(props) {
    const [data, updateData] = useState([]);

    useEffect(() => {
        let url = "http://localhost:8080/api/collections/get/article?=ff2102c27c881fa65e3768d48230bf";
        axios.post(url)
            .then(function (response) {
                updateData(response.data.entries);
            });
    }, [props.location.state]);


    let blogPost = data.map(x => {
        if (x.title === props.location.state) {
            return (
                <>
                    <div className="singleBlogPost_container">
                        <div className="singleBlogPost_title">{x.title}</div>
                        <div className="singleBlogPost_body"><ReactMarkdown>{x.body}</ReactMarkdown></div>
                        <p className="singleBlogPost_p">Published</p>
                        <div className="singleBlogPost_published">{x.published}</div>
                        <p className="singleBlogPost_p">By</p>
                        {(x.author || []).map(y => <div className="singleBlogPost_author">{y.display}</div>)}
                    </div>
                </>
            )
        }
    }
    )

    return (
        <div className="Home">
            {blogPost}
        </div>
    );
}


export default Article;