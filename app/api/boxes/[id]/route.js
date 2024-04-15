const { knex } = require('../../../../utils');

export async function GET(_request, { params }) {
  console.debug(new Date(), `GET /api/boxes/${params.id}`);

  try {
    if (!params.id) return Response.json({ message: 'Missing id!' }, { status: 400 });

    const data = await knex('boxes').where({ id: params.id }).first();
    if (!data) return Response.json({ message: 'Not found!' }, { status: 404 });

    return Response.json(data);
  } catch (error) {
    console.error(new Date(), error);
    return Response.json({ message: error.message || 'Error!' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  console.debug(new Date(), `PUT /api/boxes/${params.id}`);

  try {
    const payload = await request.json();
    const data = await knex('boxes').update(payload).where({ id: params.id }).returning('*').then((rows) => rows[0]);

    return Response.json(data);
  } catch (error) {
    console.error(new Date(), error);
    return Response.json({ message: error.message || 'Error!' }, { status: 500 });
  }
}

export async function DELETE(_request, { params }) {
  console.debug(new Date(), `DELETE /api/boxes/${params.id}`);

  try {
    if (!params.id) return Response.json({ message: 'Missing id!' }, { status: 400 });

    await knex('boxes').del().where({ id: params.id });

    return Response.json({ message: 'Deleted!' });
  } catch (error) {
    console.error(new Date(), error);
    return Response.json({ message: error.message || 'Error!' }, { status: 500 });
  }
}