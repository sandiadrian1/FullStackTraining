/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';

const ItemForm = ({ currentItem, isEdit, onSave }) => {
  const [itemData, setItemData] = useState({
    nama: '',
    harga: '',
    stok: '',
    kategori: '',
    urlGambar: null,
  });

  useEffect(() => {
    if (isEdit && currentItem) {
      setItemData({
        nama: currentItem.nama,
        harga: currentItem.harga,
        stok: currentItem.stok,
        kategori: currentItem.kategori,
        urlGambar: currentItem.urlGambar,
      });
    }
  }, [isEdit, currentItem]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setItemData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setItemData((prevData) => ({
      ...prevData,
      urlGambar: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('Nama', itemData.nama);
    formData.append('Harga', itemData.harga);
    formData.append('Stok', itemData.stok);
    formData.append('Kategori', itemData.kategori);
    if (itemData.urlGambar) {
      formData.append('UrlGambar', itemData.urlGambar);
    }

    try {
      if (isEdit) {
        await axios.put(`http://localhost:5149/api/Items/${currentItem.id}`, formData);
      } else {
        await axios.post('http://localhost:5149/api/Items/items', formData);
      }
      onSave(); // Memanggil fungsi untuk memberitahukan bahwa item telah disimpan
    } catch (error) {
      console.error('Error saving item:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Item Name */}
      <div className="flex flex-col">
        <label htmlFor="nama" className="mb-2 text-sm font-medium">Nama:</label>
        <input
          type="text"
          id="nama"
          name="nama"
          value={itemData.nama}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Item Price */}
      <div className="flex flex-col">
        <label htmlFor="harga" className="mb-2 text-sm font-medium">Harga:</label>
        <input
          type="number"
          id="harga"
          name="harga"
          value={itemData.harga}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Item Stock */}
      <div className="flex flex-col">
        <label htmlFor="stok" className="mb-2 text-sm font-medium">Stok:</label>
        <input
          type="number"
          id="stok"
          name="stok"
          value={itemData.stok}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Item Category */}
      <div className="flex flex-col">
        <label htmlFor="kategori" className="mb-2 text-sm font-medium">Kategori:</label>
        <input
          type="text"
          id="kategori"
          name="kategori"
          value={itemData.kategori}
          onChange={handleInputChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Item Image Upload */}
      <div className="flex flex-col">
        <label htmlFor="urlGambar" className="mb-2 text-sm font-medium">Upload Gambar:</label>
        <input
          type="file"
          id="urlGambar"
          name="urlGambar"
          onChange={handleFileChange}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-center mt-4">
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          {isEdit ? 'Update Item' : 'Tambah Item'}
        </button>
      </div>
    </form>
  );
};

export default ItemForm;