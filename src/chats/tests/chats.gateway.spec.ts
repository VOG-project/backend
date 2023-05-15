import { Test, TestingModule } from '@nestjs/testing';
import { ChatsGateway } from '../chats.gateway';
import { createServer } from 'http';
import { Server, Socket as SocketForServer } from 'socket.io';
import { Socket as SocketForClient, connect } from 'socket.io-client';

describe('ChatsGateway', () => {
  let gateway: ChatsGateway;
  let io: Server;
  let serverSocket: SocketForServer;
  let clientSocket: SocketForClient;

  beforeAll(async (done) => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatsGateway],
    }).compile();

    gateway = module.get<ChatsGateway>(ChatsGateway);

    const httpServer = createServer().listen();
    io = new Server(httpServer);

    httpServer.listen(() => {
      clientSocket = connect(`http://localhost:3000`);
      io.on('connection', (socket) => {
        serverSocket = socket;
      });
      clientSocket.on('connect', done);
    });
  });

  afterAll(() => {
    io.close();
    clientSocket.close();
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
