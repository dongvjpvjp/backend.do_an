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

router.get("/GetAllHD",Query.GetAllHD);
router.get("/GetHD/:mahoadon",Query.GetHD);
router.get("/GetHDKH/:makh",Query.GetHDKH);
router.get("/GetCTHD/:machitiethoadon",Query.GetCTHD);
router.get("/GetAllCTHD/:mahoadon",Query.GetAllCTHD);

router.post("/InsertHoaDonAuto",Query.InsertHoaDonAuto);
router.post("/InsertHoaDon",Query.InsertHoaDon);
router.put("/UpdateHoaDon",Query.UpdateHoaDon);
router.delete("/DeleteHoaDon/:mahoadon",Query.DeleteHoaDon);
router.post("/InsertCTHD",Query.InsertCTHD);
router.put("/UpdateCTHD",Query.UpdateCTHD);
router.delete("/DeleteCTHD/:mahoadon/:machitiethoadon",Query.DeleteCTHD);
// hoa don va chi tiet hoa don
router.get("/GetAllPhieuChiTien",Query.GetAllPhieuChiTien);
router.get("/GetPhieuChiTien/:maphieuchitien",Query.GetPhieuChiTien);
router.post("/InsertPhieuChiTien",Query.InsertPhieuChiTien);
router.put("/UpdatePhieuChiTien",Query.UpdatePhieuChiTien);
router.delete("/DeletePhieuChiTien/:maphieuchitien",Query.DeletePhieuChiTien);
// Phieu chi
router.get("/GetAllPhieuNhanTien",Query.GetAllPhieuNhanTien);
router.get("/GetPhieuNhanTien/:maphieunhantien",Query.GetPhieuNhanTien);
router.post("/InsertPhieuNhanTien",Query.InsertPhieuNhanTien);
router.put("/UpdatePhieuNhanTien",Query.UpdatePhieuNhanTien);
router.delete("/DeletePhieuNhanTien/:maphieunhantien",Query.DeletePhieuNhanTien);
// Phieu nhan
router.get("/GetAllPhieuNhap",Query.GetAllPhieuNhap);
router.get("/GetPhieuNhap/:maphieunhap",Query.GetPhieuNhap);
router.post("/InsertPhieuNhap",Query.InsertPhieuNhap);
router.post("/InsertPhieuNhapAuto",Query.InsertPhieuNhapAuto);
router.put("/UpdatePhieuNhap",Query.UpdatePhieuNhap);
router.delete("/DeletePhieuNhap/:maphieunhap",Query.DeletePhieuNhap);

router.get("/GetAllCTPhieuNhap/:maphieunhap",Query.GetAllCTPhieuNhap);
router.get("/GetCTPhieuNhap/:machitietphieunhap",Query.GetCTPhieuNhap);
router.post("/InsertCTPhieuNhap",Query.InsertCTPhieuNhap);
router.put("/UpdateCTPhieuNhap",Query.UpdateCTPhieuNhap);
router.delete("/DeleteCTPhieuNhap/:machitietphieunhap",Query.DeleteCTPhieuNhap);
//Phieu nhap
router.get("/GetAllPhieuXuat",Query.GetAllPhieuXuat);
router.get("/GetPhieuXuat/:maphieuxuat",Query.GetPhieuXuat);
router.post("/InsertPhieuXuat",Query.InsertPhieuXuat);
router.post("/InsertPhieuXuatAuto",Query.InsertPhieuXuatAuto);
router.put("/UpdatePhieuXuat",Query.UpdatePhieuXuat);
router.delete("/DeletePhieuXuat/:maphieuxuat",Query.DeletePhieuXuat);

router.get("/GetAllCTPhieuXuat/:maphieuxuat",Query.GetAllCTPhieuXuat);
router.get("/GetCTPhieuXuat/:machitietphieuxuat",Query.GetCTPhieuXuat);
router.post("/InsertCTPhieuXuat",Query.InsertCTPhieuXuat);
router.put("/UpdateCTPhieuXuat",Query.UpdateCTPhieuXuat);
router.delete("/DeleteCTPhieuXuat/:machitietphieuxuat",Query.DeleteCTPhieuXuat);
//Phieu xuat
router.get("/GetAllPhieuTraHang",Query.GetAllPhieuTraHang);
router.get("/GetPhieuTraHang/:maphieutrahang",Query.GetPhieuTraHang);
router.post("/InsertPhieuTraHang",Query.InsertPhieuTraHang);
router.post("/InsertPhieuTraHangAuto",Query.InsertPhieuTraHangAuto);
router.put("/UpdatePhieuTraHang",Query.UpdatePhieuTraHang);
router.delete("/DeletePhieuTraHang/:maphieutrahang",Query.DeletePhieuTraHang);

router.get("/GetAllCTPhieuTraHang/:maphieutrahang",Query.GetAllCTPhieuTraHang);
router.get("/GetCTPhieuTraHang/:maphieutrahangchitiet",Query.GetCTPhieuTraHang);
router.post("/InsertCTPhieuTraHang",Query.InsertCTPhieuTraHang);
router.put("/UpdateCTPhieuTraHang",Query.UpdateCTPhieuTraHang);
router.delete("/DeleteCTPhieuTraHang/:maphieutrahangchitiet",Query.DeleteCTPhieuTraHang);

//Phieu tra hang
module.exports = router;
