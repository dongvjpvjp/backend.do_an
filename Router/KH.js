const express = require('express');
const router = express.Router();
const Query = require("../Query");


router.get("/GetInfo/:makh",Query.GetInfo);
router.get("/GetAllInfo",Query.GetAllInfo);
router.put("/UpdateInfo",Query.UpdateInfo);
router.delete("/DeleteInfo/:makh",Query.DeleteInfo);
// CAP NHAT THONG TIN KHACH HANG
router.post("/InsertCTGioHang",Query.InsertCTGioHang);
router.delete("/DeleteCTGioHang/:magiohang/:machitietgiohang",Query.DeleteCTGioHang);
router.put("/UpdateCTGioHang",Query.UpdateCTGioHang);
router.get("/GetAllCTGioHang/:magiohang",Query.GetAllCTGioHang);
router.get("/GetCTGioHang/:machitietgiohang",Query.GetCTGioHang);
// CAP NHAT THONG TIN GIO HANG
module.exports = router
