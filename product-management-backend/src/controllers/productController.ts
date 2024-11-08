import { Request, Response } from 'express';
import { pool } from '../config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

export const getProducts = async (req: Request, res: Response) => {
  try {
    const [rows] = await pool.execute<RowDataPacket[]>('SELECT * FROM products ORDER BY created_at DESC');
    console.log(rows);
    res.json(rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, brand, type, warranty_period, start_date, price } = req.body;
    
    console.log('Data for insertion:', { name, brand, type, warranty_period, start_date, price });
    const [result] = await pool.execute<ResultSetHeader>(
      `INSERT INTO products (name, brand, type, warranty_period, start_date, price)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, brand, type, warranty_period, start_date, price]
    );

    const [newProduct] = await pool.execute<RowDataPacket[]>(
      'SELECT * FROM products WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json(newProduct[0]);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ error: 'Internal server error' });
    console.error('Error creating product:', error);

  }
};