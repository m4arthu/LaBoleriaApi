import {
getOrderByDate,
postCakesQuery,
postClientsQuery,
postOrderQuery,
getOrderQuery,
getOrderByIdQuery,
getClientOrderQuery
} from "../repositorys/repositorys.js"

import moment from "moment/moment.js"
export const postCakes = async (req, res) => {
    try {

        const { name, price, image, description } = req.body
        await postCakesQuery([name, price, image, description])
        res.sendStatus(201)
    } catch (e) {
        if (e.code === "23505") {
            res.sendStatus(409)
            return
        }
        console.log(e)
        res.sendStatus(500)
    }
}

export const postClients = async (req, res) => {
    try {
        const { name, address, phone } = req.body
        await postClientsQuery([name, address, phone])
        res.sendStatus(201)
    } catch (e) {
        console.log(e)
        if (e.code == "23514") {
            res.status(400).send("number must be  less or  equal than 11 and more than 10")
            return
        }
        res.sendStatus(500)
    }
}

export const postOrder = async (req, res) => {
    try {
        const { cakeId, clientId, quantity, totalPrice } = req.body
        await postOrderQuery([cakeId, clientId, quantity, totalPrice])
        res.sendStatus(201)
    } catch (e) {
        if (e.code === "23503") {
            res.sendStatus(404)
            return
        }
        res.sendStatus(500)
    }
}

export const getOrder = async (req, res) => {
    const { date } = req.query
    try {
        if (date) {
            let  formatedData  = moment(date,"DD MM YYYY").format("YYYY/MM/DD")
            console.log(formatedData)
            const orders = await getOrderByDate([formatedData])
            res.send(orders.rows)
        } else {
            const orders = await getOrderQuery()
            res.send(orders.rows)
        }
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export const getOrderById = async (req,res) => {
    const {id} = req.params
    try {
        const order = await getOrderByIdQuery([id])
        if(order.rowCount === 0 ){
            res.sendStatus(404)
            return
        }
        res.send(order.rows)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}

export  const  getOrderByClientId = async (req,res) => {
    const {id} = req.params
    try {
        const order = await getClientOrderQuery([id])
        if(order.rowCount === 0 ){
            res.sendStatus(404)
            return
        }
        res.send(order.rows)
    } catch (e) {
        console.log(e)
        res.sendStatus(500)
    }
}