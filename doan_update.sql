ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'root';
flush privileges;
drop database doan;
create database doan;
use doan;
SET GLOBAL time_zone = '+7:00';

create table sukien(chietkhau float, tungay datetime, denngay datetime,masukien varchar(255) primary key not null ,noidung varchar(255),tensukien varchar(255));
-- Done
create table chinhanh (machinhanh varchar(255) primary key not null, sdt varchar(255),tenchinhanh varchar(255),gmail text,diachi varchar(255),nganquy float);
-- Done
create table nhanvien(anhnv text,machucvu int,tennv varchar(255),manv varchar(255) primary key not null,matkhau varchar(255) not null, machinhanh varchar(255), constraint fk_nv_chinhanh foreign key (machinhanh) references chinhanh (machinhanh),ngaysinh datetime,cmnd varchar(255), sdt varchar(255),diachi text,email text);
-- Done
create table diemdanhnv (madiemdanhnv varchar(255) primary key not null,manv varchar(255),constraint fk_diemdanhnv_nv foreign key (manv) references nhanvien(manv),ngaydimuon int,ngaylam int,ngaynghi int);
-- Done
create table luong(hesoluong float,luongcoban float,manv varchar(255), constraint fk_luong_nv foreign key (manv) references nhanvien(manv),maluong varchar(255) primary key not null);
-- Done
create table phieuchitien (maphieuchitien varchar(255) primary key not null,manv varchar(255), constraint fk_phieuchi_nv foreign key (manv) references nhanvien(manv),ngaychi datetime,noidung text,sotienchi float,machinhanh varchar(255),constraint fk_phieuchitien_chinhanh foreign key (machinhanh) references chinhanh(machinhanh));
-- Done
create table phieunhantien (maphieunhantien varchar(255) primary key not null,manv varchar(255), constraint fk_phieunhan_nv foreign key (manv) references nhanvien(manv),ngaynhan datetime,noidung text,sotiennhan float,machinhanh varchar(255),constraint fk_phieunhantien_chinhanh foreign key (machinhanh) references chinhanh(machinhanh));
-- Done
create table kho(makho varchar(255) primary key not null,mota varchar(255),tenkho varchar(255));
-- Done
create table phieunhap (makho varchar(255), constraint fk_phieunhap_kho foreign key (makho) references kho(makho),maphieunhap varchar(255) primary key not null, manv varchar(255), constraint fk_phieunhap_nv foreign key (manv) references nhanvien(manv),ngaynhap datetime,tenphieunhap varchar(255),tongtien float);
-- Done
create table nhacc(ghichu text,mancc varchar(255) primary key not null,tenncc varchar(255));
-- Done
create table hanghoa(gianhap float,mahh varchar(255) primary key not null,makho varchar(255), constraint fk_hanghoa_kho foreign key (makho) references kho(makho),maloaihh varchar(255),ngaynhap datetime,soluong int,tenhh varchar(255),donvitinh varchar(255));
-- Done
create table chitietphieunhap(dongia float,machitietphieunhap int primary key not null auto_increment,maphieunhap varchar(255),constraint fk_chitietphieunhap_phieunhap foreign key (maphieunhap) references phieunhap(maphieunhap),soluong int,mahh varchar(255),constraint fk_phieunhap_hanghoa foreign key (mahh)references hanghoa(mahh),mancc varchar(255), constraint fk_phieunhap_nhacc foreign key (mancc) references nhacc(mancc));
-- Done
create table sanpham(masp varchar(255) primary key not null,anhsp text,giaban float,maloaisp varchar (255),noidung text,trangthai varchar(255),tensp varchar(255));
-- Done
create table chitietsp(soluong float, machitietsp int primary key not null auto_increment,mahh varchar(255), constraint fk_chitietsp_hanghoa foreign key (mahh) references hanghoa(mahh),masp varchar(255), constraint fk_chitietsp_sp foreign key (masp) references sanpham(masp));
-- Done
create table khachhang(anhkh text,diachi text,email text,makh varchar(255) primary key not null, sdt varchar(255),tenkh varchar(255),matkhau varchar(255) not null);
-- Done
create table giohang (magiohang varchar(255) primary key not null,makh varchar(255), constraint fk_giohang_khachhang foreign key (makh) references khachhang(makh));
-- Done
create table chitietgiohang(machitietgiohang int primary key not null auto_increment, magiohang varchar(255), constraint fk_giohang_chitietgiohang foreign key (magiohang) references giohang(magiohang),soluong int,masp varchar(255),constraint fk_chitietgiohang_sanpham foreign key (masp) references sanpham(masp) );
-- Done
create table hoadon(diachi varchar(255),ghichu text,machinhanh varchar(255),constraint fk_hoadon_chinhanh foreign key (machinhanh) references chinhanh(machinhanh),mahoadon varchar(255) primary key not null, makh varchar(255), constraint fk_hoadon_khachhang foreign key (makh) references khachhang(makh),masukien varchar(255), constraint fk_hoadon_sukien foreign key (masukien) references sukien(masukien),ngaytao datetime,sdt varchar(255),tenhoadon varchar(255),trangthai varchar(255),tongtien float);
-- Done
create table chitiethoadon(machitiethoadon int primary key not null auto_increment,dongia float,mahoadon varchar(255), constraint fk_cthoadon_hoadon foreign key (mahoadon) references hoadon(mahoadon),masp varchar(255),constraint fk_cthoadon_sanpham foreign key (masp) references sanpham(masp),soluong int);
-- Done
create table phieuxuat (machinhanh varchar(255), constraint fk_phieuxuat_chinhanh foreign key (machinhanh) references chinhanh(machinhanh),maphieuxuat varchar(255) primary key not null, manv varchar(255), constraint fk_phieuxuat_nv foreign key (manv) references nhanvien(manv),ngayxuat datetime,tenphieuxuat varchar(255),tongtien float);
-- Done
create table chitietphieuxuat(dongia float,machitietphieuxuat int primary key not null auto_increment,maphieuxuat varchar(255),constraint fk_chitietphieuxuat_phieuxuat foreign key (maphieuxuat) references phieuxuat(maphieuxuat),soluong int,mahh varchar(255),constraint fk_phieuxuat_hanghoa foreign key (mahh) references hanghoa(mahh),makho varchar(255), constraint fk_phieuxuat_kho foreign key (makho) references kho(makho));
-- Done
create table phieutrahang(maphieutrahang varchar(255) primary key, mahoadon varchar(255),constraint fk_phieutrahang_hoadon foreign key (mahoadon) references hoadon(mahoadon),ngaytra datetime,tongtien float);
-- Done
create table chitietphieutrahang(maphieutrahang varchar(255), constraint fk_ctphieutrahang_phieutrahang foreign key (maphieutrahang) references phieutrahang(maphieutrahang), maphieutrahangchitiet int primary key auto_increment not null, soluong int, masp varchar(255),constraint fk_ctphietrahang_sanpham foreign key (masp) references sanpham(masp),dongia float );
-- Done

DROP TRIGGER IF EXISTS insert_chitietphieunhap_hanghoa;
DELIMITER $$
 CREATE TRIGGER insert_chitietphieunhap_hanghoa
 after insert ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieunhap
SET
 hanghoa.soluong = hanghoa.soluong + chitietphieunhap.soluong
 where hanghoa.mahh = chitietphieunhap.mahh and machitietphieunhap=New.machitietphieunhap;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS update_chitietphieunhap_hanghoa;
DELIMITER $$
 CREATE TRIGGER update_chitietphieunhap_hanghoa
 after update ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieunhap
SET
 hanghoa.soluong = hanghoa.soluong - old.soluong + chitietphieunhap.soluong
 where hanghoa.mahh = chitietphieunhap.mahh and machitietphieunhap=New.machitietphieunhap;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS delete_chitietphieunhap_hanghoa;
DELIMITER $$
 CREATE TRIGGER delete_chitietphieunhap_hanghoa
 before delete ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieunhap
SET
 hanghoa.soluong = hanghoa.soluong - old.soluong
 where hanghoa.mahh = chitietphieunhap.mahh and machitietphieunhap=old.machitietphieunhap;
END$$
 DELIMITER ;

-- TRIGER CHO PHIEU NHAP => + SO LUONG HANG HOA

DROP TRIGGER IF EXISTS insert_chitietphieuxuat_hanghoa;
DELIMITER $$
 CREATE TRIGGER insert_chitietphieuxuat_hanghoa
 after insert ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieuxuat
SET
 hanghoa.soluong = hanghoa.soluong - chitietphieuxuat.soluong
 where hanghoa.mahh = chitietphieuxuat.mahh and machitietphieuxuat=New.machitietphieuxuat;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS update_chitietphieuxuat_hanghoa;
DELIMITER $$
 CREATE TRIGGER update_chitietphieuxuat_hanghoa
 after update ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieuxuat
SET
 hanghoa.soluong = hanghoa.soluong + old.soluong - chitietphieuxuat.soluong
 where hanghoa.mahh = chitietphieuxuat.mahh and machitietphieuxuat=New.machitietphieuxuat;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS delete_chitietphieuxuat_hanghoa;
DELIMITER $$
 CREATE TRIGGER delete_chitietphieuxuat_hanghoa
 before delete ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update hanghoa,chitietphieuxuat
SET
 hanghoa.soluong = hanghoa.soluong + old.soluong
 where hanghoa.mahh = chitietphieuxuat.mahh and machitietphieuxuat=old.machitietphieuxuat;
END$$
 DELIMITER ;
-- TRIGER CHO PHIEU XUAT => - SO LUONG HANG HOA

DROP TRIGGER IF EXISTS insert_phieunhantien_chinhanh;
DELIMITER $$
 CREATE TRIGGER insert_phieunhantien_chinhanh
 after insert ON phieunhantien
 FOR EACH ROW
BEGIN
 update chinhanh,phieunhantien
SET
 chinhanh.nganquy = chinhanh.nganquy + phieunhantien.sotiennhan
 where chinhanh.machinhanh = phieunhantien.machinhanh and maphieunhantien=New.maphieunhantien;
END$$
 DELIMITER ;
 
 
DROP TRIGGER IF EXISTS update_phieunhantien_chinhanh;
DELIMITER $$
 CREATE TRIGGER update_phieunhantien_chinhanh
 after update ON phieunhantien
 FOR EACH ROW
BEGIN
 update chinhanh,phieunhantien
SET
 chinhanh.nganquy = chinhanh.nganquy - old.sotiennhan + phieunhantien.sotiennhan
 where chinhanh.machinhanh = phieunhantien.machinhanh and maphieunhantien=New.maphieunhantien;
END$$
 DELIMITER ;
 
  
DROP TRIGGER IF EXISTS delete_phieunhantien_chinhanh;
DELIMITER $$
 CREATE TRIGGER delete_phieunhantien_chinhanh
 before delete ON phieunhantien
 FOR EACH ROW
BEGIN
 update chinhanh,phieunhantien
SET
 chinhanh.nganquy = chinhanh.nganquy - old.sotiennhan
 where chinhanh.machinhanh = phieunhantien.machinhanh and maphieunhantien=old.maphieunhantien;
END$$
 DELIMITER ;
-- TRIGER CHO PHIEUNHANTIEN => + Ngan sach / ngan quy

DROP TRIGGER IF EXISTS insert_phieuchitien_chinhanh;
DELIMITER $$
 CREATE TRIGGER insert_phieuchitien_chinhanh
 after insert ON phieuchitien
 FOR EACH ROW
BEGIN
 update chinhanh,phieuchitien
SET
 chinhanh.nganquy = chinhanh.nganquy-phieuchitien.sotienchi
 where chinhanh.machinhanh = phieuchitien.machinhanh and maphieuchitien=New.maphieuchitien;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS update_phieuchitien_chinhanh;
DELIMITER $$
 CREATE TRIGGER update_phieuchitien_chinhanh
 after update ON phieuchitien
 FOR EACH ROW
BEGIN
 update chinhanh,phieuchitien
SET
 chinhanh.nganquy = chinhanh.nganquy + old.sotienchi - phieuchitien.sotienchi
 where chinhanh.machinhanh = phieuchitien.machinhanh and maphieuchitien=New.maphieuchitien;
END$$
 DELIMITER ;
 
 DROP TRIGGER IF EXISTS delete_phieuchitien_chinhanh;
DELIMITER $$
 CREATE TRIGGER delete_phieuchitien_chinhanh
 before delete ON phieuchitien
 FOR EACH ROW
BEGIN
 update chinhanh,phieuchitien
SET
 chinhanh.nganquy = chinhanh.nganquy + old.sotienchi
 where chinhanh.machinhanh = phieuchitien.machinhanh and maphieuchitien=old.maphieuchitien;
END$$
 DELIMITER ;
-- TRIGER CHO PHIEUCHITIEN => - Ngan sach / ngan quy

DROP TRIGGER IF EXISTS insert_cthd_hd;
DELIMITER $$
 CREATE TRIGGER insert_cthd_hd
 after insert ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon
SET
 hoadon.tongtien = hoadon.tongtien + (chitiethoadon.dongia*chitiethoadon.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=New.machitiethoadon;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS update_cthd_hd;
DELIMITER $$
 CREATE TRIGGER update_cthd_hd
 after update ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon
SET
 hoadon.tongtien = hoadon.tongtien - (old.dongia*old.soluong) + (chitiethoadon.dongia*chitiethoadon.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=New.machitiethoadon;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS delete_cthd_hd;
DELIMITER $$
 CREATE TRIGGER delete_cthd_hd
 before delete ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon
SET
 hoadon.tongtien = hoadon.tongtien - (old.dongia*old.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=old.machitiethoadon;
END$$
 DELIMITER ;
-- TRIGER CHO CHI TIET HOA DON => + TONGTIEN CHO HOA DON

-- ------------------------------
DROP TRIGGER IF EXISTS insert_ctpth_pth;
DELIMITER $$
 CREATE TRIGGER insert_ctpth_pth
 after insert ON chitietphieutrahang
 FOR EACH ROW
BEGIN
 update phieutrahang,chitietphieutrahang
SET
 phieutrahang.tongtien = phieutrahang.tongtien + (chitietphieutrahang.dongia*chitietphieutrahang.soluong)
 where phieutrahang.maphieutrahang = chitietphieutrahang.maphieutrahang and maphieutrahangchitiet = New.maphieutrahangchitiet;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS update_ctpth_pth;
DELIMITER $$
 CREATE TRIGGER update_ctpth_pth
 after update ON chitietphieutrahang
 FOR EACH ROW
BEGIN
 update phieutrahang,chitietphieutrahang
SET
 phieutrahang.tongtien = phieutrahang.tongtien - (old.dongia*old.soluong) + (chitietphieutrahang.dongia*chitietphieutrahang.soluong)
 where phieutrahang.maphieutrahang = chitietphieutrahang.maphieutrahang and maphieutrahangchitiet = New.maphieutrahangchitiet;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS delete_ctpth_pth;
DELIMITER $$
 CREATE TRIGGER delete_ctpth_pth
 before delete ON chitietphieutrahang
 FOR EACH ROW
BEGIN
 update phieutrahang,chitietphieutrahang
SET
 phieutrahang.tongtien = phieutrahang.tongtien - (old.dongia*old.soluong)
 where phieutrahang.maphieutrahang = chitietphieutrahang.maphieutrahang and maphieutrahangchitiet = old.maphieutrahangchitiet;
END$$
 DELIMITER ;
-- TRIGER CHO CHI TIET PHIEU TRA HANG => + TONGTIEN CHO PHIEU TRA HANG
DROP TRIGGER IF EXISTS insert_ctpn_pn;
DELIMITER $$
 CREATE TRIGGER insert_ctpn_pn
 after insert ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update phieunhap,chitietphieunhap
SET
 phieunhap.tongtien = phieunhap.tongtien + (chitietphieunhap.dongia*chitietphieunhap.soluong)
 where phieunhap.maphieunhap = chitietphieunhap.maphieunhap and machitietphieunhap = New.machitietphieunhap;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS update_ctpn_pn;
DELIMITER $$
 CREATE TRIGGER update_ctpn_pn
 after update ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update phieunhap,chitietphieunhap
SET
 phieunhap.tongtien = phieunhap.tongtien - (old.dongia*old.soluong) + (chitietphieunhap.dongia*chitietphieunhap.soluong)
 where phieunhap.maphieunhap = chitietphieunhap.maphieunhap and machitietphieunhap = New.machitietphieunhap;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS delete_ctpn_pn;
DELIMITER $$
 CREATE TRIGGER delete_ctpn_pn
 before delete ON chitietphieunhap
 FOR EACH ROW
BEGIN
 update phieunhap,chitietphieunhap
SET
 phieunhap.tongtien = phieunhap.tongtien - (old.dongia*old.soluong)
 where phieunhap.maphieunhap = chitietphieunhap.maphieunhap and machitietphieunhap = old.machitietphieunhap;
END$$
 DELIMITER ;
-- TRIGER CHO CHI TIET PHIEU NHAP => + TONGTIEN CHO PHIEU NHAP
-- ----------------------------
DROP TRIGGER IF EXISTS insert_ctpx_px;
DELIMITER $$
 CREATE TRIGGER insert_ctpx_px
 after insert ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update phieuxuat,chitietphieuxuat
SET
 phieuxuat.tongtien = phieuxuat.tongtien + (chitietphieuxuat.dongia*chitietphieuxuat.soluong)
 where phieuxuat.maphieuxuat = chitietphieuxuat.maphieuxuat and machitietphieuxuat = New.machitietphieuxuat;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS update_ctpx_px;
DELIMITER $$
 CREATE TRIGGER update_ctpx_px
 after update ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update phieuxuat,chitietphieuxuat
SET
 phieuxuat.tongtien = phieuxuat.tongtien - (old.dongia*old.soluong) + (chitietphieuxuat.dongia*chitietphieuxuat.soluong)
 where phieuxuat.maphieuxuat = chitietphieuxuat.maphieuxuat and machitietphieuxuat = New.machitietphieuxuat;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS delete_ctpx_px;
DELIMITER $$
 CREATE TRIGGER delete_ctpx_px
 before delete ON chitietphieuxuat
 FOR EACH ROW
BEGIN
 update phieuxuat,chitietphieuxuat
SET
 phieuxuat.tongtien = phieuxuat.tongtien - (old.dongia*old.soluong)
 where phieuxuat.maphieuxuat = chitietphieuxuat.maphieuxuat and machitietphieuxuat = old.machitietphieuxuat;
END$$
 DELIMITER ;
-- TRIGER CHO CHI TIET PHIEU XUAT => + TONGTIEN CHO PHIEU XUAT
DROP TRIGGER IF EXISTS insert_cthd_hd;
DELIMITER $$
 CREATE TRIGGER insert_cthd_hd
 after insert ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon,sukien
SET
 hoadon.tongtien = hoadon.tongtien + ((chitiethoadon.dongia-chitiethoadon.dongia*(sukien.chietkhau/100))*chitiethoadon.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=New.machitiethoadon and hoadon.masukien = sukien.masukien;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS update_cthd_hd;
DELIMITER $$
 CREATE TRIGGER update_cthd_hd
 after update ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon,sukien
SET
 hoadon.tongtien = hoadon.tongtien - ((old.dongia-old.dongia*(sukien.chietkhau/100))*old.soluong) + ((chitiethoadon.dongia-chitiethoadon.dongia*(sukien.chietkhau/100))*chitiethoadon.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=New.machitiethoadon and hoadon.masukien = sukien.masukien;
END$$
 DELIMITER ;
 
DROP TRIGGER IF EXISTS delete_cthd_hd;
DELIMITER $$
 CREATE TRIGGER delete_cthd_hd
 before delete ON chitiethoadon
 FOR EACH ROW
BEGIN
 update hoadon,chitiethoadon,sukien
SET
 hoadon.tongtien = hoadon.tongtien - ((old.dongia-old.dongia*(sukien.chietkhau/100))*old.soluong)
 where hoadon.mahoadon = chitiethoadon.mahoadon and machitiethoadon=old.machitiethoadon and sukien.masukien = hoadon.masukien;
END$$
 DELIMITER ;
-- Sua lai TRIGER CHO CHI TIET HOA DON => + TONGTIEN CHO HOA DON (Them chiet khau % cua su kien)

-- NOTE 1: Xoa bang tai khoan 
-- NOTE 2: Them truong trang thai vao hoa don (varchar) de nhan vien xac nhan don hang
-- Note 3: doi anhnhanvien thanh anhnv, hoten thanh tennv => Xoa gioi tinh trong bang csdl nhan vien, them truong diachi + email
-- Note 4: Doi soluong trong bang sanpham thay trangthai (con hang/het hang) => Do so luong san pham dua theo nhieu so luong hang hoa (Ap dung thuc te se ko the tinh chinh xac duoc)
-- Note 5?: Bo hesoluong va luongcoban trong bang nhanvien, do hesoluong va luongcoban da ton tai trong bang luong cua nhanvien
-- Note 6: Sửa sdt/cmnd thành varchar(255)
-- Note 7: Them donvitinh vao bang hang hoa
-- Note 8: Them trigger (khi them mot bang chi tiet phieu nhap se tu dong tang san pham cua hang hoa)
-- Note 9: Them bang phieuxuat, chitietphieuxuat (de biet khi nao xuat cac hang hoa tu kho toi chi nhanh va tao trigger tru so luong hang hoa trong bang hang hoa)
-- Note 10: Them bang phieutrahang, chitietphieutrahang de giai quyet van de khach hang bom hang, tra hang
-- Note 11:Them ngay nghi vao bang diemdanhnv, 1 nhan vien co nhieu bang diemdanhnv => Xoa madiemdanhnv trong bang luong (moi thang se co 1 bang?) 
-- Note12: Them truong nganquy trong bang chi nhanh, them phieunhan, su dung de nhan tien (+ tien cho cac chi nhanh), phieuchi se tru tien cua cac chi nhanh = trigger
-- Note 13: Xoa manhanvien trong sanpham,Xoa NCC va chi nhanh trong hanghoa, them mancc trong chitietphieunhap, them makho trong chitietphieuxuat, doi khoiluong => soluong va xoa dongia trong chitietsp
-- Note 14: Them tongtien vao hoadon, phieutrahang

-- QLBH: QL KH /QL Hóa đơn / Hóa đơn chi tiết / QL Phiếu trả hàng / phiếu trả hàng chi tiết / Xem sự kiện
-- QLK: Hàng hóa / Nhập hàng / xuất hàng
-- QLCN: Xem hóa đơn, hóa đơn CT, phiếu trả hàng, trả hàng chi tiết/QLNV, QL chi tiêu, QL vốn, ql sự kiện/ QL Điểm danh NV / Xem doanh thu
-- QLT: QL chi nhánh, QL NCC, QL Kho, QL SP, QLNV, Xem hóa đơn, hóa đơn CT, phiếu trả hang, trả hàng chi tiết / Xem doanh thu

-- CSDL mau: 
insert into sukien(chietkhau,tungay,denngay,masukien,noidung,tensukien) values(8,"2020-04-20","2021-04-21","sk01","Su kien 01 chiet khau 8% tong hoa don","Su kien thang 4");
insert into sukien(chietkhau,tungay,denngay,masukien,noidung,tensukien) values(5,"2021-10-20","2021-10-21","sk02","Su kien 02 chiet khau 5% tong hoa don cho khach hang xinh gai","Su kien thang 3");

insert into chinhanh (machinhanh, sdt, tenchinhanh, gmail,diachi, nganquy) values("cn01","0528455877","Chi nhanh Xuan Dong","dong74225@st.vimaru.edu.vn","Kieu Son, Hai Phong",0);
insert into chinhanh (machinhanh, sdt, tenchinhanh, gmail,diachi, nganquy) values("cn02","0373664313","Chi nhanh JPV","dongxuannguyen@st.vimaru.edu.vn","Kieu Son, Hai Phong, Viet Nam",0);

insert into nhanvien(anhnv,machucvu,tennv,manv,matkhau,machinhanh,ngaysinh,cmnd,sdt,diachi,email) values ("https://i.imgur.com/kHCk6eM.jpeg",1,"Nguyen Xuan Dong","nv01","123456","cn01","1999-05-09","0123456789","0528455877","Hai Phong Viet Nam","dong74225@st.vimaru.edu.vn");
insert into nhanvien(anhnv,machucvu,tennv,manv,matkhau,machinhanh,ngaysinh,cmnd,sdt,diachi,email) values ("https://i.imgur.com/ps6GwPg.jpeg",2,"GIRL","nv02","123456","cn02","1999-03-24","01234567889","0528455877","Kieu Son Hai Phong Viet Nam","daibeo1997@st.vimaru.edu.vn");
insert into nhanvien(anhnv,machucvu,tennv,manv,matkhau,machinhanh,ngaysinh,cmnd,sdt,diachi,email) values ("https://i.imgur.com/kHCk6eM.jpeg",3,"Nguyen Xuan Dong","nv03","123456","cn01","1999-05-09","0123456789","0528455877","Hai Phong Viet Nam","dong74225@st.vimaru.edu.vn");
insert into nhanvien(anhnv,machucvu,tennv,manv,matkhau,machinhanh,ngaysinh,cmnd,sdt,diachi,email) values ("https://i.imgur.com/ps6GwPg.jpeg",4,"GIRL","nv04","123456","cn02","1999-03-24","01234567889","0528455877","Kieu Son Hai Phong Viet Nam","daibeo1997@st.vimaru.edu.vn");

insert into diemdanhnv (madiemdanhnv,manv,ngaylam,ngaydimuon,ngaynghi) values("T1","nv01",15,2,4);
insert into diemdanhnv (madiemdanhnv,manv,ngaylam,ngaydimuon,ngaynghi) values("T2","nv02",25,5,7);

insert into luong(hesoluong,luongcoban,manv,maluong) values (3,800000,"nv01","nv01");
insert into luong(hesoluong,luongcoban,manv,maluong) values (2,900000,"nv02","nv02");

insert into phieuchitien (maphieuchitien,manv,ngaychi,noidung,sotienchi,machinhanh) values ("pct01","nv01","2021-04-22","Chi de test he thong",1000000,"cn01");
insert into phieuchitien (maphieuchitien,manv,ngaychi,noidung,sotienchi,machinhanh) values ("pct02","nv02","2021-05-22","Chi de test he thong lan 2",1000000,"cn02");

insert into phieunhantien (maphieunhantien,manv,ngaynhan,noidung,sotiennhan,machinhanh) values ("pnt01","nv01","2021-04-22","Chi de test he thong",1000000,"cn01");
insert into phieunhantien (maphieunhantien,manv,ngaynhan,noidung,sotiennhan,machinhanh) values ("pnt02","nv02","2021-05-22","Chi de test he thong lan 2",1000000,"cn02");

insert into kho(makho,mota,tenkho) values ("k01","kho chua hang tong hop","KHO KIEU SON");
insert into kho(makho,mota,tenkho) values ("k02","kho chua hang tong hop 2","KHO VAN CAO");

insert into phieunhap(makho,maphieunhap,manv,ngaynhap,tenphieunhap,tongtien) values ("k01","pn01","nv01","2021-04-04","Phieu nhap test 01",800000000 );
insert into phieunhap(makho,maphieunhap,manv,ngaynhap,tenphieunhap,tongtien) values ("k02","pn02","nv02","2021-04-04","Phieu nhap test 02",810000000 );

insert into nhacc(ghichu,mancc,tenncc) values("Nha cung cap tong hop","ncc01","Nha cung cap van cao");
insert into nhacc(ghichu,mancc,tenncc) values("Nha cung cap tong hop 2","ncc02","Nha cung cap kieuson");

insert into hanghoa(gianhap,mahh,makho,maloaihh,ngaynhap,soluong,tenhh,donvitinh) values (400,'hh01','k01','hangkho','2021-1-1',0,'hang kho 01','kg');
insert into hanghoa(gianhap,mahh,makho,maloaihh,ngaynhap,soluong,tenhh,donvitinh) values (400,'hh02','k02','hangkho','2021-1-1',0,'hang kho 02','hop');

insert into chitietphieunhap(dongia,maphieunhap,soluong,mahh,mancc) values (400,'pn01',6,'hh01','ncc01');
insert into chitietphieunhap(dongia,maphieunhap,soluong,mahh,mancc) values (500,'pn02',68,'hh02','ncc02');

insert into sanpham(masp,anhsp,giaban,maloaisp,noidung,trangthai,tensp) values ('sp01','https://i.imgur.com/j7Tft.jpeg',600,'cafe den mau','cafe den pha bang bot cafe den','con hang','Cafe den 01');
insert into sanpham(masp,anhsp,giaban,maloaisp,noidung,trangthai,tensp) values ('sp02','https://i.imgur.com/ZTp9FSU.jpeg',500,'cafe trung','cafe trung pha bang bot cafe trung','con hang','Cafe trung 01');

insert into chitietsp(soluong,mahh,masp) values (2,'hh01','sp01');
insert into chitietsp(soluong,mahh,masp) values (2,'hh02','sp02');

insert into khachhang(anhkh,diachi,email,makh,sdt,tenkh,matkhau) values ('https://i.imgur.com/tRC38aB.jpeg','hai phong vn','emailsth@gmail.com','kh01','0528455877','Khach hang nu xinh dep','123456');
insert into khachhang(anhkh,diachi,email,makh,sdt,tenkh,matkhau) values ('https://i.imgur.com/1Y71U91.jpg','kieu son hai phong vn ','emailsth@gmail.com','kh02','0373664313','Khach hang nu 2 xinh dep','123456');

insert into giohang (magiohang,makh) values ('kh01','kh01');
insert into giohang (magiohang,makh) values ('kh02','kh02');

insert into chitietgiohang(magiohang,soluong,masp) values ('kh01',5,'sp01');
insert into chitietgiohang(magiohang,soluong,masp) values ('kh02',4,'sp02');

insert into hoadon(diachi,ghichu,machinhanh,mahoadon,makh,masukien,ngaytao,sdt,tenhoadon,trangthai,tongtien) values ("3/5/45 Kieu son hp","Goi dien bao trc","cn01","hd01","kh01","sk01","2021-2-2","0528455877","Hoa don mua hang","Xac nhan",0);
insert into hoadon(diachi,ghichu,machinhanh,mahoadon,makh,masukien,ngaytao,sdt,tenhoadon,trangthai,tongtien) values ("3/5/45 Van cao hp","Goi dien bao trc","cn02","hd02","kh02","sk02","2021-2-2","05284558888","Hoa don mua hang 02","Chua Xac nhan",0);

insert into chitiethoadon(dongia,mahoadon,masp,soluong) values (500,"hd01","sp01",2);
insert into chitiethoadon(dongia,mahoadon,masp,soluong) values (500,"hd02","sp02",2);

insert into phieuxuat (machinhanh,maphieuxuat,manv,ngayxuat,tenphieuxuat,tongtien) values ("cn01","px01","nv01","2021-02-02","Xuat hang so 01",40000);
insert into phieuxuat (machinhanh,maphieuxuat,manv,ngayxuat,tenphieuxuat,tongtien) values ("cn02","px02","nv02","2021-02-02","Xuat hang so 02",450000);

insert into chitietphieuxuat(dongia,maphieuxuat,soluong,mahh,makho) values (40,"px01",2,"hh01","K01");
insert into chitietphieuxuat(dongia,maphieuxuat,soluong,mahh,makho) values (40,"px02",2,"hh02","K02");

insert into phieutrahang(maphieutrahang,mahoadon,ngaytra,tongtien) values ("pth01","hd01","2021-2-2",0);
insert into phieutrahang(maphieutrahang,mahoadon,ngaytra,tongtien) values ("pth02","hd02","2021-2-2",0);

insert into chitietphieutrahang(maphieutrahang,soluong,masp,dongia) values ("pth01",1,"sp01",400);
insert into chitietphieutrahang(maphieutrahang,soluong,masp,dongia) values ("pth02",1,"sp02",500);


select * from hoadon
