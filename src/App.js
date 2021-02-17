import { useRef, useState } from "react";
import Hls from "hls.js";
import data from "./data.json";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState("");
  const video = useRef(null);
  const hls = new Hls();
  hls.loadSource(videoUrl);
  hls.attachMedia(video.current);
  hls.on(Hls.Events.MANIFEST_PARSED, function () {
    video.current.play();
  });

  return (
    <div className="App">
      <header className="App-header">
        <h2>Please choose your stream</h2>
        <select
          onChange={(event) => {
            setVideoUrl(event.target.value);
          }}
          style={{ marginBottom: 50, padding: 10 }}
          defaultValue="default"
        >
          <option value="default" disabled>
            Choose here
          </option>
          {data.streams.map((url) => (
            <option key={url.id} value={url.source}>
              {url.name}
            </option>
          ))}
        </select>
        <video ref={video} autoPlay={true} controls className="videoPlayer" />
      </header>
    </div>
  );
}

export default App;
