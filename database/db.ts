import * as SQLite from 'expo-sqlite';

// open or create db file
const db = SQLite.openDatabaseSync('jhs-pos.db');

export const initDatabase = async () => {
    try {
        // create products table if it doesn't exist
        await db.execAsync(`
            PRAGMA journal_mode = WAL;
            CREATE TABLE IF NOT EXISTS products (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                price REAL NOT NULL,
                stock INTEGER NOT NULL,
                weightValue TEXT,
                weightUnit TEXT,
                imageUri TEXT
                );
            `);
            console.log("Database initialized successfully.");
    } catch (error) {
        console.error("Error initializing database:", error);
    }
};

// function to add a product
export const addProduct = async (name: string, price: number, stock: number, weightValue: string, weightUnit: string) => {
    try {
        const result = await db.runAsync(
            'INSERT INTO products (name, price, stock, weightValue, weightUnit) VALUES (?, ?, ?, ?, ?)',
            [name, price, stock, weightValue, weightUnit]
        );
        return result.lastInsertRowId;
    } catch (error) {
        console.error("Error adding product:", error);
    }
};

// function to get all products
export const getProducts = async () => {
    try {
        const allRows = await db.getAllAsync('SELECT * FROM products ORDER BY id DESC');
        return allRows;
    } catch (error) {
        console.error("Error fetching products:", error);
        return [];
    }
};

// delete a product by id
export const deleteProduct = async (id: number) => {
    try {
        await db.runAsync('DELETE FROM products WHERE id = ?', [id]);
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

// update an existing product
export const updateProduct = async (id: number, name: string, price: number, stock: number, weightValue: string, weightUnit: string) => {
    try {
        await db.runAsync(
            'UPDATE products SET name = ?, price = ?, stock = ?, weightValue = ?, weightUnit = ? WHERE id = ?',
            [name, price, stock, weightValue, weightUnit, id]
        )
    } catch (error) {
        console.error("Error updating product:", error);
    }
};

export default db;