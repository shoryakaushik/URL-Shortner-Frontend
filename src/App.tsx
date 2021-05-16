import { Button, DatePicker, Input } from "antd";
import { Moment } from "moment";
import React, { useState, useEffect } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import Title from "./components/atoms/title";
import { useSelector, useDispatch } from "react-redux";
import { createUrl, getAllUserUrls } from "./store/actions";

const App: React.FC = () => {
  const urls = useSelector((state: UrlState) => state.urls);
  const dispatch = useDispatch();
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<Moment | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

  useEffect(() => {
    dispatch(getAllUserUrls());
  }, [dispatch]);

  const validate = () => !originalUrl || !expirationDate;

  const handleOriginalUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOriginalUrl(event.target.value);

  const handleShortenUrl = () => {
    if (!originalUrl && !expirationDate) {
      setErrorMessage("Enter all fields");
    } else if (
      !originalUrl.match(
        "((http|https)://)(www.)?" +
          "[a-zA-Z0-9@:%._\\+~#?&//=]" +
          "{2,256}\\.[a-z]" +
          "{2,6}\\b([-a-zA-Z0-9@:%" +
          "._\\+~#?&//=]*)"
      )
    ) {
      setErrorMessage("Url Not Valid");
    } else {
      dispatch(createUrl(originalUrl, expirationDate));
    }
  };

  return (
    <div className="App">
      <Title>Url Shortner</Title>
      <div>
        <Input
          value={originalUrl}
          placeholder="Enter Url"
          onChange={handleOriginalUrlChange}
        />
        <DatePicker
          value={expirationDate}
          onChange={(value: Moment | null) => setExpirationDate(value)}
        />
        <Button
          type="primary"
          disabled={validate()}
          onClick={() => handleShortenUrl()}
        >
          Convert
        </Button>
        {errorMessage}
      </div>
      <div>
        {urls.map((url: IUrl) => {
          return (
            <div>
              <p>{url.originalUrl}</p>
              <p>Converts To</p>
              <p>{`http://localhost:8080/url/get?url=${url.shortUrl}`}</p>
              <p>Accessed By Following IP:</p>
              {url.accessedBy?.map((accessor) => {
                return (
                  <>
                    {accessor}
                  </>
                );
              })}
            </div>
          )
        })}
      </div>
    </div>
  );
};

export default App;
