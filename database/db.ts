import * as SQLite from 'expo-sqlite';

// open or create db file
const db = SQLite.openDatabaseSync('jhs-pos.db');

export const initDatabase = async () => {
    try {
        // force delete the old tables
        // await db.execAsync(`DROP TABLE IF EXISTS sale_items;`);
        // await db.execAsync(`DROP TABLE IF EXISTS sales;`);
        // console.log("Database reset successfully.");

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

            CREATE TABLE IF NOT EXISTS sales (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                total_amount REAL NOT NULL,
                discount REAL NOT NULL,
                date TEXT NOT NULL
            );

            CREATE TABLE IF NOT EXISTS sale_items (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                sale_id INTEGER NOT NULL,
                product_id INTEGER NOT NULL,
                product_name TEXT NOT NULL,
                quantity INTEGER NOT NULL,
                price_at_sale REAL NOT NULL,
                FOREIGN KEY (sale_id) REFERENCES sales (id)
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

// save sale and update stock quantity
export const updateStockwithTransaction = async (cartItems: any[], total: number, discount: number) => {
    try {
        await db.withTransactionAsync(async () => {
            // record main sale
            const saleResult = await db.runAsync(
                'INSERT INTO sales (total_amount, discount, date) VALUES (?, ?, ?)',
                [total, discount, new Date().toISOString()]
            );
            const saleId = saleResult.lastInsertRowId;

            for (const item of cartItems) {
                // record each item in that sale
                await db.runAsync(
                    'INSERT INTO sale_items (sale_id, product_id, product_name, quantity, price_at_sale) VALUES (?, ?, ?, ?, ?)',
                    [saleId, item.id, item.name, item.quantity, item.price]
                );

                // deduct stock quantity
                await db.runAsync(
                    'UPDATE products SET stock = stock - ? WHERE id = ?',
                    [item.quantity, item.id]
                );
            }
        });
        return true;
    } catch (error) {
        console.error("Failed to save sale:", error);
        throw error;
    }
};

export default db;