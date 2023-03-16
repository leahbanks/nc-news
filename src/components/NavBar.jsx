import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getTopics } from "../utils/api";
import { UserContext } from "../context/userContext";

export default function NavBar() {
  const [topics, setTopics] = useState("");
  const [navLoading, setNavLoading] = useState(true);
  const { loggedInUser, handleLogout } = useContext(UserContext);

  useEffect(() => {
    getTopics().then((topicRes) => {
      setTopics(topicRes);
      setNavLoading(false);
    });
  }, []);

  return navLoading ? (
    <section className="loading-animation"></section>
  ) : (
    <section className="navBar">
      {topics.map((topic) => {
        return (
          <div key={topic.description}>
            <Link
              to={`/articles/?topic=${topic.slug}`}
              key={topic.description}
              style={{ textDecoration: "none" }}
              className="nav-topics"
            >
              {topic.slug.charAt(0).toUpperCase() +
                topic.slug.slice(1, topic.length)}
            </Link>
          </div>
        );
      })}
      <div className="topics">
        {loggedInUser ? (
          <section className="user-loggedin">
            <button className="nav-login" onClick={handleLogout}>
              Log Out
            </button>
            <p>You are logged in as: {loggedInUser}</p>
          </section>
        ) : (
          <Link
            to="/users"
            style={{ textDecoration: "none" }}
            className="nav-login"
          >
            Log In
          </Link>
        )}
      </div>
    </section>
  );
}
