'use client';

import { useRouter } from 'next/navigation'
import { useState } from 'react';

export default function BoxForm({ box = { name: '', ip: '', active: true } }) {
  const router = useRouter();

  const [changes, setChanges] = useState({ ...box });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const normalizedValue = name === 'active' ? value === 'true' : value;
    setChanges({ ...changes, [name]: normalizedValue });
  }

  const handleDelete = async (event) => {
    event.stopPropagation();

    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `boxes/${box.id}`;
    const response = await fetch(url, { method: 'DELETE' });

    if (response.ok) {
      router.push('/boxes');
    } else {
      alert('Error deleting box');
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { id, ...boxData } = changes;

    const url = process.env.NEXT_PUBLIC_API_ENDPOINT + `boxes${id ? `/${id}` : ''}`;
    const response = await fetch(url, {
      body: JSON.stringify(boxData),
      method: id ? 'PUT' : 'POST',
    });

    if (response.ok) {
      router.push('/boxes');
    } else {
      alert('Error saving box');
    }
  }

  return (
    <main>
      <div className="flex justify-between mb-5">
        <h1>Add a Box</h1>
        <a href="/boxes">Return to List</a>
      </div>

      <div className="w-64 mx-auto">
        <div className="grid grid-cols-4 items-center">
          <label htmlFor="name" className="text-right">Name: </label>
          <input type="text" id="name" name="name" value={changes.name} onChange={handleChange} required className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center">
          <label htmlFor="ip" className="text-right">IP: </label>
          <input type="text" id="ip" name="ip" value={changes.ip} onChange={handleChange} required className="col-span-3" />
        </div>

        <div className="grid grid-cols-4 items-center">
          <label htmlFor="active" className="text-right">Active: </label>
          <select type="text" id="active" name="active" value={changes.active?.toString()} onChange={handleChange} className="col-span-3">
            <option value="true">Yes</option>
            <option value="false">No</option>
          </select>
        </div>

        <div className="my-5 grid grid-cols-4 items-center">
          <div />

          <div className="col-span-3 flex gap-3">
            {!!box.id && <button onClick={handleDelete}>Delete</button>}
            <button onClick={handleSubmit}>{box.id ? 'Update' : 'Add'}</button>
          </div>
        </div>
      </div>
    </main>
  );
}