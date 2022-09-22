import { expose } from "comlink";
import { runBigTask } from "./utils";

const worker = {
  runBigTask,
};

expose(worker);
