import bodyParser from 'body-parser';
import { Express } from 'express';
import { ProductHandler } from './Handlers/ProductHandler';
import express from 'express';
export class ServerHelper {

    constructor() {
    }

    static SetUpServer(app: Express) {
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(bodyParser.json());
        app.use('/images',express.static(__dirname+'/Data/images'));
        app.use(function (req, res, next) {
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.setHeader('Access-Control-Allow-Methods', '*');
            res.setHeader('Access-Control-Allow-Headers', '*');
            next();
        });
        app.get('/GetProducts', (req, res) => {
            res.send(JSON.stringify(ProductHandler.GetProducts()));
        })
        app.post('/AddProduct', (req, res) => {
            ProductHandler.AddProduct(JSON.parse(req.body.product));
            res.status(200).send();
        })
        app.get('/GetProductById/:id', (req, res) => {
            res.send(JSON.stringify(ProductHandler.GetProductById(Number.parseInt(req.params.id))));
        })
        app.get('/DeleteProductById/:id', (req, res) => {
            ProductHandler.DeleteProductById(Number.parseInt(req.params.id));
            res.status(200).send();
        })
        app.post('/EditProduct', (req, res) => {
            ProductHandler.EditProductById(JSON.parse(req.body.product));
            res.status(200).send();
        })
        app.get('/GetProductWorks', (req, res) => {
            res.send(JSON.stringify(ProductHandler.GetProductWorks()));
        })
        app.post('/AddProductWork', (req, res) => {
            ProductHandler.AddProduct(JSON.parse(req.body.productWork));
            res.status(200).send();
        })
        app.get('/GetProductWorkById/:id', (req, res) => {
            res.send(JSON.stringify(ProductHandler.GetProductWorkById(Number.parseInt(req.params.id))));
        })
        app.get('/DeleteProductWorkById/:id', (req, res) => {
            ProductHandler.DeleteProductWorkById(Number.parseInt(req.params.id));
            res.status(200).send();
        })
        app.post('/EditProductWork', (req, res) => {
            ProductHandler.EditProductWorkById(JSON.parse(req.body.productWork));
            res.status(200).send();
        })

    }
}