const db = require("../database/db");

const getSupplies = (req, res) => {
  db.query("SELECT * FROM supplies", (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const getSupply = (req, res) => {
  const {id} = req.params;
  db.query("SELECT * FROM supplies WHERE id = ?", id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json(data);
  });
};

const addSuplies = (req, res) => {
  const {name, quantity} = req.body;
  if (!name || !quantity) {
    return res.status(401).json({message: "Please fill all the fields"});
  }
  db.query(
    "INSERT INTO supplies(`name`, `quantity`) VALUES(?, ?)",
    [name, quantity],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({message: "Supply added successfully"});
    }
  );
};

const editSupply = (req, res) => {
  const {id} = req.params;
  const {name, quantity} = req.body;
  db.query(
    "UPDATE supplies SET `name` = ?, `quantity` = ? WHERE id = ?",
    [name, quantity, id],
    (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json({message: "Editing successful"});
    }
  );
};

const deleteSupply = (req, res) => {
  const {id} = req.params;
  db.query("DELETE FROM supplies WHERE id = ?", id, (err, data) => {
    if (err) return res.status(500).json(err);
    return res.json({message: "Deleted successfully"});
  });
};

module.exports = {getSupplies, getSupply, addSuplies, editSupply, deleteSupply};
