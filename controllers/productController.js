const { db } = require("../database");

module.exports = {
  getProductData: (req, res) => {
    // if(req.query.idproduct)
    let scriptQuery =
      "Select idproduct, category, product_name, description, unit, price_unit, price_stock, image from product;";

    //http://localhost:2200/product/get?idproduct=2
    if(req.query.idproduct){
      scriptQuery =
      `Select idproduct, category, product_name, description, unit, price_unit, price_stock, image from product where idproduct = ${db.escape(req.query.idproduct)};`;
    }
    db.query(scriptQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  addProductData: (req, res) => {
    console.log(req.body);
    let {
      category,
      product_name,
      description,
      unit,
      price_unit,
      price_stock,
      image
    } = req.body;

    let insertQuery = `Insert into product (category, product_name, description, unit, price_unit, price_stock, image ) values (${db.escape(
      category
    )}, ${db.escape(product_name)}, ${db.escape(description)}, ${db.escape(
      unit
    )}, ${db.escape(price_unit)}, ${db.escape(price_stock)}, ${db.escape(
      image
    )});`;



    console.log(insertQuery);

    db.query(insertQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  editProductData: (req, res) => {
    let productUpdate = [];
    for (let prop in req.body) {
      // looping data nama kolom dan data yang akan disimpan
      productUpdate.push(`${prop} = ${db.escape(req.body[prop])}`);
    }

    let updateQuery = `Update product set ${productUpdate} where idproduct = ${req.params.id}`;
    console.log(updateQuery);

    db.query(updateQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },

  deleteProductData: (req, res) => {
    let deleteQuery = `Delete from product where idproduct = ${db.escape(
      req.params.idproduct
    )}`;

    db.query(deleteQuery, (err, results) => {
      if (err) res.status(500).send(err);
      res.status(200).send(results);
    });
  },
};