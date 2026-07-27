import "./setup";
import { createDecoWorkerEntry } from "@decocms/start/sdk/workerEntry";
import {
  corsHeaders,
  handleDecofileRead,
  handleDecofileReload,
  handleMeta,
  handleRender,
} from "@decocms/start/admin";
import serverEntry from "./server";

export default createDecoWorkerEntry(serverEntry, {
  admin: {
    handleMeta,
    handleDecofileRead,
    handleDecofileReload,
    handleRender,
    corsHeaders,
  },
});
