"use strict";
const electron = require("electron");
const path = require("path");
const utils = require("@electron-toolkit/utils");
const ElectronStore = require("electron-store");
const child_process = require("child_process");
const icon = path.join(__dirname, "../../resources/icon.png");
const portNumber = 3e3;
const addJob = async (fileHash, peerID) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "PUT",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: `/add-job`,
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const jobID = JSON.parse(responseBody);
          resolve(jobID);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify({ fileHash, peerID }), "utf-8");
    request.end();
  });
};
const findPeers = async (fileHash) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: `/find-peers/:${fileHash}`,
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const filePeers = JSON.parse(responseBody);
          resolve(filePeers);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
const jobList = async () => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/job-list",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const data = JSON.parse(responseBody);
          resolve(data.jobs);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
const jobInfo = async (jobID) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: `/find-peers/:${jobID}`,
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const jobDetails = JSON.parse(responseBody);
          resolve(jobDetails);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
const startJobs = async (jobIDs) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/start-jobs",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};
const pauseJobs = async (jobIDs) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/pause-jobs",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};
const terminateJobs = async (jobIDs) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/terminate-jobs",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobIDs), "utf-8");
    request.end();
  });
};
const getHistory = async () => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/get-history",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const history = JSON.parse(responseBody);
          resolve(history.jobs);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
const removeFromHistory = async (jobID) => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/remove-from-history",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.write(JSON.stringify(jobID));
    request.end();
  });
};
const clearHistory = async () => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "POST",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/clear-history",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          if (response.statusCode == 200) {
            resolve(true);
          }
          resolve(false);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
const getPeers = async () => {
  return new Promise((resolve, reject) => {
    const request = electron.net.request({
      method: "GET",
      protocol: "http:",
      hostname: "localhost",
      port: portNumber,
      path: "/get-peers",
      redirect: "follow"
    });
    let responseBody = "";
    request.on("response", (response) => {
      console.info(`STATUS: ${response.statusCode}`);
      console.info(`HEADERS: ${JSON.stringify(response.headers)}`);
      if (response.statusCode === 404) {
        console.log("Page not found.");
        resolve([]);
        return;
      }
      response.on("data", (chunk) => {
        responseBody += chunk;
      });
      response.on("end", () => {
        console.log("No more data in response.");
        console.log("res body", responseBody);
        try {
          const files = JSON.parse(responseBody);
          if (!Array.isArray(files)) {
            throw new TypeError("Received data is not an array");
          }
          const peers = files.map((file) => ({
            Location: file.location,
            Latency: file.latency,
            PeerID: file.peerId,
            Connection: file.connection,
            OpenStreams: file.openStreams,
            FlagUrl: file.flagUrl
          }));
          resolve(peers);
        } catch (error) {
          console.error("Error parsing response:", error);
          reject(error);
        }
      });
    });
    request.on("error", (error) => {
      console.log(`ERROR: ${JSON.stringify(error)}`);
      reject(error);
    });
    request.on("close", () => {
      console.log("Last Transaction has occurred");
    });
    request.setHeader("Content-Type", "application/json");
    request.end();
  });
};
let backendProcess = null;
const schema = {
  backend: {
    type: "string",
    default: "go"
  }
};
const store = new ElectronStore({ schema });
electron.ipcMain.handle("get-backend", async () => {
  return store.get("backend");
});
electron.ipcMain.handle("set-backend", async (_, newBackend) => {
  store.set("backend", newBackend);
  startBackendProcess(newBackend);
});
function watchBackendChanges() {
  store.onDidChange("backend", (newValue, oldValue) => {
    console.log(`Backend changed from ${oldValue} to ${newValue}`);
    startBackendProcess(newValue);
  });
}
function startBackendProcess(backend) {
  console.log(`Attempting to start backend: ${backend}`);
  if (backendProcess) {
    console.log("Killing existing backend process");
    backendProcess.kill("SIGTERM");
    backendProcess = null;
  }
  let makeDirectory;
  let command;
  let args;
  if (backend.toLowerCase() === "go") {
    makeDirectory = path.join(__dirname, "../../orcanet-go/peer");
    command = "make";
    args = ["all"];
  } else if (backend.toLowerCase() === "js") {
    makeDirectory = `../../orcanet-${backend.toLowerCase()}/src`;
    command = process.execPath;
    args = ["."];
  } else if (backend.toLowerCase() === "rust") {
    const baseDir = path.join(__dirname, "../../orcanet-rust/peernode");
    const command2 = path.join(baseDir, "target/release/peer-node");
    backendProcess = child_process.spawn(command2, [], {
      cwd: baseDir,
      stdio: ["pipe", "pipe", "pipe"],
      shell: false
    });
    setupBackendProcessHandlers(backendProcess, backend);
    return;
  } else {
    console.error(`Unsupported backend type: ${backend}`);
    return;
  }
  console.log(`Directory for backend: ${makeDirectory}`);
  backendProcess = child_process.spawn(command, args, {
    cwd: makeDirectory,
    stdio: ["pipe", "pipe", "pipe"]
  });
  setupBackendProcessHandlers(backendProcess, backend);
}
function createWindow() {
  const mainWindow = new electron.BrowserWindow({
    width: 900,
    height: 670,
    show: true,
    autoHideMenuBar: true,
    ...process.platform === "linux" ? { icon } : {},
    center: true,
    title: "OrcaNet",
    frame: true,
    vibrancy: "under-window",
    visualEffectState: "active",
    // titleBarStyle: "hidden",
    trafficLightPosition: { x: 15, y: 10 },
    webPreferences: {
      preload: path.join(__dirname, "../preload/index.js"),
      sandbox: true,
      contextIsolation: true
      // nodeIntegration: false,
    }
  });
  mainWindow.on("ready-to-show", () => {
    mainWindow.show();
  });
  mainWindow.webContents.setWindowOpenHandler((details) => {
    electron.shell.openExternal(details.url);
    return { action: "deny" };
  });
  if (utils.is.dev && process.env["ELECTRON_RENDERER_URL"]) {
    mainWindow.loadURL(process.env["ELECTRON_RENDERER_URL"]);
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/index.html"));
  }
}
function setupBackendProcessHandlers(process2, backend) {
  let outputBuffer = "";
  const promptResponseMap = {
    "Enter a port number to start listening to requests for Market RPC Server:": "8121\n",
    "Enter a port number to start listening to requests for Market DHT Host:": "8122\n",
    "Enter a port number to start listening to requests for HTTP Server:": "3000\n"
  };
  process2.stdout.on("data", (data) => {
    const output = data.toString();
    console.log(`Backend output: ${output}`);
    outputBuffer += output;
    if (backend.toLowerCase() === "go") {
      Object.keys(promptResponseMap).forEach((prompt) => {
        if (outputBuffer.includes(prompt)) {
          process2.stdin.write(promptResponseMap[prompt]);
          outputBuffer = "";
        }
      });
    }
  });
  process2.stderr.on("data", (data) => {
    console.error(`Backend error: ${data.toString()}`);
  });
  process2.on("close", (code) => {
    console.log(`Backend process exited with code ${code}`);
  });
  process2.on("error", (err) => {
    console.error(`Failed to start backend process: ${err}`);
  });
}
electron.app.whenReady().then(() => {
  utils.electronApp.setAppUserModelId("com.electron");
  startBackendProcess(store.get("backend"));
  watchBackendChanges();
  electron.app.on("browser-window-created", (_, window) => {
    utils.optimizer.watchWindowShortcuts(window);
  });
  electron.ipcMain.on("ping", () => console.log("pong"));
  electron.ipcMain.handle(
    "getPeers",
    (_, ...args) => getPeers(...args)
  );
  electron.ipcMain.handle("addJob", (_, ...args) => addJob(...args));
  electron.ipcMain.handle(
    "findPeers",
    (_, ...args) => findPeers(...args)
  );
  electron.ipcMain.handle(
    "jobList",
    (_, ...args) => jobList(...args)
  );
  electron.ipcMain.handle(
    "jobInfo",
    (_, ...args) => jobInfo(...args)
  );
  electron.ipcMain.handle(
    "startJobs",
    (_, ...args) => startJobs(...args)
  );
  electron.ipcMain.handle(
    "pauseJobs",
    (_, ...args) => pauseJobs(...args)
  );
  electron.ipcMain.handle(
    "terminateJobs",
    (_, ...args) => terminateJobs(...args)
  );
  electron.ipcMain.handle(
    "getHistory",
    (_, ...args) => getHistory(...args)
  );
  electron.ipcMain.handle(
    "removeFromHistory",
    (_, ...args) => removeFromHistory(...args)
  );
  electron.ipcMain.handle(
    "clearHistory",
    (_, ...args) => clearHistory(...args)
  );
  createWindow();
  electron.app.on("activate", function() {
    if (electron.BrowserWindow.getAllWindows().length === 0)
      createWindow();
  });
});
electron.app.on("window-all-closed", () => {
  if (backendProcess) {
    backendProcess.kill("SIGTERM");
  }
  if (process.platform !== "darwin") {
    electron.app.quit();
  }
});
