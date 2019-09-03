import React, { useState, useEffect, useRef } from 'react';
import App from '../App.js'
import Article from './Article.js'
import Authorlist from './Authorlist.js'
import './Home.css';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import ReactMarkdown from 'react-markdown'
const axios = require('axios');

function Home(props) {

    const [data, updateData] = useState([]);
    const [total, updateTotal] = useState(0);
    const [skip, updateSkip] = useState(0);
    const [limit, updateLimit] = useState(4);
    const [disPrev, updateDisPrev] = useState(false)
    const [disNext, updateDisNext] = useState(true)
    const selectEl = useRef(null);

    useEffect(() => {
        let pagination = "&limit=" + limit +"&skip=" + skip;
        let url = "http://localhost:8080/api/collections/get/article?=ff2102c27c881fa65e3768d48230bf" + pagination;
        axios.post(url)
            .then(function (response) {
                let tot = parseInt(response.data.total);
                updateTotal(tot);
                updateData(response.data.entries);
            });
            console.log("Skip:")
            console.log(skip);
            console.log("Limit");
            console.log(limit)
    }, [skip, limit]);

    useEffect(() => {
        if (skip - limit < 0) {
            updateDisPrev(true)
            updateDisNext(false)
        }
        else if (skip + limit >= total) {
            updateDisNext(true);
            updateDisPrev(false)
        }
        else {
            updateDisNext(false);
            updateDisPrev(false);
        }

        if (limit == total) {
            updateDisNext(true);
            updateDisPrev(true);
        }

        if (skip > total) {
            updateSkip(limit);
        }
    }, [skip, limit]);

    const goBack = () => {
        updateSkip(skip - limit);
    }

    const goForward = () => {
        updateSkip(skip + limit);
    }

    const onSelect = (e) => {
            updateLimit(selectEl.current.value);
    }

    let blogPost = data.map(x => {
        return (
            <>
                <div className="blogPost_container">
                    <div className="blogPost_title" ><Link className="link" to={{ pathname: "/article", state: x.title }}>{x.title}</Link></div>
                    <div className="blogPost_body"><ReactMarkdown>{x.body}</ReactMarkdown></div>
                    <p className="blogPost_p">Published</p>
                    <div className="blogPost_published">{x.published}</div>
                    <p className="blogPost_p">By</p>
                    {(x.author || []).map(y => <div className="blogPost_author">{y.display}</div>)}
                </div>
            </>
        )
    }
    )

    return (
        <div className="Home">
            {blogPost}
            <div className="button_container">
                <button disabled={disPrev} onClick={goBack}>Back</button>
                <div className="select_container">
                    Articles per Page:
                    <select ref={selectEl} onChange={onSelect}>
                        <option value={4}>4</option>
                        <option value={6}>6</option>
                        <option value={8}>8</option>
                        <option value={10}>10</option>
                    </select>
                </div>
                <button disabled={disNext} onClick={goForward}>Forward</button>
            </div>
        </div>
    );
}

export default Home;