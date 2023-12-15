const Phone = require('../models/phoneModel');
const User = require('../models/userModel');
const { Op } = require('sequelize');
const HTTP_STATUS_OK = 200;
const HTTP_STATUS_CREATED = 201;
const HTTP_STATUS_BADREQ = 400;
const HTTP_STATUS_NOT_EXIST = 404;
const INTERNAL_SERVER_ERROR = 500;



async function getAllPhones(req, res) {
    try {
        const phones = await Phone.findAll();
        if (!phones) {
            return res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Not found' });
        }
        res.status(HTTP_STATUS_OK).json(phones);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function findPhones(req, res) {
    const { op, include, ...conditions } = req.query;
    try {
        let whereConditions;
        if (op === 'and') {
            whereConditions = { [Op.and]: conditions };

        } else if (op === 'or') {
            whereConditions = { [Op.or]: conditions };

        } else if (op === 'gt') {
            const isValid = Object.keys(conditions).every(key => !isNaN(parseFloat(conditions[key])));
            if (!isValid) {
                return res.status(HTTP_STATUS_BADREQ).json({ error: 'Cannot compare values of String data type' });
            }
            whereConditions = Object.keys(conditions).map(key => ({ [key]: { [Op.gt]: parseFloat(conditions[key]) } }));

        } else if (op === 'lt') {
            const isValid = Object.keys(conditions).every(key => !isNaN(parseFloat(conditions[key])));
            if (!isValid) {
                return res.status(HTTP_STATUS_BADREQ).json({ error: 'Cannot compare values of String data type' });
            }
            whereConditions = Object.keys(conditions).map(key => ({ [key]: { [Op.lt]: parseFloat(conditions[key]) } }));

        } else if (op === 'gte') {
            const isValid = Object.keys(conditions).every(key => !isNaN(parseFloat(conditions[key])));
            if (!isValid) {
                return res.status(HTTP_STATUS_BADREQ).json({ error: 'Cannot compare values of String data type' });
            }
            whereConditions = Object.keys(conditions).map(key => ({ [key]: { [Op.gte]: parseFloat(conditions[key]) } }));

        } else if (op === 'lte') {
            const isValid = Object.keys(conditions).every(key => !isNaN(parseFloat(conditions[key])));
            if (!isValid) {
                return res.status(HTTP_STATUS_BADREQ).json({ error: 'Cannot compare values of String data type' });
            }
            whereConditions = Object.keys(conditions).map(key => ({ [key]: { [Op.lte]: parseFloat(conditions[key]) } }));

        } else {
            whereConditions = conditions;
        }

        let includeModel = undefined;
        if (include === 'User') {
            try {
                includeModel = User;
            }
            catch {
                return res.status(HTTP_STATUS_BADREQ).json({ error: 'No Model with such name' });
            }
        }
        const phones = await Phone.findAll({
            where: whereConditions,
            include: includeModel
        });
        if (!phones) {
            return res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Not found' });
        }
        res.status(HTTP_STATUS_OK).json(phones);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function getPhoneById(req, res) {
    try {
        const phone = await Phone.findByPk(req.params.id);
        if (!phone) {
            return res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Not found' });
        }
        res.status(HTTP_STATUS_OK).json(phone);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function createPhone(req, res) {
    try {
        const newPhone = await Phone.create(req.body);
        res.status(HTTP_STATUS_CREATED).json(newPhone);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function patchPhone(req, res) {
    try {
        const updatedData = req.body;
        const phone = await Phone.findByPk(req.params.id);
        if (!phone) {
            return res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Phone not found' });
        }
        await phone.update(updatedData);
        res.status(HTTP_STATUS_OK).json(phone);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function putPhone(req, res) {
    try {
        const updatedData = req.body;
        const phone = await Phone.findByPk(req.params.id);
        if (!phone) {
            return res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Phone not found' });
        }
        phone.set(updatedData);
        await phone.save();
        res.status(HTTP_STATUS_OK).json(phone);
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
}


async function deletePhone(req, res) {
    try {
        const deletedPhone = await Phone.destroy({
            where: {
                id: req.params.id
            }
        });
        if (deletedPhone === 0) {
            res.status(HTTP_STATUS_NOT_EXIST).json({ error: 'Phone with this id does not exist' });
        } else {
            res.status(HTTP_STATUS_OK).json({ message: `Phone with id: ${req.params.id} deleted successfully` });
        }
    } catch (error) {
        console.error(error);
        res.status(INTERNAL_SERVER_ERROR).json({ error: 'Something went wrong' });
    }
}



module.exports = {
    getAllPhones,
    findPhones,
    getPhoneById,
    createPhone,
    patchPhone,
    putPhone,
    deletePhone
};
