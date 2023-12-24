import { Link } from "react-router-dom";
import image404Url from "../assets/404.svg";
import "./NotFoundPage.css";

export function NotFoundPage() {
  return (
    <main className="app-main not-found-page">
      <img className="not-found-page--image" src={image404Url} />
      <div className="not-found-page--content">
        <h2 className="not-found-page--title">Halaman tidak ada!</h2>
        <p className="not-found-page--text">
          Coba cek URL sekali lagi. Bisa saja ada typo.
        </p>
        <p className="not-found-page--text">
          <Link className="not-found-page--link" to="/">
            Beranda
          </Link>
        </p>
      </div>
    </main>
  );
}

export function NotFoundPageWrapper() {
  return <NotFoundPage />;
}
