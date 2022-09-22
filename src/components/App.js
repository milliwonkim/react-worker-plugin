import React, { useState } from "react";
import { wrap } from "comlink";
import "../styles/App.css";
import { runBigTask, runBigTaskAsync } from "../utils";

const SECOND = 100000000;

function App() {
  const [data, setData] = useState();
  return (
    <div
      style={{
        backgroundColor: `${data === "loading" ? "orange" : "transparent"}`,
      }}
    >
      <button
        onClick={() => {
          console.log("boop");
        }}
      >
        Boop
      </button>
      <button
        onClick={async () => {
          setData("loading");
          const worker = new Worker(new URL("../worker", import.meta.url), {
            name: "runBigTaskWorker",
            type: "module",
          });
          const { runBigTask } = wrap(worker);
          setData(await runBigTask(SECOND));
        }}
      >
        Web Worker
      </button>
      <button
        onClick={() => {
          setData("loading");
          setData(runBigTask(SECOND));
        }}
      >
        Sync on Main thread
      </button>
      <button
        onClick={async () => {
          setData("loading");
          setData(await runBigTaskAsync(SECOND));
        }}
      >
        Async on Main thread
      </button>
    </div>
  );
}

export default App;
