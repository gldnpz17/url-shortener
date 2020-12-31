import { useEffect } from "react"
import { useParams } from "react-router-dom";

const RedirectPage = () => {
  var { shortName } = useParams();

  useEffect(() => {
    const fetchUrl = async () => {
      var response = await fetch(`/api/url/${shortName}`);

      if (response.status !== 200) {
        window.location = "/";
      } else {
        var result = await response.json();
        window.location = result.longUrl;
      }
    }

    fetchUrl();
  });

  return (
    <>
      <h1 className="text-center">Redirecting</h1>
      <h3 className="text-center">short.gldnpz.com</h3>
    </>
  )
}

export default RedirectPage;