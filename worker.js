export default {
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/' || url.pathname === '/health') {
      return new Response(JSON.stringify({ ok: true, service: 'eBliss-Theme' }), {
        headers: { 'content-type': 'application/json; charset=utf-8' }
      });
    }
    return new Response(JSON.stringify({ error: 'Not found', service: 'eBliss-Theme' }), {
      status: 404,
      headers: { 'content-type': 'application/json; charset=utf-8' }
    });
  }
};
