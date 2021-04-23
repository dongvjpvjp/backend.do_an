const express = require('express');
const router = express.Router();
const Query = require("../Query");

router.use((req,res,next)=>{
    if(req.session.loggedin !== true){
        let str = "Co truy cap trai phep khi chua dang nhap"
        console.log(str);
        res.status(404).json({ access: 0,err:str });
    }
    else next();
})

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
