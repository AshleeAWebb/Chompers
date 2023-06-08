import React from "react";
import "./ErrorPage.css";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  return (
    <section className="error-page">
        <Link to="/" className="error-link">
        Error: Just when you thought it was safe to surf the web... 
        Your  page has vanished into the deep. 
        Let's swim back to familiar shores.
        </Link>
    </section>
  );
};
