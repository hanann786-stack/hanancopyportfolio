import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <Helmet>
        <title>Page not found (404) — Hanan Arif</title>
        <meta name="description" content="This page does not exist. Head back to the Hanan Arif copywriting portfolio homepage." />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="Page not found (404) — Hanan Arif" />
        <meta property="og:description" content="This page does not exist. Head back to the Hanan Arif copywriting portfolio homepage." />
        <meta property="og:url" content="https://hanancopyportfolio.lovable.app/404" />
        <link rel="canonical" href="https://hanancopyportfolio.lovable.app/404" />
      </Helmet>
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
