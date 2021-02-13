import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import {
  selectBlogLanguage,
  selectUserInput,
  setBlogData,
  setBlogLanguage,
  selectBlogSortBy,
  setBlogSortBy,
} from "../config/useSlice";
import "../styles/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  const blogLanguage = useSelector(selectBlogLanguage);
  const blogSortBy = useSelector(selectBlogSortBy);
  const blogUrl = `https://gnews.io/api/v4/search?q=${searchInput}&lang=${blogLanguage}&sortby=${blogSortBy}&token=${process.env.REACT_APP_BLOG_API_KEY}`;
  const dispatch = useDispatch();

  const [state, setState] = useState({
    langDisplay: "none",
    sortDisplay: "none",
  });
  const [language, SetLanguage] = useState("en");
  const [sortby, setSortBy] = useState("relevance");

  const [blogs, setBlogs] = useState();
  const langDisplayStyle = {
    display: state.langDisplay,
  };
  const sortDisplayStyle = {
    display: state.sortDisplay,
  };

  const [loading, setLoading] = useState(true);
  // const selectOption = (e) => {
  //   SetLanguage(e.target.id);
  //   dispatch(setBlogLanguage(language));

  //   if (state.langDisplay == "none")
  //     setState({ ...state, langDisplay: "block" });
  //   else setState({ ...state, langDisplay: "none" });
  // };

  // const toggleLangDisplay = () => {
  //   if (state.langDisplay == "none") {
  //     setState({ ...state, langDisplay: "block" });
  //   } else {
  //     setState({ ...state, langDisplay: "none" });
  //   }
  // };
  // const toggleSortDisplay = () => {
  //   if (state.sortDisplay == "none") {
  //     setState({ ...state, sortDisplay: "block" });
  //   } else {
  //     setState({ ...state, sortDisplay: "none" });
  //   }
  // };

  // const selectSortBy = (e) => {
  //   setSortBy(e.target.id);
  //   dispatch(setBlogSortBy(sortby));
  //   toggleSortDisplay();
  // };

  const selectOption = (e) => {
    if (isSortBy(e)) {
      setSortBy(e.target.id);
      dispatch(setBlogSortBy(sortby));
    } else {
      SetLanguage(e.target.id);
      dispatch(setBlogLanguage(language));
    }
    toggleDisplay(e);
  };

  const toggleDisplay = (e) => {
    if (isSortBy(e)) {
      if (state.sortDisplay == "none")
        setState({ ...state, sortDisplay: "block" });
      else setState({ ...state, sortDisplay: "none" });
    } else {
      if (state.langDisplay == "none") {
        setState({ ...state, langDisplay: "block" });
      } else {
        setState({ ...state, langDisplay: "none" });
      }
    }
  };

  const isSortBy = (e) => {
    return (
      e.target.id == "relevance" ||
      e.target.id == "publishedAt" ||
      e.target.id == "sort"
    );
  };
  // const isSortBtn = (e) => {
  //   return e.target.id == "sort";
  // };

  useEffect(() => {
    axios
      .get(blogUrl)
      .then((res) => {
        dispatch(setBlogData(res.data));
        setBlogs(res.data);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchInput, blogLanguage, blogSortBy]);

  return (
    <div className="blog__page">
      <h1 className="bloge__page__header">Blogs</h1>
      {loading && <h1 className="loading">Loading...</h1>}
      {!loading && (
        <div className="dropBox">
          <div className="dropdown">
            <button className="dropbtn" id="lang" onClick={toggleDisplay}>
              language
            </button>
            <div className="lang__filter" style={langDisplayStyle}>
              <ul>
                <li href="#" id="en" onClick={selectOption}>
                  English
                </li>
                <li href="#" id="de" onClick={selectOption}>
                  German
                </li>
                <li href="#" id="es" onClick={selectOption}>
                  Spanish
                </li>
                <li href="#" id="fr" onClick={selectOption}>
                  French
                </li>
                <li href="#" id="it" onClick={selectOption}>
                  Italian
                </li>
                <li href="#" id="ru" onClick={selectOption}>
                  Russian
                </li>
                <li href="#" id="pt" onClick={selectOption}>
                  Portuguese
                </li>
                <li href="#" id="hi" onClick={selectOption}>
                  Hindi
                </li>
              </ul>
            </div>
            <div className="dropdown">
              <button
                className="dropbtn sort__filter"
                onClick={toggleDisplay}
                id="sort"
              >
                Sortby
              </button>
              <div
                className="lang__filter sort__filter"
                style={sortDisplayStyle}
              >
                <ul>
                  <li id="relevance" onClick={selectOption}>
                    relevance
                  </li>
                  <li id="updatedAt" onClick={selectOption}>
                    time
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a href={blog.url} target="_blank" className="blog">
            <img src={blog.image} />
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.content}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles == 0 && (
          <h1 className="no__blogs">
            No blogs Available 😔. Search something else
          </h1>
        )}
      </div>
    </div>
  );
};

export default Blogs;
