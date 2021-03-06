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

router.get("/GetInfoNV/:manv",Query.GetInfoNV);
router.get("/SearchInfoNV/:manv",Query.SearchInfoNV);
router.get("/GetAllInfoNV",Query.GetAllInfoNV);
router.put("/UpdateInfoNV",Query.UpdateInfoNV);
router.post("/InsertNV",Query.InsertNV);
router.delete("/DeleteNV/:manv",Query.DeleteNV);
// NV
router.get("/NCC/GetNCC/:mancc",Query.GetNCC);
router.get("/NCC/SearchNCC/:mancc",Query.SearchNCC);
router.get("/NCC/GetAllNCC",Query.GetAllNCC);
router.put("/NCC/UpdateNCC",Query.UpdateNCC);
router.post("/NCC/InsertNCC",Query.InsertNCC);
router.delete("/NCC/DeleteNCC/:mancc",Query.DeleteNCC);
// NCC
router.get("/SK/GetSK/:masukien",Query.GetSK);
router.get("/SK/SearchSK/:masukien",Query.SearchSK);
router.get("/SK/GetAllSK",Query.GetAllSK);
router.put("/SK/UpdateSK",Query.UpdateSK);
router.post("/SK/InsertSK",Query.InsertSK);
router.delete("/SK/DeleteSK/:masukien",Query.DeleteSK);
// Su kien
router.get("/CA/GetChiNhanh/:machinhanh",Query.GetChinanh);
router.get("/CA/SearchChiNhanh/:machinhanh",Query.SearchChinanh);
router.get("/CA/GetAllChiNhanh",Query.GetAllChinhanh);
router.put("/CA/UpdateChiNhanh",Query.UpdateChinhanh);
router.post("/CA/InsertChiNhanh",Query.InsertChinhanh);
router.delete("/CA/DeleteChiNhanh/:machinhanh",Query.DeleteChinhanh);
// Chi nhanh
router.get("/KHO/GetKho/:makho",Query.GetKho);
router.get("/KHO/SearchKho/:makho",Query.SearchKho);
router.get("/KHO/GetAllKho",Query.GetAllKho);
router.put("/KHO/UpdateKho",Query.UpdateKho);
router.post("/KHO/InsertKho",Query.InsertKho);
router.delete("/KHO/DeleteKho/:makho",Query.DeleteKho);
//KHO
router.get("/DDNV/GetDDNV/:madiemdanhnv",Query.GetDDNV);
router.get("/DDNV/GetAllDDNV",Query.GetAllDDNV);
router.put("/DDNV/UpdateDDNV",Query.UpdateDDNV);
router.post("/DDNV/InsertDDNV",Query.InsertDDNV);
router.delete("/DDNV/DeleteDDNV/:madiemdanhnv",Query.DeleteDDNV);
// Diemdanhnv
router.get("/Luong/GetLuong/:maluong",Query.Getluong);
router.get("/Luong/GetAllLuong",Query.GetAllluong);
router.put("/Luong/UpdateLuong",Query.Updateluong);
//Luong (Insert - Delete da co khi tu dong them va xoa NV)

router.get("/GetDTDay/:machinhanh/:day/:month/:year",Query.GetDTDay);
router.get("/GetDTMonth/:machinhanh/:month/:year",Query.GetDTMonth);
router.get("/GetDTYear/:machinhanh/:year",Query.GetDTYear);
router.get("/GetAllDTDay/:day/:month/:year",Query.GetAllDTDay);
router.get("/GetAllDTMonth/:month/:year",Query.GetAllDTMonth);
router.get("/GetAllDTYear/:year",Query.GetAllDTYear);
//DOANH THU
module.exports = router
