const express = require('express');
const router = express.Router();
const Query = require("../Query");

// router.use((req,res,next)=>{
//     if(req.session.data !== req.session.id){
//         let str = "Co truy cap trai phep khi chua dang nhap"
//         console.log(str);
//         res.status(204).json({ auth: 0,err:str });
//     }
//     else next();
// })

router.get("/GetInfo/:makh",Query.GetInfo);
router.get("/SearchInfo/:makh",Query.SearchInfo);
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
