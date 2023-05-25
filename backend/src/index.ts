import express, { Application, Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import dotenv from "dotenv";
import compression from "compression";
import { rateLimit } from "express-rate-limit";
import { Server as socketServer } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";
import http from "http";
import db from "./config/connection";
import { RowDataPacket } from "mysql2";

class Server {
  constructor() {
    this.app = express();
    dotenv.config();
    this.plugins();
    this.routes();
    this.server = http.createServer(this.app);
    this.io = new socketServer(this.server, {
      cors: { origin: "*", methods: ["GET", "POST"] },
    });
    this.webSocket();
  }

  // server configuration
  private app: Application;
  private server: http.Server<
    typeof http.IncomingMessage,
    typeof http.ServerResponse
  >;
  private io;

  private defaultRateLimit = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
  });

  // plugins
  protected plugins() {
    this.app.use(cors<Request>({ origin: "*", credentials: true }));
    this.app.use(cookieParser());
    this.app.use(helmet());
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(this.defaultRateLimit);
  }

  //   routing
  protected routes() {
    this.app.get("/", (request: Request, response: Response) => {
      response.status(200).send("Api is ready to use");
    });

    this.app.post("/login", (request: Request, response: Response) => {
      const { username, password } = request.body;
      const checkUser = `SELECT * from users where username='${username}' AND password = '${password}'`;
      db.query(checkUser, (err, fields) => {
        // const user: RowDataPacket = (fields as RowDataPacket[])[0];
        if (err) return err;
        if (fields.toString().length === 0) {
          return response.status(404).send("email or password not found");
        }
        return response.status(200).send("successfully login");
      });
    });

    this.app.post("/users", (request: Request, response: Response) => {
      const { username } = request.body;
      const users = `SELECT * FROM users WHERE username NOT in ('${username}')`;
      db.query(users, (err, fields) => {
        const users: RowDataPacket = fields as RowDataPacket;
        if (err) return err;
        if (fields.toString().length === 0) {
          return response.status(404).send("there is no users");
        }
        return response.status(200).json({ users: users });
      });
    });
  }

  protected webSocket() {
    this.io.on("connection", (socket) => {
      let roomId: string;
      socket.emit("userID", socket.id);

      socket.on("chat-message", (room, username, msg) => {
        console.log(msg);
        this.io.emit("chat-message", msg);
      });

      socket.on("chat", async (roomID, name, message) => {
        socket.data.username = name;

        socket.join(roomID);
        roomId = roomID;

        socket.emit("user-join", `${name} is logged in`);

        socket.in(roomID).emit("messages", message);
        socket.on("messages", (chat: any) => console.log(chat));
      });

      socket.on("disconnect", () => {
        console.log("user disconnected");
        this.io.to(roomId).emit("user-left", `${socket.data.username}`);
      });
    });
  }

  public start() {
    const PORT = process.env.PORT || 5000;
    this.server.listen(PORT, () =>
      console.log(`server running on port ${PORT}`)
    );
  }
}

const server = new Server();
server.start();
