import { useRef, useState, useEffect } from "react";
import videoJs from "video.js";
import "video.js/dist/video-js.css";
import dataVideo from "./data.json";
import "./App.css";

function App() {
  const [videoUrl, setVideoUrl] = useState(
    "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8"
  );
  const videoNode = useRef(null);
  const playerRef = useRef(null);

  const data = {
    src:
      "https://multiplatform-f.akamaihd.net/i/multi/will/bunny/big_buck_bunny_,640x360_400,640x360_700,640x360_1000,950x540_1500,.f4v.csmil/master.m3u8",
    controls: true,
    autoplay: true,
  };

  useEffect(() => {
    playerRef.current = videoJs(videoNode.current, {
      controls: data.controls,
      autoplay: data.autoplay,
      fill: true,
      fluid: true,
      preload: "auto",
    });

    playerRef.current.src({ type: "application/x-mpegURL", src: videoUrl });

    //player.current.hlsQualitySelector()

    return () => playerRef.current.dispose();
  }, [data.src, data.controls, data.autoplay, data.poster, videoUrl]);

  return (
    <div className="App">
      <header className="App-header" key={videoUrl}>
        <h2>Please choose your stream</h2>
        <select
          onChange={(event) => {
            setVideoUrl(event.target.value);
          }}
          style={{ marginBottom: 150, padding: 10 }}
          value={videoUrl}
        >
          {dataVideo.streams.map((url) => (
            <option key={url.id} value={url.source}>
              {url.name}
            </option>
          ))}
        </select>

        <video
          ref={videoNode}
          className="video-js vjs-default-skin"
          playsinline
        />
      </header>
    </div>
  );
}

export default App;
