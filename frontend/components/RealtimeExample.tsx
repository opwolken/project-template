'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';

interface Item {
  id: string;
  name: string;
  created_at: unknown;
}

export default function RealtimeExample() {
  const [items, setItems] = useState<Item[]>([]);
  const [newItemName, setNewItemName] = useState('');
  const [loading, setLoading] = useState(true);

  // Real-time listener voor Firestore
  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, 'items'),
      (snapshot) => {
        const itemsData = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Item[];
        setItems(itemsData);
        setLoading(false);
      },
      (error) => {
        console.error('Firestore error:', error);
        setLoading(false);
      }
    );

    // Cleanup on unmount
    return () => unsubscribe();
  }, []);

  const addItem = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;

    try {
      await addDoc(collection(db, 'items'), {
        name: newItemName,
        created_at: serverTimestamp(),
      });
      setNewItemName('');
    } catch (error) {
      console.error('Error adding item:', error);
    }
  };

  if (loading) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Real-time Items (Firestore)</h2>
      
      <form onSubmit={addItem} className="mb-6 flex gap-2">
        <input
          type="text"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          placeholder="Add new item..."
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          type="submit"
          className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      <div className="space-y-2">
        {items.length === 0 ? (
          <p className="text-gray-500">No items yet. Add one above!</p>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="p-4 border rounded hover:bg-gray-50"
            >
              {item.name}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
