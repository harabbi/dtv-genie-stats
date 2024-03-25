import styles from "./boxes.module.css";

export default async function Boxes() {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'boxes', { next: { revalidate: 5 }});
  const boxes = await response.json();

  return (
    <main>
      <div className="flex justify-between">
        <h1 className="text-3xl">DTV Genie Boxes</h1>
        <a href="/">Home</a>
      </div>

      <div className="my-5 flex flex-wrap gap-4">
        {boxes.map((box) => (
          <div key={box.id} className="border p-4 w-64">
            <h2 className="text-2xl bold">{box.name}</h2>
            <p className="my-3">{box.ip}</p>

            <div className="flex justify-between">
              <p>{box.active ? 'Active' : 'Inactive'}</p>
              <a href={`/boxes/${box.id}`}>Edit</a>
            </div>
          </div>
        ))}
      </div>

      <a href="/boxes/new">Add Box</a>
    </main>
  );
}
