const { knex } = require('../../../utils');

export async function GET() {
  console.debug(new Date(), 'GET /api/boxes');

  const data = await knex('boxes');

  return Response.json(data);
}

export async function POST(request) {
  console.debug(new Date(), 'POST /api/boxes');

  try {
    const payload = await request.json();
    const data = await knex('boxes').insert(payload).returning('*').then((rows) => rows[0]);

    return Response.json(data);
  } catch (error) {
    console.error(new Date(), error);
    return Response.json({ message: error.message || 'Error!' }, { status: 500 });
  }
}