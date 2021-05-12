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

router.get("/SP/SearchMaSP/:masp",Query.SearchMasp);
router.get("/SP/SearchTenSP/:tensp",Query.SearchTensp);
router.get("/SP/SearchMaLoaiSP/:maloaisp",Query.SearchMaLoaiSp);

router.get("/SP/GetAllSanPham",Query.GetAllSanPham);
router.get("/SP/GetSanPham/:masp",Query.GetSanPham);
router.get("/SP/SearchSanPham/:masp",Query.SearchSanPham);
router.post("/SP/InsertSanPham",Query.InsertSanPham);
router.post("/SP/InsertSanPhamAuto",Query.InsertSanPhamAuto);
router.put("/SP/UpdateSanPham",Query.UpdateSanPham);
router.delete("/SP/DeleteSanPham/:masp",Query.DeleteSanPham);

router.get("/SP/GetAllCTSanPham/:masp",Query.GetAllCTSanPham);
router.get("/SP/GetCTSanPham/:machitietsp",Query.GetCTSanPham);
router.get("/SP/SearchCTSanPham/:machitietsp",Query.SearchCTSanPham);
router.post("/SP/InsertCTSanPham",Query.InsertCTSanPham);
router.put("/SP/UpdateCTSanPham",Query.UpdateCTSanPham);
router.delete("/SP/DeleteCTSanPham/:machitietsp",Query.DeleteCTSanPham);
// SEARCH SAN PHAM
router.get("/HH/GetHH/:mahh",Query.GetHH);
router.get("/HH/SearchHH/:mahh",Query.SearchHH);
router.get("/HH/GetAllHH",Query.GetAllHH);
router.put("/HH/UpdateHH",Query.UpdateHH);
router.post("/HH/InsertHH",Query.InsertHH);
router.delete("/HH/DeleteHH/:mahh",Query.DeleteHH);

//Hang Hoa
module.exports = router
