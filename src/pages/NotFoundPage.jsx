import { Link } from "react-router-dom";
import image404Url from "../assets/404.svg";
import "./NotFoundPage.css";
import { useI8n } from "../provider/context";

export function NotFoundPage() {
  const { getText } = useI8n();

  return (
    <main className="app-main not-found-page">
      <img className="not-found-page--image" src={image404Url} />
      <div className="not-found-page--content">
        <h2 className="not-found-page--title">{getText("notFoundTitle")}</h2>
        <p className="not-found-page--text">{getText("checkUrlMessage")}</p>
        <p className="not-found-page--text">
          <Link className="not-found-page--link" to="/">
            {getText("homeAction")}
          </Link>
        </p>
      </div>
    </main>
  );
}

export function NotFoundPageWrapper() {
  return <NotFoundPage />;
}
