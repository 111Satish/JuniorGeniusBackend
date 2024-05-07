const express = require('express');
const mongoose = require('mongoose');
//const uri = `mongodb+srv://Satishjnvr1:JuniorGenius@cluster0.plcwh0h.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://Satishjnvr1:JuniorGenius@cluster0.71sgbxb.mongodb.net/JuniorGenius`
//const uri = `mongodb://127.0.0.1:27017/JuniorGenius`; 

const MdbConnect = async () => {
    try {
        await mongoose.connect(uri);

        console.log('Mongo database Connected');
    } catch (error) {
        console.error('Error Found: ' + error);
    }
};

module.exports = MdbConnect;