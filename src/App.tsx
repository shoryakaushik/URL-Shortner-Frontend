import { Button, DatePicker, Descriptions, Input } from "antd";
import { Moment } from "moment";
import React, { useState, useEffect } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import Title from "./components/atoms/title";
import { useSelector, useDispatch } from "react-redux";
import { createUrl, getAllUserUrls } from "./store/actions";
import { ERROR, HOST, URL_VALIDATE_REGEX } from "./utils/constants";

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
      setErrorMessage(ERROR.MISSING_FIELDS);
    } else if (!originalUrl.match(URL_VALIDATE_REGEX)) {
      setErrorMessage(ERROR.URL_INVALID);
    } else {
      setErrorMessage("");
      dispatch(createUrl(originalUrl, expirationDate));
    }
  };

  return (
    <main className="App">
      <Title>Url Shortner</Title>
      <section>
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
      </section>
      <section>
        {urls.map((url: IUrl) => {
          return (
            <Descriptions layout="vertical" bordered>
              <Descriptions.Item label="Original Url">
                {url.originalUrl}
              </Descriptions.Item>
              <Descriptions.Item label="Converted Url">{`${HOST}${url.shortUrl}`}</Descriptions.Item>
              <Descriptions.Item label="IPs accessing this Url">
                {url.accessedBy?.map((accessor) => {
                  return <>{accessor}</>;
                })}
              </Descriptions.Item>
            </Descriptions>
          );
        })}
      </section>
    </main>
  );
};

export default App;
