const { knex } = require('../../../utils');

export async function GET() {
  console.debug('GET /api/beats');

  const [beats, channels] = await Promise.all([
    knex('beats'),
    knex('beats').groupBy('channel').select('channel', knex.raw('count(datetime) as minutes')).orderBy('channel'),
  ]);

  return Response.json({ beats, channels });
}

export async function POST(request) {
  console.debug('POST /api/beats');

  try {
    const boxes = await knex('boxes');

    const datetime = new Date();
    datetime.setSeconds(0);

    const data = await Promise.all(boxes.map(async (box) => {
      const controller = new AbortController();
      const id = setTimeout(() => controller.abort(), 500);

      try {
        const response = await fetch(`http://${box.ip}:8080/tv/getTuned`, { cache: 'no-cache', signal: controller.signal });
        clearTimeout(id);
        const { title, major, recType } = await response.json();
        return { box_id: box.id, datetime, title, channel: major, recorded: !!recType };
      } catch (error) {
        console.error(box.ip, error.code, error.message);
        return { box_id: box.id, datetime };
      };
    }));

    await knex('beats').insert(data).onConflict(['box_id', 'datetime']).merge();

    return Response.json(data);
  } catch (error) {
    console.error(error);
    return Response.json({ message: error.message || 'Error!' }, { status: 500 });
  }
}