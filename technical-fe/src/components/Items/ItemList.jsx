import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const ItemList = () => {
    const [items, setItems] = useState([]);

    // Fungsi untuk mengambil data item dari backend
    const fetchItems = async () => {
        try {
            const response = await axios.get('http://localhost:5149/api/Items'); // URL API dari backend ASP.NET Core
            setItems(response.data);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    // Fungsi untuk menghapus item berdasarkan ID
    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://localhost:5149/api/Items/${id}`);
            fetchItems(); // Reload data setelah menghapus item
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    useEffect(() => {
        fetchItems();
    }, []);

    return (
        <div>
            <h2>Daftar Item</h2>
            <ul>
                {items.map((item) => (
                    <li key={item.id}>
                        {item.nama} - {item.harga} - {item.stok} - {item.kategori}
                        <button onClick={() => deleteItem(item.id)}>Hapus</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ItemList;
