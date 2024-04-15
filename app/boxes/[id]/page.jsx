import BoxForm from '../BoxForm';

export default async function EditBox({ params }) {
  const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `boxes/${params.id}`;
  const response = await fetch(url, { cache: 'no-store' });
  const box = await response.json();

  return <BoxForm box={box} />;
}
