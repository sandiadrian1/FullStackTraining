import { useState } from 'react';
import ItemList from './components/Items/ItemList';
import ItemForm from './components/Items/ItemForm';
import './Index.css'
function App() {
    const [isEditing, setIsEditing] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const handleAddItem = () => {
        setIsEditing(false);
        setCurrentItem(null);
    };

    const handleEditItem = (item) => {
        setIsEditing(true);
        setCurrentItem(item);
    };

    const handleSaveItem = () => {
        setIsEditing(false);
        setCurrentItem(null);
    };

    return (
        <div>
            <h1>Manajemen Item POS</h1>
            <button onClick={handleAddItem}>Tambah Item Baru</button>
            {isEditing ? (
                <ItemForm
                    currentItem={currentItem}
                    isEdit={isEditing}
                    onSave={handleSaveItem}
                />
            ) : (
                <ItemList onEditItem={handleEditItem} />
            )}
        </div>
    );
}

export default App;
