import BoxForm from '../BoxForm';

export default async function EditBox({ params }) {
  const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT + 'boxes/' + params.id, { cache: 'no-store' });
  const box = await response.json();

  return <BoxForm box={box} />;
}
