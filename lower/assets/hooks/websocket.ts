import { Metacom } from "api/metacom";
import { toast } from "react-toastify";

interface Client {
  ws: any;
}

const apiClient = {} as Client;
const load = (m: any) => m.load("auth");
let setPreloader: Function;
let setWsStatus: Function;

export const useWebsocket = (setStatus: Function) => {
  if (apiClient.hasOwnProperty("ws")) {
    return apiClient.ws;
  }

  let first = true;
  const onMessage = (callType: any, args: any) => {
    if (args.auth) {
      setTimeout(() => {
        setStatus(true);
        setWsStatus && setWsStatus(true);
      }, 0);
      first = false;
    }
  };

  fetch(process.env.REACT_APP_API_URL, {
    method: "GET",
    // headers: { 'Content-Type': 'application/json' }
  })
    .then((resp) => {
      const url = new URL(resp.url);
      const protocol = url.protocol === "http:" ? "ws" : "wss";
      const metacom = Metacom.create(`${protocol}://${url.host}/api`);
      metacom.reactCalls.set("open", () => (first ? null : load(metacom)));
      metacom.reactCalls.set("message", onMessage);
      metacom.reactCalls.set("close", () => setWsStatus(false));
      load(metacom);
      return metacom;
    })
    .then((metacom) => {
      const { api } = metacom;
      apiClient.ws = api;
      if (process.env.NODE_ENV === "development") {
        (window as any).api = api;
      }
    })
    .catch((err) => console.error(err));
};

function JSONString(str: string) {
  try {
    return JSON.parse(str);
  } catch (e) {
    return false;
  }
}

export const useFetching = async (
  path: string[],
  params = {},
  loader = false
) => {
  let suffics;
  if (["C", "R", "U", "D", "ALL"].includes(path[0])) {
    const suf = path.shift();
    if (suf !== "ALL") {
      suffics = `[${suf}]`;
    }
  }
  if (suffics) {
    const i = path.length - 1;
    path[i] += suffics;
  }
  try {
    loader && setPreloader && setPreloader(true);
    let method = apiClient.ws;
    for (const item of path) {
      method = method[item];
    }
    return await method(params);
  } catch (e: any) {
    const invalidPos = e.message.indexOf("Invalid parameters type");
    // schema errors
    if (invalidPos !== -1) {
      const err = e.message.substring(invalidPos + 25).split(";");
      const errObj: any = {};
      for (const rec of err) {
        const recStr = rec.trim();
        const found = recStr.match(/^Field "([\w.\s]+)"/);
        if (found && found[1]) {
          let k = found[1].trim();
          const arr = k.split(".");
          if (arr.length > 1) {
            k = arr[arr.length - 1];
          }
          errObj[k] = rec;
        }
      }

      return { status: "error", message: errObj, detail: "IPT" };
    }
    // validation errors
    if (e.code === 500) {
      const mess = JSONString(e.message);
      if (mess && mess.errors) {
        const errObj: any = {};
        for (const err of mess.errors) {
          if (!err.hasOwnProperty("instancePath")) continue;
          errObj[err.instancePath.substring(1)] = err.message;
        }

        return { status: "error", message: errObj, detail: "IPT" };
      }
    }

    toast.error(e.message, {
      theme: "colored",
      autoClose: 10000,
    });

    return { status: "error", message: e.message };
  } finally {
    setPreloader && setPreloader(false);
  }
};

// export const usePreloader = (setter, wsSetter) => {
//     setPreloader = setter;
//     setWsStatus = wsSetter;
// }
