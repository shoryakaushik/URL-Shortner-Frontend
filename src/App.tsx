import { Button, DatePicker, Input, TimePicker } from "antd";
import moment, { Moment } from "moment";
import React, { useState } from "react";
import "./App.scss";
import "antd/dist/antd.css";
import Title from "./components/atoms/title";

const App: React.FC = () => {
  const [originalUrl, setOriginalUrl] = useState<string>("");
  const [expirationDate, setExpirationDate] = useState<Moment | null>(null);
  const [expirationTime, setExpirationTime] = useState<Moment | null>(
    moment("00:00:00", "HH:mm:ss")
  );

  const handleOriginalUrlChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => setOriginalUrl(event.target.value);

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
        <TimePicker
          value={expirationTime}
          onChange={(value: Moment | null) => setExpirationTime(value)}
          defaultValue={moment("00:00:00", "HH:mm:ss")}
        />
        <Button type="primary">Convert</Button>
      </div>
    </div>
  );
};

export default App;
