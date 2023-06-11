const db = require('../database/db')

const getServices = (req, res) => {
    db.query("SELECT * FROM services", (err, resp) => {
        if(err) return res.status(500).json({message: "Error fetching services"})
        return res.json(resp)
    })
}

const getService = (req, res) => {
    const { id } = req.params
    db.query("SELECT * FROM services WHERE id = ?", id, (err, resp) => {
        if(err) return res.status(500).json({message: "Error fetching services"})
        return res.json(resp)
    })
}

const addService = (req, res) => {
    const { service } = req.body
    db.query("INSERT INTO services(`name`) VALUES (?)", service, (err, data) => {
        if(err) return res.status(500).json({message: "Error in adding service"})
        return res.json({message: "Service Added"})
    })
}

const editService = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    db.query("UPDATE services SET name = ? WHERE id = ?", [name, id], (err, data) => {
        if(err) return res.status(500).json({message: "Error in editing service"})
        return res.json({message: "Service successfully edited"})
    })
}

const deleteService = (req, res) => {
    const { id } = req.params
    db.query("DELETE FROM services WHERE id = ?", id, (err, data) => {
        if(err) return res.status(500).json({message: "Error in deleting service"})
        return res.json({message: "Service deleted successfully"})
    })
}



module.exports = { getServices, getService, addService, editService, deleteService }