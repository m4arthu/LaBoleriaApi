import { db } from "../databaseConnection/database.connection.js"

export const postCakesQuery = async (data) => {
    return await db.query(`insert into cakes(name,price,image,description) values($1,$2,$3,$4)`, data)
}

export const postClientsQuery = async (data) => {
    return await db.query(`insert into clients(name,address,phone) values($1,$2,$3)`, data)
}

export const postOrderQuery = async (data) => {
    return await db.query(`insert into orders("cakeId", "clientId",quantity,"totalPrice" ) values($1,$2,$3,$4)`, data)
}

export const getOrderByDate = async (data) => {
    return await db.query(`SELECT json_agg(cakes.*) AS cake, 
    json_agg(clients.*) AS client,
    orders.id AS "orderId",
    orders."createdAt",
    orders.quantity,
    CAST(orders.quantity * cakes.price AS NUMERIC) AS "totalPrice"
    FROM orders
    JOIN cakes ON cakes.id = orders."cakeId"
    JOIN clients ON clients.id = orders."clientId"
    WHERE date("createdAt") = $1
    GROUP BY orders.id,cakes.price;
    `, data)
}

export const getOrderQuery = async () => {
    return await db.query(`SELECT json_agg(cakes.*) AS cake, 
    json_agg(clients.*) AS client,
    orders.id AS "orderId",
    orders."createdAt",
    orders.quantity,
    CAST(orders.quantity * cakes.price AS NUMERIC) AS "totalPrice"
    FROM orders
    JOIN cakes ON cakes.id = orders."cakeId"
    JOIN clients ON clients.id = orders."clientId"
    GROUP BY orders.id,cakes.price;
    `)
}

export const getOrderByIdQuery = async (data) => {
    return await db.query(`SELECT json_agg(clients.*) AS client,
    json_agg(cakes.*) AS cake, 
    orders.id AS "orderId",
    orders."createdAt",
    orders.quantity,
    CAST(orders.quantity * cakes.price AS NUMERIC) AS "totalPrice"
    FROM orders
    JOIN cakes ON cakes.id = orders."cakeId"
    JOIN clients ON clients.id = orders."clientId"
    WHERE orders.id = $1
    GROUP BY orders.id, orders."createdAt", orders.quantity, orders."totalPrice,cakes.price";
    `,data)

}

export const getClientOrderQuery = async (data) => {
    return await db.query(`SELECT orders.id as "orderId",
     orders.quantity,
     orders."createdAt",
     CAST(orders.quantity * cakes.price AS NUMERIC) AS "totalPrice",
     cakes.name as "cakeName"
     FROM orders
     JOIN cakes on cakes.id = orders."cakeId"
     WHERE orders."clientId" = $1;`,data)
}