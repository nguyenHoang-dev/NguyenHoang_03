from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import mysql.connector
from typing import List
import logging

app = FastAPI()

# Cấu hình logging
logging.basicConfig(level=logging.ERROR)
logger = logging.getLogger(__name__)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

try:
    db = mysql.connector.connect(
        host="localhost",
        user="Igata_Kuraitoku",
        password="Học thuộc công dụng từng dòng code đi các ông",
        database="supermarket"
    )
    cursor = db.cursor(dictionary=True)
except mysql.connector.Error as err:
    logger.error(f"Error connecting to MySQL: {err}")
    raise

@app.get("/")
async def root():
    return {"message": "Chào mừng đến với Quản Lý Siêu Thị! Sử dụng /products, /bills, v.v. để xem dữ liệu."}

@app.get("/products")
async def get_products():
    try:
        cursor.execute("SELECT p.product_id, p.product_name, p.price, w.quantity, s.sup_id, s.sup_name FROM supplier s LEFT JOIN distribute d ON s.sup_id = d.sup_id LEFT JOIN warehouse w ON d.wh_id = w.wh_id LEFT JOIN provide pr ON w.wh_id = pr.wh_id LEFT JOIN products p ON pr.product_id = p.product_id")
        results = cursor.fetchall()
        for r in results:
            r['originalQty'] = r['quantity']
        return results
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/bills")
async def get_bills():
    try:
        cursor.execute("SELECT b.bill_id, b.bill_date, b.total_amount, c.full_name, s.full_name as staff_name FROM bill b LEFT JOIN customers c ON b.customer_id = c.customer_id LEFT JOIN staff s ON b.staff_id = s.staff_id")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/bill_details")
async def get_bill_details():
    try:
        cursor.execute("SELECT bd.detail_id, bd.bill_id, bd.product_id, bd.quantity, bd.unit_price, bd.subtotal, p.product_name FROM bill_details bd LEFT JOIN products p ON bd.product_id = p.product_id")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/customers")
async def get_customers():
    try:
        cursor.execute("SELECT customer_id, full_name, phone, created_date, loyalty_points FROM customers")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/discounts")
async def get_discounts():
    try:
        cursor.execute("SELECT discount_id, discount_name, discount_type, discount_value, start_date, end_date, discount_status FROM discount")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/staff")
async def get_staff():
    try:
        cursor.execute("SELECT staff_id, full_name, phone, email, position, hire_date FROM staff")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/suppliers")
async def get_suppliers():
    try:
        cursor.execute("SELECT sup_id, sup_name, sup_address, quantity, manager_id, manager_name, delivery_date FROM supplier")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

@app.get("/warehouses")
async def get_warehouses():
    try:
        cursor.execute("SELECT wh_id, wh_name, address, status, updated_time, inventory_goods, quantity, manager_id, manager_name FROM warehouse")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise
@app.get("/use")
async def get_use():
    try:
        cursor.execute("SELECT u.customer_id, c.full_name, u.discount_id, d.discount_name FROM use u LEFT JOIN customers c ON u.customer_id = c.customer_id LEFT JOIN discount d ON u.discount_id = d.discount_id")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise
    
@app.get("/apply")
async def get_apply():
    try:
        cursor.execute("SELECT a.product_id, p.product_name, a.discount_id, d.discount_name FROM apply a LEFT JOIN products p ON a.product_id = p.product_id LEFT JOIN discount d ON a.discount_id = d.discount_id")
        return cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error executing query: {err}")
        raise

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)