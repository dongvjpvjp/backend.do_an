const mysql = require("mysql");
const pool = mysql.createPool({
  host: "localhost",
  port: "3306",
  user: "root",
  password: "root",
  database: "doan",
});

const GetData = (req, res, csql = "") => {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(err);
      con.release();
      res.status(204).json({ error: err, access: 0 });
    }
    let sql = csql || `select * from sanpham Order By tensp; `
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0,sql:csql});
      }
      else {
        console.log({data:data});
        con.release();
        res.status(200).json({ access: 1, data: data,sql:csql });
      }
    })
  })
}
const QueryData = (req, res, sql) => {
  pool.getConnection((err, con) => {
    if (err) {
      console.log(err);
      con.release();
      res.status(204).json({ error: err, access: 0 });
    }
    con.query(sql, (err, data) => {
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0,sql:sql });
      }
      else {
        console.log({data,sql:sql});
        con.release();
        res.status(200).json({ access: 1,sql:sql });
      }
    })

  })
}

module.exports = {
  Logout: (req, res) => {
    req.session.destroy((err)=>{
      if(err) res.status(204).json({error:err,access: 0,auth: 1});
      else res.status(200).json({access: 1, auth: 0});
    })
  },
  Logkh: (req, res) => {
    let { makh, matkhau } = req.body;
    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        res.status(204).json({ error: err, access: 0,auth: 0 });
      }
      let sql = `Select * from khachhang where makh='${makh}' and matkhau='${matkhau}';`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          res.status(204).json({ error: err, access: 0,auth: 0 });
        }
        else {
          console.log(data);
          if (data.length > 0) {
            req.session.data = req.session.id;
            res.status(200).json({ access: 1,auth: 1 })
          }
          else { 
            res.status(204).json({ access: 0,auth: 0 }) };
        }
        con.release();
      });
    });
  },
  Lognv: (req, res) => {
    let { manv, matkhau } = req.body;

    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        res.status(200).json({ error: err, access: 0,auth: 0 });
      }
      let sql = `Select * from nhanvien where manv='${manv}' and matkhau='${matkhau}';`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          res.status(200).json({ error: err, access: 0,auth: 0 });
        }
        console.log(data);
        if(data.length>0){
          req.session.data=req.session.id;
          if ( data[0].machucvu === 1)
          res.status(200).json({ access: 1,auth: 1,data:req.session.data });
        else if (data[0].machucvu === 2)
          res.status(200).json({ access: 2,auth: 1,data:req.session.data});
        else if (data[0].machucvu === 3)
          res.status(200).json({ access: 3,auth: 1,data:req.session.data });
        else if (data[0].machucvu === 4)
          res.status(200).json({ access: 4,auth: 1,data:req.session.data });
        }
        else res.status(204).json({ access: 0,auth: 0 });
        con.release();
      });
    });
  },
  Regkh: (req, res) => {
    let { anhkh, diachi, email, makh, sdt, tenkh, matkhau } = req.body;
    pool.getConnection((err, con) => {
      // Tạo 1 tài khoản người dùng -> Tạo luôn giỏ hàng với cùng mã kh
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      else {
        let sql = `Insert into khachhang (anhkh,diachi,email,makh,sdt,tenkh,matkhau) values('${anhkh}','${diachi}','${email}','${makh}','${sdt}','${tenkh}','${matkhau}');`
        con.query(sql, (err, data) => {
          if (err) {
            console.log(err);
            con.release();
            res.status(204).json({ error: err, access: 0 });

          }
          else {
            console.log(data);
            sql = `insert into giohang (magiohang,makh) values ('${makh}','${makh}');`;
            con.query(sql, (err, data) => {
              if (err) {
                console.log(err);
                con.release();
                res.status(204).json({ error: err, access: 0 });
              }
              else {
                console.log(data);
                con.release();
                res.status(200).json({ access: 1 })
              };

            })
          };
        });
      }
      // insert gio hang


    });

  }, //Tao tk kh -> Tao ca gio hang
  // CAC API VIET CHO TRANG DANG NHAP VA DANG KY
  

  SearchMasp: (req, res) => {
    csql = `Select * from sanpham where masp Like '%${req.params.masp}%';`
    GetData(req, res, csql);
  },
  SearchTensp: (req, res) => {
    csql = `Select * from sanpham where tensp Like '%${req.params.tensp}%';`
    GetData(req, res, csql);
  },
  SearchMaLoaiSp: (req, res) => {
    csql = `Select * from sanpham where maloaisp Like '%${req.params.maloaisp}%';`
    GetData(req, res, csql);
  },
  
  GetAllSanPham: (req, res) => {
    GetData(req, res)
  },
  GetSanPham: (req, res) => {
    csql = `Select * from sanpham where masp = '${req.params.masp}';`
    GetData(req, res, csql);
  },
  UpdateSanPham: (req, res) => {  

    let { masp,anhsp,giaban,tensp,maloaisp, noidung, trangthai } = req.body;
    let sql = `UPDATE sanpham SET anhsp='${anhsp}',giaban=${giaban},tensp='${tensp}',maloaisp='${maloaisp}',noidung='${noidung}',trangthai='${trangthai}' WHERE masp='${masp}';`
    QueryData(req, res, sql);
  },
  DeleteSanPham: (req, res) => {
    let sql = `delete from sanpham where masp='${req.params.masp}';`
    QueryData(req, res, sql);
  },
  InsertSanPham: (req, res) => {
    let { masp,anhsp,giaban,tensp,maloaisp, noidung, trangthai } = req.body;
    let sql = `Insert into sanpham(masp,anhsp,giaban,tensp,maloaisp, noidung, trangthai) values ('${masp}','${anhsp}',${giaban},'${tensp}','${maloaisp}','${noidung}','${trangthai}')`;
    QueryData(req, res, sql);
  },

  InsertSanPhamAuto: (req, res) => {
    let {masp,anhsp,giaban,tensp,maloaisp, noidung, trangthai,values } = req.body;
    pool.getConnection((err, con) => {
      // Tao phieu nhap auto tao cac chi tiet phieu nhap
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `Insert into sanpham(masp,anhsp,giaban,tensp,maloaisp, noidung, trangthai) values ('${masp}','${anhsp}',${giaban},'${tensp}','${maloaisp}','${noidung}','${trangthai}')`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });
        }
        else {
          console.log(data);
          // create table chitietsp(dongia float,soluong float, machitietsp int primary key not null auto_increment,mahh varchar(255), constraint fk_chitietsp_hanghoa foreign key (mahh) references hanghoa(mahh),masp varchar(255), constraint fk_chitietsp_sp foreign key (masp) references sanpham(masp));

          let sql = "INSERT INTO chitietsp (masp,mahh,soluong) VALUES ?";
          let val = values
          // var values = [
          //   ['John', 71,8,66],
          //   ['Peter', 2, 4,5], 
          // ] => Insert multi voi gia tri values dang mang nhu tren => Client se phai truyen gia tri theo nhu dung mau => https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
          con.query(sql, [val], (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              con.release();
              res.status(200).json({ access: 1 })
            };

          })
        };
      })
      // insert phieu xuat


    });
  },
  GetCTSanPham: (req, res) => {
    csql = `Select * from chitietsp where machitietsp =${req.params.machitietsp};`
    GetData(req, res, csql);
  },
  GetAllCTSanPham: (req, res) => {
    csql = `Select * from chitietsp where masp ='${req.params.masp}';`
    GetData(req, res, csql);
  },
  UpdateCTSanPham: (req, res) => {
    let {machitietsp,soluong,mahh,masp} = req.body;
    let sql = `UPDATE chitietsp SET mahh= '${mahh}',masp='${masp}',soluong=${soluong} WHERE machitietsp=${machitietsp};`
    QueryData(req, res, sql);
  },
  DeleteCTSanPham: (req, res) => {
    let sql = `delete from chitietsp where machitietsp=${req.params.machitietsp};`
    QueryData(req, res, sql);
  },
  InsertCTSanPham: (req, res) => {
    let {soluong,mahh,masp} = req.body;
    let sql = `Insert into chitietsp (mahh,soluong,masp) values ('${mahh}',${soluong},'${masp}')`;
    QueryData(req, res, sql);
  },

  GetAllHH: (req, res) => {
    csql = `Select * from hanghoa;`
    GetData(req, res, csql);
  },
  GetHH: (req, res) => {
    csql = `Select * from hanghoa where mahh = '${req.params.mahh}';`
    GetData(req, res, csql);
  },
  UpdateHH: (req, res) => {
    // create table hanghoa(gianhap float,mahh varchar(255) primary key not null,makho varchar(255), constraint fk_hanghoa_kho foreign key (makho) references kho(makho),maloaihh varchar(255),ngaynhap datetime,soluong int,tenhh varchar(255),donvitinh varchar(255));

    let { gianhap, mahh, tenhh, makho, maloaihh, ngaynhap, donvitinh} = req.body;
    let sql = `UPDATE hanghoa SET gianhap=${gianhap},tenhh='${tenhh}',makho='${makho}',maloaihh='${maloaihh}',ngaynhap='${ngaynhap}',donvitinh='${donvitinh}' WHERE mahh='${mahh}';`
    QueryData(req, res, sql);
  },
  DeleteHH: (req, res) => {
    let sql = `delete from hanghoa where mahh='${req.params.mahh}';`
    QueryData(req, res, sql);
  },
  InsertHH: (req, res) => {
    let { gianhap, mahh, tenhh, makho, maloaihh, ngaynhap, donvitinh} = req.body;
    let sql = `Insert into hanghoa(gianhap, mahh,tenhh , makho, maloaihh, ngaynhap, donvitinh,soluong) values (${gianhap},'${mahh}','${tenhh}','${makho}','${maloaihh}','${ngaynhap}','${donvitinh}',0)`;
    QueryData(req, res, sql);
  },
  // Cac API Viet cho data sanpham, hanghoa

  GetAllInfo: (req, res) => {
    csql = `Select * from khachhang;`
    GetData(req, res, csql);
  },
  GetInfo: (req, res) => {
    csql = `Select * from khachhang where makh = '${req.params.makh}';`
    GetData(req, res, csql);
  },
  UpdateInfo: (req, res) => {
    let { anhkh, diachi, email, makh, sdt, tenkh, matkhau } = req.body;
    let sql = `UPDATE khachhang SET anhkh= '${anhkh}',diachi='${diachi}',email='${email}',sdt='${sdt}', tenkh='${tenkh}', matkhau='${matkhau}' WHERE makh='${makh}';`
    QueryData(req, res, sql);
  },
  DeleteInfo: (req, res) => {
    // Xóa 1 tài khoản người dùng -> Xóa luôn giỏ hàng với cùng mã kh
    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `DELETE from chitietgiohang where magiohang='${req.params.makh}';`
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });

        }
        else {
          console.log(data);
          sql = `delete from giohang where makh='${req.params.makh}';`
          con.query(sql, (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              sql = `delete from khachhang where makh='${req.params.makh}';`
              con.query(sql, (err, data) => {
                if (err) {
                  console.log(err);
                  con.release();
                  res.status(204).json({ error: err, access: 0 });

                }
                else {
                  console.log(data);
                  con.release();
                  res.status(200).json({ access: 1 })
                };
              })
            };
          })
        };

      });
      // delete khachhang


    });
  }, //Xoa tai khoan se xoa ca gio hang, chi tiet gio hang
  InsertCTGioHang: (req, res) => {
    let { masp, soluong, magiohang } = req.body;
    let sql = `Insert into chitietgiohang (magiohang,masp,soluong) values('${magiohang}','${masp}',${soluong});`;
    QueryData(req, res, sql);
  },
  UpdateCTGioHang: (req, res) => {
    let { masp, soluong, machitietgiohang, magiohang } = req.body;
    let sql = `UPDATE chitietgiohang SET masp= '${masp}',soluong=${soluong} WHERE machitietgiohang=${machitietgiohang} and magiohang='${magiohang}';`
    QueryData(req, res, sql);
  },
  DeleteCTGioHang: (req, res) => {
    let { magiohang, machitietgiohang } = req.params;
    let sql = `delete from chitietgiohang where magiohang='${magiohang}' and machitietgiohang=${machitietgiohang};`;
    QueryData(req, res, sql);

  },
  GetAllCTGioHang: (req, res) => {
    csql = `Select machitietgiohang,chitietgiohang.masp,chitietgiohang.soluong,tensp,giaban from chitietgiohang,giohang,khachhang,sanpham where giohang.magiohang='${req.params.magiohang}' and giohang.magiohang = chitietgiohang.magiohang and khachhang.makh = giohang.makh and chitietgiohang.masp = sanpham.masp;`;
    GetData(req, res, csql);
  },
  GetCTGioHang:(req,res)=>{
    csql = `Select machitietgiohang,chitietgiohang.masp,chitietgiohang.soluong,tensp,giaban from chitietgiohang,giohang,khachhang,sanpham where machitietgiohang=${req.params.machitietgiohang} and giohang.magiohang = chitietgiohang.magiohang and khachhang.makh = giohang.makh and chitietgiohang.masp = sanpham.masp;`;
    GetData(req, res, csql);
  },

  // CAC API VIET CHO Khach hang
  GetAllHD: (req, res) => {
    csql = `Select * from hoadon;`
    GetData(req, res, csql);
  },
  GetHD: (req, res) => {
    csql = `Select * from hoadon where mahoadon = '${req.params.mahoadon}';`
    GetData(req, res, csql);
  },
  GetHDKH: (req, res) => {
    csql = `Select * from hoadon where makh = '${req.params.makh}';`
    GetData(req, res, csql);
  },
  GetCTHD: (req, res) => {
    csql = `select machitiethoadon,hoadon.mahoadon,tensp,chitiethoadon.masp,chitiethoadon.soluong,chitiethoadon.dongia from hoadon,chitiethoadon,sanpham where machitiethoadon=${req.params.machitiethoadon} and hoadon.mahoadon = chitiethoadon.mahoadon and sanpham.masp = chitiethoadon.masp;`;
    GetData(req, res, csql);
  },
  GetAllCTHD: (req, res) => {
    csql = `select machitiethoadon,hoadon.mahoadon,tensp,chitiethoadon.masp,chitiethoadon.soluong,chitiethoadon.dongia from hoadon,chitiethoadon,sanpham where chitiethoadon.mahoadon='${req.params.mahoadon}' and hoadon.mahoadon = chitiethoadon.mahoadon and sanpham.masp = chitiethoadon.masp;`
    GetData(req, res, csql);
  },
  InsertHoaDonAuto: (req, res) => {
    let { diachi, ghichu, machinhanh, makh, masukien, ngaytao, tenhoadon, trangthai, sdt, mahoadon,values } = req.body;
    pool.getConnection((err, con) => {
      // Tạo 1 tài khoản người dùng -> Tạo luôn giỏ hàng với cùng mã kh
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `delete from chitietgiohang where magiohang='${makh}';`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });
        }
        else {
          console.log(data);
          sql = `Insert into hoadon (diachi,ghichu,machinhanh,makh,masukien,ngaytao,tenhoadon,trangthai,sdt,mahoadon,tongtien) values('${diachi}','${ghichu}','${machinhanh}','${makh}','${masukien}','${ngaytao}','${tenhoadon}','${trangthai}','${sdt}','${mahoadon}',0);`;

          con.query(sql, (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              let sql = "INSERT INTO chitiethoadon (masp, soluong, mahoadon, dongia) VALUES ?";
              let val = values
              // var values = [
              //   ['John', 71,8,66],
              //   ['Peter', 2, 4,5], 
              // ] => Insert multi voi gia tri values dang mang nhu tren => Client se phai truyen gia tri theo nhu dung mau => https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
              con.query(sql, [val], (err, data) => {
                if (err) {
                  console.log(err);
                  con.release();
                  res.status(204).json({ error: err, access: 0 });

                }
                else {
                  console.log(data);
                  con.release();
                  res.status(200).json({ access: 1 })
                };

              })
            };
          });
        }
      })
      // insert gio hang


    });
  }, //Khi nguoi dung dat hang va yeu cau he thong tu dong tao hoa don va cac chi tiet hoa don(NV cx co the tao hoadon mot cach thu cong) -> he thong se phai tu dong xoa het cac thong tin trong chi tiet gio hang cua khach hang
  InsertHoaDon: (req, res) => {
    let { diachi, ghichu, machinhanh, makh, masukien, ngaytao, tenhoadon, trangthai, sdt, mahoadon} = req.body;
    let sql = `Insert into hoadon (diachi,ghichu,machinhanh,makh,masukien,ngaytao,tenhoadon,trangthai,sdt,mahoadon,tongtien) values('${diachi}','${ghichu}','${machinhanh}','${makh}','${masukien}','${ngaytao}','${tenhoadon}','${trangthai}','${sdt}','${mahoadon}',0);`;
    QueryData(req, res, sql);
  },
  UpdateHoaDon: (req, res) => {
    let { diachi, ghichu, machinhanh, makh, masukien, ngaytao, tenhoadon, trangthai, sdt, mahoadon} = req.body;
    let sql = `UPDATE hoadon SET diachi= '${diachi}',ghichu='${ghichu}',machinhanh='${machinhanh}',makh='${makh}',masukien='${masukien}',ngaytao='${ngaytao}',tenhoadon='${tenhoadon}',trangthai='${trangthai}',sdt='${sdt}' WHERE mahoadon='${mahoadon}';`
    QueryData(req, res, sql);
  },
  DeleteHoaDon: (req, res) => {
    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `DELETE from chitiethoadon where mahoadon='${req.params.mahoadon}';`
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });

        }
        else {
          console.log(data);
          sql = `delete from hoadon where mahoadon='${req.params.mahoadon}';`
          con.query(sql, (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });
            }
            else {
              console.log(data);
              con.release();
              res.status(200).json({ access: 1 })
            };
          })
        };

      });
      // delete khachhang


    });

  },

  InsertCTHD: (req, res) => {
    let { masp, soluong, mahoadon, dongia } = req.body;
    let sql = `Insert into chitiethoadon (masp, soluong, mahoadon, dongia) values('${masp}',${soluong},'${mahoadon}',${dongia});`;
    QueryData(req, res, sql);
  },
  UpdateCTHD: (req, res) => {
    let { masp, soluong, mahoadon, dongia, machitiethoadon } = req.body;
    let sql = `UPDATE chitiethoadon SET masp= '${masp}',soluong=${soluong},dongia=${dongia} WHERE machitiethoadon=${machitiethoadon} and mahoadon='${mahoadon}';`
    QueryData(req, res, sql);
  },
  DeleteCTHD: (req, res) => {
    let { mahoadon, machitiethoadon } = req.params;
    let sql = `delete from chitiethoadon where mahoadon='${mahoadon}' and machitiethoadon=${machitiethoadon};`;
    QueryData(req, res, sql);
  },

  GetAllPhieuTraHang: (req, res) => {
    csql = `Select * from phieutrahang;`
    GetData(req, res,csql)
  },
  GetPhieuTraHang: (req, res) => {
    csql = `Select * from phieutrahang where maphieutrahang = '${req.params.maphieutrahang}';`
    GetData(req, res, csql);
  },
  UpdatePhieuTraHang: (req, res) => {  
    let {maphieutrahang,mahoadon,ngaytra} = req.body;
    let sql = `UPDATE phieutrahang SET mahoadon='${mahoadon}',ngaytra='${ngaytra}' WHERE maphieutrahang='${maphieutrahang}';`
    QueryData(req, res, sql);
  },
  DeletePhieuTraHang: (req, res) => {
    let sql = `delete from phieutrahang where maphieutrahang='${req.params.maphieutrahang}';`
    QueryData(req, res, sql);
  },
  InsertPhieuTraHang: (req, res) => {
    let {maphieutrahang,mahoadon,ngaytra} = req.body;
    let sql = `Insert into phieutrahang(maphieutrahang,mahoadon,ngaytra,tongtien) values ('${maphieutrahang}','${mahoadon}','${ngaytra}',0)`;
    QueryData(req, res, sql);
  },

  InsertPhieuTraHangAuto: (req, res) => {
    let {maphieutrahang,mahoadon,ngaytra,values} = req.body;
    pool.getConnection((err, con) => {
      // Tao phieu tra hang auto tao them cac chi tiet phieu tra hang
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `Insert into phieutrahang(maphieutrahang,mahoadon,ngaytra,tongtien) values ('${maphieutrahang}','${mahoadon}','${ngaytra}',0)`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });
        }
        else {
          console.log(data);
          // create table chitietsp(dongia float,soluong float, machitietsp int primary key not null auto_increment,mahh varchar(255), constraint fk_chitietsp_hanghoa foreign key (mahh) references hanghoa(mahh),masp varchar(255), constraint fk_chitietsp_sp foreign key (masp) references sanpham(masp));

          let sql = "INSERT INTO chitietphieutrahang (maphieutrahang,masp,soluong,dongia) VALUES ?";
          let val = values
          // var values = [
          //   ['John', 71,8,66],
          //   ['Peter', 2, 4,5], 
          // ] => Insert multi voi gia tri values dang mang nhu tren => Client se phai truyen gia tri theo nhu dung mau => https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
          con.query(sql, [val], (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              con.release();
              res.status(200).json({ access: 1 })
            };

          })
        };
      })
      // insert phieu xuat


    });
  },
  GetCTPhieuTraHang: (req, res) => {
    csql = `Select * from chitietphieutrahang where maphieutrahangchitiet =${req.params.maphieutrahangchitiet};`
    GetData(req, res, csql);
  },
  GetAllCTPhieuTraHang: (req, res) => {
    csql = `Select * from chitietphieutrahang where maphieutrahang ='${req.params.maphieutrahang}';`
    GetData(req, res, csql);
  },
  UpdateCTPhieuTraHang: (req, res) => {
    let {maphieutrahang,masp,soluong,dongia,maphieutrahangchitiet} = req.body;
    let sql = `UPDATE chitietphieutrahang SET maphieutrahang= '${maphieutrahang}',masp='${masp}',soluong=${soluong},dongia=${dongia} WHERE maphieutrahangchitiet=${maphieutrahangchitiet};`
    QueryData(req, res, sql);
  },
  DeleteCTPhieuTraHang: (req, res) => {
    let sql = `delete from chitietphieutrahang where maphieutrahangchitiet=${req.params.maphieutrahangchitiet};`
    QueryData(req, res, sql);
  },
  InsertCTPhieuTraHang: (req, res) => {
    let {soluong,maphieutrahang,masp,dongia} = req.body;
    let sql = `INSERT INTO chitietphieutrahang (maphieutrahang,masp,soluong,dongia) VALUES ('${maphieutrahang}','${masp}',${soluong},${dongia})`;
    QueryData(req, res, sql);
  },


  GetAllPhieuNhap: (req, res) => {
    csql = `Select * from phieunhap;`
    GetData(req, res, csql);
  },
  GetPhieuNhap: (req, res) => {
    csql = `Select * from phieunhap where maphieunhap = '${req.params.maphieunhap}';`
    GetData(req, res, csql);
  },
  UpdatePhieuNhap: (req, res) => {
    let { maphieunhap, makho, manv, ngaynhap, tenphieunhap } = req.body;
    let sql = `UPDATE phieunhap SET makho= '${makho}',manv='${manv}',ngaynhap='${ngaynhap}',tenphieunhap='${tenphieunhap}' WHERE maphieunhap='${maphieunhap}';`
    QueryData(req, res, sql);
  },
  DeletePhieuNhap: (req, res) => {
    let sql = `delete from phieunhap where maphieunhap='${req.params.maphieunhap}';`
    QueryData(req, res, sql);
  },
  InsertPhieuNhap: (req, res) => {
    let { maphieunhap, makho, manv, ngaynhap, tenphieunhap } = req.body;
    let sql = `Insert into phieunhap(maphieunhap,makho,manv,ngaynhap,tenphieunhap,tongtien) values ('${maphieunhap}','${makho}','${manv}','${ngaynhap}','${tenphieunhap}',0)`;
    QueryData(req, res, sql);
  },

  InsertPhieuNhapAuto: (req, res) => {
    let { maphieunhap, makho, manv, ngaynhap, tenphieunhap,  values } = req.body;
    pool.getConnection((err, con) => {
      // Tao phieu nhap auto tao cac chi tiet phieu nhap
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `Insert into phieunhap(maphieunhap,makho,manv,ngaynhap,tenphieunhap,tongtien) values ('${maphieunhap}','${makho}','${manv}','${ngaynhap}','${tenphieunhap}',0)`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });
        }
        else {
          console.log(data);
          let sql = "INSERT INTO chitietphieunhap (mahh,mancc,soluong,maphieunhap,dongia) VALUES ?";
          let val = values
          // var values = [
          //   ['John', 71,8,66],
          //   ['Peter', 2, 4,5], 
          // ] => Insert multi voi gia tri values dang mang nhu tren => Client se phai truyen gia tri theo nhu dung mau => https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
          con.query(sql, [val], (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              con.release();
              res.status(200).json({ access: 1 })
            };

          })
        };
      })
      // insert phieu nhap


    });
  },
  GetCTPhieuNhap: (req, res) => {
    csql = `Select * from chitietphieunhap where machitietphieunhap =${req.params.machitietphieunhap};`
    GetData(req, res, csql);
  },
  GetAllCTPhieuNhap: (req, res) => {
    csql = `Select * from chitietphieunhap where maphieunhap = '${req.params.maphieunhap}';`
    GetData(req, res, csql);
  },
  UpdateCTPhieuNhap: (req, res) => {
    let { mahh,mancc,soluong,maphieunhap,dongia,machitietphieunhap} = req.body;
    let sql = `UPDATE chitietphieunhap SET mahh= '${mahh}',mancc='${mancc}',soluong=${soluong},maphieunhap='${maphieunhap}',dongia=${dongia} WHERE machitietphieunhap=${machitietphieunhap};`
    QueryData(req, res, sql);
  },
  DeleteCTPhieuNhap: (req, res) => {
    let sql = `delete from chitietphieunhap where machitietphieunhap=${req.params.machitietphieunhap};`
    QueryData(req, res, sql);
  },
  InsertCTPhieuNhap: (req, res) => {
    let {mahh,mancc,soluong,maphieunhap,dongia} = req.body;
    let sql = `Insert into chitietphieunhap(mahh,mancc,soluong,maphieunhap,dongia) values ('${mahh}','${mancc}',${soluong},'${maphieunhap}',${dongia})`;
    QueryData(req, res, sql);
  },
  

  GetAllPhieuXuat: (req, res) => {
    csql = `Select * from phieuxuat;`
    GetData(req, res, csql);
  },
  GetPhieuXuat: (req, res) => {
    csql = `Select * from phieuxuat where maphieuxuat = '${req.params.maphieuxuat}';`
    GetData(req, res, csql);
  },
  UpdatePhieuXuat: (req, res) => {  
    let { maphieuxuat, machinhanh, manv, ngayxuat, tenphieuxuat, } = req.body;
    let sql = `UPDATE phieuxuat SET machinhanh= '${machinhanh}',manv='${manv}',ngayxuat='${ngayxuat}',tenphieuxuat='${tenphieuxuat}' WHERE maphieuxuat='${maphieuxuat}';`
    QueryData(req, res, sql);
  },
  DeletePhieuXuat: (req, res) => {
    let sql = `delete from phieuxuat where maphieuxuat='${req.params.maphieuxuat}';`
    QueryData(req, res, sql);
  },
  InsertPhieuXuat: (req, res) => {
    let {maphieuxuat, machinhanh, manv, ngayxuat, tenphieuxuat} = req.body;
    let sql = `Insert into phieuxuat(maphieuxuat, machinhanh, manv, ngayxuat, tenphieuxuat, tongtien) values ('${maphieuxuat}','${machinhanh}','${manv}','${ngayxuat}','${tenphieuxuat}',0)`;
    QueryData(req, res, sql);
  },

  InsertPhieuXuatAuto: (req, res) => {
    let {maphieuxuat, machinhanh, manv, ngayxuat, tenphieuxuat, values } = req.body;
    pool.getConnection((err, con) => {
      // Tao phieu nhap auto tao cac chi tiet phieu nhap
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `Insert into phieuxuat(maphieuxuat, machinhanh, manv, ngayxuat, tenphieuxuat, tongtien) values ('${maphieuxuat}','${machinhanh}','${manv}','${ngayxuat}','${tenphieuxuat}',0)`;
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });
        }
        else {
          console.log(data);
          let sql = "INSERT INTO chitietphieuxuat (mahh,makho,soluong,maphieuxuat,dongia) VALUES ?";
          let val = values
          // var values = [
          //   ['John', 71,8,66],
          //   ['Peter', 2, 4,5], 
          // ] => Insert multi voi gia tri values dang mang nhu tren => Client se phai truyen gia tri theo nhu dung mau => https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp
          con.query(sql, [val], (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              con.release();
              res.status(200).json({ access: 1 })
            };

          })
        };
      })
      // insert phieu xuat


    });
  },
  GetCTPhieuXuat: (req, res) => {
    csql = `Select * from chitietphieuxuat where machitietphieuxuat =${req.params.machitietphieuxuat};`
    GetData(req, res, csql);
  },
  GetAllCTPhieuXuat: (req, res) => {
    csql = `Select * from chitietphieuxuat where maphieuxuat ='${req.params.maphieuxuat}';`
    GetData(req, res, csql);
  },
  UpdateCTPhieuXuat: (req, res) => {
    let {mahh,makho,soluong,maphieuxuat,dongia,machitietphieuxuat} = req.body;
    let sql = `UPDATE chitietphieuxuat SET mahh= '${mahh}',makho='${makho}',soluong=${soluong},maphieuxuat='${maphieuxuat}',dongia=${dongia} WHERE machitietphieuxuat=${machitietphieuxuat};`
    QueryData(req, res, sql);
  },
  DeleteCTPhieuXuat: (req, res) => {
    let sql = `delete from chitietphieuxuat where machitietphieuxuat=${req.params.machitietphieuxuat};`
    QueryData(req, res, sql);
  },
  InsertCTPhieuXuat: (req, res) => {
    let {mahh,makho,soluong,maphieuxuat,dongia} = req.body;
    let sql = `Insert into chitietphieuxuat(mahh,makho,soluong,maphieuxuat,dongia) values ('${mahh}','${makho}',${soluong},'${maphieuxuat}',${dongia})`;
    QueryData(req, res, sql);
  },


  GetAllPhieuChiTien: (req, res) => {
    csql = `Select * from phieuchitien;`
    GetData(req, res, csql);
  },
  GetPhieuChiTien: (req, res) => {
    csql = `Select * from phieuchitien where maphieuchitien = '${req.params.maphieuchitien}';`
    GetData(req, res, csql);
  },
  UpdatePhieuChiTien: (req, res) => {
    let { maphieuchitien,manv,ngaychi,noidung,sotienchi,machinhanh} = req.body;
    let sql = `UPDATE phieuchitien SET manv= '${manv}',ngaychi='${ngaychi}',noidung='${noidung}',sotienchi=${sotienchi},machinhanh='${machinhanh}' WHERE maphieuchitien='${maphieuchitien}';`
    QueryData(req, res, sql);
  },
  DeletePhieuChiTien: (req, res) => {
    let sql = `delete from phieuchitien where maphieuchitien='${req.params.maphieuchitien}';`
    QueryData(req, res, sql);
  },
  InsertPhieuChiTien: (req, res) => {
    let {maphieuchitien,manv,ngaychi,noidung,sotienchi,machinhanh} = req.body;
    let sql = `Insert into phieuchitien(maphieuchitien,manv,ngaychi,noidung,sotienchi,machinhanh) values ('${maphieuchitien}','${manv}','${ngaychi}','${noidung}',${sotienchi},'${machinhanh}')`;
    QueryData(req, res, sql);
  },
  
  GetAllPhieuNhanTien: (req, res) => {
    csql = `Select * from phieunhantien;`
    GetData(req, res, csql);
  },
  GetPhieuNhanTien: (req, res) => {
    csql = `Select * from phieunhantien where maphieunhantien = '${req.params.maphieunhantien}';`
    GetData(req, res, csql);
  },
  UpdatePhieuNhanTien: (req, res) => {
  

    let { maphieunhantien,manv,ngaynhan,noidung,sotiennhan,machinhanh} = req.body;
    let sql = `UPDATE phieunhantien SET manv= '${manv}',ngaynhan='${ngaynhan}',noidung='${noidung}',sotiennhan=${sotiennhan},machinhanh='${machinhanh}' WHERE maphieunhantien='${maphieunhantien}';`
    QueryData(req, res, sql);
  },
  DeletePhieuNhanTien: (req, res) => {
    let sql = `delete from phieunhantien where maphieunhantien='${req.params.maphieunhantien}';`
    QueryData(req, res, sql);
  },
  InsertPhieuNhanTien: (req, res) => {
    let {maphieunhantien,manv,ngaynhan,noidung,sotiennhan,machinhanh} = req.body;
    let sql = `Insert into phieunhantien(maphieunhantien,manv,ngaynhan,noidung,sotiennhan,machinhanh) values ('${maphieunhantien}','${manv}','${ngaynhan}','${noidung}',${sotiennhan},'${machinhanh}')`;
    QueryData(req, res, sql);
  },

  
  //CAC API VOI he thong, HOA DON,phieu ...
  GetAllInfoNV: (req, res) => {
    csql = `Select * from nhanvien;`
    GetData(req, res, csql);
  },
  GetInfoNV: (req, res) => {
    csql = `Select * from nhanvien where manv = '${req.params.manv}';`
    GetData(req, res, csql);
  },
  UpdateInfoNV: (req, res) => {
    let { anhnv, diachi, email, manv, sdt, tennv, matkhau, machucvu, machinhanh, ngaysinh, cmnd } = req.body;
    let sql = `UPDATE nhanvien SET anhnv= '${anhnv}',machucvu=${machucvu},machinhanh='${machinhanh}',diachi='${diachi}',email='${email}',sdt='${sdt}', tennv='${tennv}', matkhau='${matkhau}',ngaysinh='${ngaysinh}',cmnd=${cmnd} WHERE manv='${manv}';`
    QueryData(req, res, sql);
  },
  InsertNV: (req, res) => {
    let { anhnv, diachi, email, manv, sdt, tennv, matkhau, machucvu, machinhanh, ngaysinh, cmnd, hesoluong, luongcoban } = req.body;
    let sql = `Insert into nhanvien(anhnv, diachi, email, manv, sdt, tennv, matkhau, machucvu,machinhanh, ngaysinh, cmnd) values ('${anhnv}', '${diachi}', '${email}', '${manv}', '${sdt}', '${tennv}', '${matkhau}', ${machucvu}, '${machinhanh}', '${ngaysinh}', ${cmnd});`;
    pool.getConnection((err, con) => {
      // Tạo 1 tài khoản nhan vien -> Tạo luôn bang luong va bang diem danh nhan vien
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }

      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });

        }
        else {
          console.log(data);
          sql = `insert into luong(manv,maluong,hesoluong,luongcoban) values ('${manv}','${manv}',${hesoluong},${luongcoban});`;
          con.query(sql, (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });
            }
            else {
              console.log(data);
              res.status(200).json({ access: 1 });
            };

          })  //  Insert luong
        };
      });
      // insert nhanvien



    });
  }, // Khi tao tai khoan nv => He thong se tao luon bang luong cho nhan vien
  DeleteNV: (req, res) => {
    pool.getConnection((err, con) => {
      if (err) {
        console.log(err);
        con.release();
        res.status(204).json({ error: err, access: 0 });
      }
      let sql = `DELETE from luong where manv='${req.params.manv}';`
      con.query(sql, (err, data) => {
        if (err) {
          console.log(err);
          con.release();
          res.status(204).json({ error: err, access: 0 });

        }
        else {
          console.log(data);
          sql = `delete from diemdanhnv where manv='${req.params.manv}';`
          con.query(sql, (err, data) => {
            if (err) {
              console.log(err);
              con.release();
              res.status(204).json({ error: err, access: 0 });

            }
            else {
              console.log(data);
              sql = `delete from nhanvien where manv='${req.params.manv}';`
              con.query(sql, (err, data) => {
                if (err) {
                  console.log(err);
                  con.release();
                  res.status(204).json({ error: err, access: 0 });
                }
                else {
                  console.log(data);
                  con.release();
                  res.status(200).json({ access: 1 })
                };
              })
            };
          })
        };

      });
      // delete khachhang


    });
  }, //Xoa tai khoan nv => Xoa het cac bang lien quan nhu bang luong va bang diem danh nv

  GetAllNCC: (req, res) => {
    csql = `Select * from nhacc;`
    GetData(req, res, csql);
  },
  GetNCC: (req, res) => {
    csql = `Select * from nhacc where mancc = '${req.params.mancc}';`
    GetData(req, res, csql);
  },
  UpdateNCC: (req, res) => {
    let { ghichu, tenncc, mancc } = req.body;
    let sql = `UPDATE nhacc SET ghichu= '${ghichu}',tenncc='${tenncc}' WHERE mancc='${mancc}';`
    QueryData(req, res, sql);
  },
  DeleteNCC: (req, res) => {
    let sql = `delete from nhacc where mancc='${req.params.mancc}';`
    QueryData(req, res, sql);
  },
  InsertNCC: (req, res) => {
    let { ghichu, tenncc, mancc } = req.body;
    let sql = `Insert into nhacc(mancc,tenncc,ghichu) values ('${mancc}','${tenncc}','${ghichu}')`;
    QueryData(req, res, sql);
  },

  GetAllSK: (req, res) => {
    csql = `Select * from sukien;`
    GetData(req, res, csql);
  },
  GetSK: (req, res) => {
    csql = `Select * from sukien where masukien = '${req.params.masukien}';`
    GetData(req, res, csql);
  },
  UpdateSK: (req, res) => {

    let { chietkhau, tungay, denngay, masukien, noidung, tensukien } = req.body;
    let sql = `UPDATE sukien SET chietkhau= ${chietkhau},tungay='${tungay}',denngay='${denngay}',noidung='${noidung}',tensukien='${tensukien}' WHERE masukien='${masukien}';`
    QueryData(req, res, sql);
  },
  DeleteSK: (req, res) => {
    let sql = `delete from sukien where masukien='${req.params.masukien}';`
    QueryData(req, res, sql);
  },
  InsertSK: (req, res) => {
    let { chietkhau, tungay, denngay, masukien, noidung, tensukien } = req.body;
    let sql = `Insert into sukien(chietkhau,tungay,denngay,masukien,noidung,tensukien ) values (${chietkhau},'${tungay}','${denngay}','${masukien}','${noidung}','${tensukien}')`;
    QueryData(req, res, sql);
  },

  GetAllChinhanh: (req, res) => {
    csql = `Select * from chinhanh;`
    GetData(req, res, csql);
  },
  GetChinanh: (req, res) => {
    csql = `Select * from chinhanh where machinhanh = '${req.params.machinhanh}';`
    GetData(req, res, csql);
  },
  UpdateChinhanh: (req, res) => {

    let { machinhanh, sdt, tenchinhanh, gmail, diachi} = req.body;
    let sql = `UPDATE chinhanh SET sdt= '${sdt}',tenchinhanh='${tenchinhanh}',gmail='${gmail}',diachi='${diachi}' WHERE machinhanh='${machinhanh}';`
    QueryData(req, res, sql);
  },
  DeleteChinhanh: (req, res) => {
    let sql = `delete from chinhanh where machinhanh='${req.params.machinhanh}';`
    QueryData(req, res, sql);
  },
  InsertChinhanh: (req, res) => {
    let { machinhanh, sdt, tenchinhanh, gmail, diachi} = req.body;
    let sql = `Insert into chinhanh(machinhanh,sdt,tenchinhanh,gmail,diachi,nganquy) values ('${machinhanh}','${sdt}','${tenchinhanh}','${gmail}','${diachi}',0)`;
    QueryData(req, res, sql);
  },

  GetAllKho: (req, res) => {
    csql = `Select * from kho;`
    GetData(req, res, csql);
  },
  GetKho: (req, res) => {
    csql = `Select * from kho where makho = '${req.params.makho}';`
    GetData(req, res, csql);
  },
  UpdateKho: (req, res) => {

    let { makho, mota, tenkho } = req.body;
    let sql = `UPDATE kho SET mota= '${mota}',tenkho='${tenkho}' WHERE makho='${makho}';`
    QueryData(req, res, sql);
  },
  DeleteKho: (req, res) => {
    let sql = `delete from kho where makho='${req.params.makho}';`
    QueryData(req, res, sql);
  },
  InsertKho: (req, res) => {
    let { makho, mota, tenkho } = req.body;
    let sql = `Insert into kho(makho,mota,tenkho) values ('${makho}','${mota}','${tenkho}')`;
    QueryData(req, res, sql);
  },

  GetAllDDNV: (req, res) => {
    csql = `Select * from diemdanhnv;`
    GetData(req, res, csql);
  },
  GetDDNV: (req, res) => {
    csql = `Select * from diemdanhnv where madiemdanhnv = '${req.params.madiemdanhnv}';`
    GetData(req, res, csql);
  },
  UpdateDDNV: (req, res) => {
    let { madiemdanhnv, manv, ngaydimuon, ngaylam, ngaynghi } = req.body;
    let sql = `UPDATE diemdanhnv SET manv= '${manv}',ngaydimuon=${ngaydimuon},ngaylam=${ngaylam},ngaynghi=${ngaynghi} WHERE madiemdanhnv='${madiemdanhnv}';`
    QueryData(req, res, sql);
  },
  DeleteDDNV: (req, res) => {
    let sql = `delete from diemdanhnv where madiemdanhnv='${req.params.madiemdanhnv}';`
    QueryData(req, res, sql);
  },
  InsertDDNV: (req, res) => {
    let { madiemdanhnv, manv, ngaydimuon, ngaylam, ngaynghi } = req.body;
    let sql = `Insert into diemdanhnv (madiemdanhnv, manv, ngaydimuon,ngaylam,ngaynghi) values ('${madiemdanhnv}', '${manv}', ${ngaydimuon},${ngaylam},${ngaynghi})`;
    QueryData(req, res, sql);
  },

  GetAllluong: (req, res) => {
    csql = `Select * from luong;`
    GetData(req, res, csql);
  },
  Getluong: (req, res) => {
    csql = `Select * from luong where maluong = '${req.params.maluong}';`
    GetData(req, res, csql);
  },
  Updateluong: (req, res) => {
    let { maluong, manv, luongcoban, hesoluong } = req.body;
    let sql = `UPDATE luong SET manv= '${manv}',luongcoban=${luongcoban},hesoluong=${hesoluong} WHERE maluong='${maluong}';`
    QueryData(req, res, sql);
  },


  // CAC API VOI NHAN VIEN (CAP NHAT TT KH, LAP HOA DON => DONE ABOVE)
};
