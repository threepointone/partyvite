import { Connection, Server, routePartykitRequest } from "partyserver";

type Env = {
  MyServer: DurableObjectNamespace<MyServer>;
};

export class MyServer extends Server<Env> {
  onMessage(connection: Connection<unknown>, message: string) {
    console.log("message from client:", message);
  }
}

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext) {
    return (
      (await routePartykitRequest(request, env)) ||
      new Response("Not found", {
        status: 404,
      })
    );
  },
} satisfies ExportedHandler<Env>;
