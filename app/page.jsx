export default async function Home() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'beats', { next: { revalidate: 5 }});
  const { beats, channels } = await response.json();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl">DTV Genie Channel Stats</h1>
        <a href="/boxes">Boxes</a>
      </div>

      <div className="my-5">
        {channels.map((stat) => (
          <div key={stat.channel} className="flex">
            <div className="w-16">{stat.channel || 'Off'}</div>
            <div>{stat.minutes}</div>
          </div>

        ))}
      </div>

      {beats.map((beat) => (
        <div key={beat.id} className="flex">
          <div className="w-10">{beat.box_id}</div>
          <div className="w-64">{new Date(beat.datetime).toLocaleString()}</div>
          <div className="w-16">{beat.recorded ? 'Recorded' : beat.channel ? 'Live' : ''}</div>
          <div className="w-16">{beat.channel}</div>
          <div>{beat.title}</div>
        </div>
      ))}
    </main>
  );
}
