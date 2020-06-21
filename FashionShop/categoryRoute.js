var express = require("express");
var router = express.Router();
var controller = require("./categoryController");

router.post("/", (req, res) => {
    controller
        .add(req.body)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.get("/", (req, res) => {
    controller
        .getAll()
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.get("/:id", (req, res) => {
    controller
        .getSingle(req.params.id)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.put("/:id", (req, res) => {
    controller
        .update(req.params.id, req.body)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.delete("/status/:id", (req, res) => {
    controller
        .deleteSet(req.params.id)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.delete("/:id", (req, res) => {
    controller
        .delete(req.params.id)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

router.put("/", (req, res) => {
    controller
        .updateSet(req.body)
        .then(response => {
            res.status(response.status).send(response);
        })
        .catch(err => {
            res.status(err.status).send(err.message);
        });
});

module.exports = router;
