// import { getSpaceUntilMaxLength } from "@testing-library/user-event/dist/utils";
import db from "../models/index";
// const { Op } = require("sequelize");
// import bcrypt, { hash } from "bcryptjs"; //hashpassword

// const salt = bcrypt.genSaltSync(10);

let handleDangnhap = (username, password) => {
  return new Promise(async (resolve, reject) => {
    try {
      let userdata = {};
      if (username) {
        //user ton tai >>> true
        //compare password
        let khachhang = await db.khachhangs.findOne({
          //get duoc alldata user
          attributes: ["Taikhoan_Kh", "Matkhau_KH"], //get data can thiet
          where: { Taikhoan_Kh: username },
          raw: true,
        });
        if (khachhang) {
          if (password === khachhang.Matkhau_KH) {
            userdata.errCode = 0;
            userdata.message = "ok";
          } else {
            userdata.errCode = 1;
            userdata.message = "sai password";
          }
        } else {
          userdata.errCode = 2;
          userdata.message = "user khong ton tai";
        }
        resolve(userdata);
      } else {
        //return err
        reject({
          errCode: 3,
          errMessage: `Email not found. Try again`,
        });
        // userdata.errCode = 1;
        // userdata.errMessage = `Email not found. Try again`;
      }
      // resolve(userdata);
    } catch (e) {
      reject(e);
    }
  });
};

let handleDangky = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_KH ||
        !data.Ngaysinh ||
        !data.gt_KH ||
        !data.sdt_KH ||
        !data.cccd_KH ||
        !data.email_KH ||
        !data.diachi_KH ||
        !data.taikhoan_KH ||
        !data.matkhau_KH
      ) {
        resovle({
          errCode: 101,
          errMessage: "Missing parameter",
        });
      } else {
        let khachhang = await db.khachhangs.findOne({
          where: {
            Hten_KH: data.hten_KH,
            Email_KH: data.email_KH,
            Sdt_KH: data.sdt_KH,
          },
        });

        if (khachhang) {
          resovle({
            errCode: 1,
            errMessage: "Người dùng đã có tài khoản",
          });
        } else {
          await db.khachhangs.create({
            id_KH: 5,
            Hten_KH: data.hten_KH,
            Sdt_KH: data.sdt_KH,
            Email_KH: data.email_KH,
            Ngaysinh_KH: data.Ngaysinh,
            Diachi_KH: data.diachi_KH,
            Gioitinh_KH: data.gt_KH,
            Cccd_KH: data.cccd_KH,
            Taikhoan_KH: data.taikhoan_KH,
            Matkhau_KH: data.matkhau_KH,
          });

          resovle({
            errCode: 0,
            errMessage: "Tạo tài khoản thành công",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Tạo và lưu",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleDatve = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_KH ||
        !data.httt ||
        !data.tongtien ||
        !data.soluongghe ||
        !data.ngaymuave ||
        !data.id_KH ||
        !data.id_ghe ||
        !data.id_suatchieu ||
        !data.id_rap ||
        !data.id_cumrap ||
        !data.id_KM ||
        !data.id_NV ||
        !data.id_chieu ||
        !data.id_doan
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {
        // let n_id
        await db.ves.create({
          // id_KH: 5,
          Hten_KH: data.hten_KH,
          HTTT: data.httt,
          Tongtien: data.tongtien,
          SLghe: data.soluongghe,
          Ngaymuave: data.ngaymuave,
          id_KH: data.id_KH,
          id_chieu: data.id_chieu,
          id_suatchieu: data.id_suatchieu,
          id_rap: data.id_rap,
          id_cumrap: data.id_cumrap,
          id_KM: data.id_KM,
          id_NV: data.id_NV,
          id_DA: data.id_doan
        });

        // let query = "SELECT MAX(salary) AS max_salary FROM publishers";
        // let thongtinve = db.ves.findAll({
        //   attributes: ['id']

        //  });
        //  console.log("ádas", db.ves.findAll({
        //   attributes: ['id']

        //  }))
        //  console.log("id",id)
        let n_id = await db.ves.max('id'); // 40

        // if (thongtinve) {
        for (let index = 0; index < data.soluongghe; index++) {

          await db.chitietves.create({
            id_ve: n_id + 1,
            id_ghe: data.id_ghe[index]
          });
        }
        // }

        resovle({
          errCode: 0,
          errMessage: "Đặt vé thành công",
        });
      }
      // resovle({
      //   errCode: thongtinve,
      //   errMessage: "Đặt vé thành công",
      // });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTchitietve = (id_ve) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietve = "";
      if (id_ve === "ALL") {
        chitietve = await db.chitietves.findAll({
        });
      }

      if (id_ve && id_ve !== "ALL") {
        chitietve = await db.chitietves.findAll({
          where: { id_Ve: id_ve },
        });
      }
      resolve(chitietve);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTGhe = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ghe = "";
      if (key === "ALL") {
        ghe = await db.ghes.findAll({
        });
      }

      if (key && key !== "ALL") {
        ghe = await db.ghes.findAll({
          where: { id: key },
        });
      }
      resolve(ghe);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTGhe_idrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ghe = "";
      if (key === "ALL") {
        ghe = await db.ghes.findAll({
        });
      }

      if (key && key !== "ALL") {
        ghe = await db.ghes.findAll({
          where: { id_rap: key },
        });
      }
      resolve(ghe);
    } catch (e) {
      reject(e);
    }
  });
};



let handleTTChieu = (ngaychieu, id_phim, id_rap) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ttchieu = "";
      if (ngaychieu && id_phim && id_rap) {
        if (ngaychieu === 'ALL' && id_phim === 'ALL' && id_rap === 'ALL') {
          ttchieu = await db.chieus.findAll({
          });
        }
        else {
          ttchieu = await db.chieus.findAll({
            where: { ngaychieu: ngaychieu, id_phim: id_phim, id_rap: id_rap },
          });
        }

      }
      resolve(ttchieu);
    } catch (e) {
      reject(e);
    }
  });
};


let handleTTDoan = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let doan = "";
      if (key === "ALL") {
        doan = await db.doans.findAll({
        });
      }

      if (key && key !== "ALL") {
        doan = await db.doans.findAll({
          where: { id: key },
        });
      }
      resolve(doan);
    } catch (e) {
      reject(e);
    }
  });
};
let handleTTPhim = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let phim = "";
      if (key === "ALL") {
        phim = await db.phims.findAll({
        });
      }

      if (key && key !== "ALL") {
        phim = await db.phims.findAll({
          where: { id: key },
        });
      }
      resolve(phim);
    } catch (e) {
      reject(e);
    }
  });
};



let handleTTKM = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let khuyenmai = "";
      if (key === "ALL") {
        khuyenmai = await db.khuyenmais.findAll({
        });
      }

      if (key && key !== "ALL") {
        khuyenmai = await db.khuyenmais.findAll({
          where: { id: key },
        });
      }
      resolve(khuyenmai);
    } catch (e) {
      reject(e);
    }
  });
};








let handleTest = (data) => {

  return new Promise(async (resovle, reject) => {

    try {
      if (
        !data.File ||
        !data.Filename ||
        !data.File_src
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.tests.create({
          image: data.File.path

        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin phim thành công",
          //   var storage = multer.diskStorage({
          //     destination: (req, file, callBack) => {
          //         callBack(null, './public/images/')     // './public/images/' directory name where save the file
          //     },
          //     filename: (req, file, callBack) => {
          //         callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
          //     }
          // })
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

// let handleThemTTGhe = (data) => {

//   return new Promise(async (resovle, reject) => {
//     try {
//       if (
//         !data.maGhe ||
//         !data.loaiGhe ||
//         !data.id_rap
//       ) {
//         resovle({
//           errCode: 1,
//           errMessage: "Missing parameter",
//         });
//       } else {
//         let ghe = await db.ghes.findOne({
//           //get duoc alldata user
//           attributes: ["email", "roleId", "firstName", "lastName", "password"], //get data can thiet
//           where: { maGhe: data.maGhe },
//           raw: true,
//         });
//         if (ghe) {
//           await db.ghes.create({
//             // id_KH: 5,
//             maGhe: data.maGhe,
//             loaiGhe: data.loaiGhe,
//             id_rap: data.id_rap
//           });
//         }

//         resovle({
//           errCode: 0,
//           errMessage: "Thêm thông tin phim thành công",
//         });
//       }
//       resovle({
//         errCode: 0,
//         errMessage: "Thêm thông tin phim thành công",
//       });
//       // }
//     } catch (e) {
//       reject(e);
//     }
//   });
// };


let handleTTCumrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let cumrap = "";
      if (key === "ALL") {
        cumrap = await db.qlcumraps.findAll({
        });
      }

      if (key && key !== "ALL") {
        cumrap = await db.qlcumraps.findAll({
          where: { id: key },
        });
      }
      resolve(cumrap);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTSuatchieu = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let suatchieu = "";
      if (key === "ALL") {
        suatchieu = await db.suatchieus.findAll({
        });
      }

      if (key && key !== "ALL") {
        suatchieu = await db.suatchieus.findAll({
          where: { id: key },
        });
      }
      resolve(suatchieu);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTRap_idcumrap = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rap = "";
      if (key === "ALL") {
        rap = await db.raps.findAll({
        });
      }

      if (key && key !== "ALL") {
        rap = await db.raps.findAll({
          where: { id_cumrap: key },
        });
      }
      resolve(rap);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTLoaiphim = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let loaiphim = "";
      if (id === "ALL") {
        loaiphim = await db.loaiphims.findAll({
        });
      }

      if (id && id !== "ALL") {
        loaiphim = await db.loaiphims.findAll({
          where: { id: id },
        });
      }
      resolve(loaiphim);
    } catch (e) {
      reject(e);
    }
  });
};

let handleLayTTCTLoaiphim_idP = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let chitietloaiphim = "";
      if (id === "ALL") {
        chitietloaiphim = await db.chitietloaiphims.findAll({
        });
      }

      if (id && id !== "ALL") {
        chitietloaiphim = await db.chitietloaiphims.findAll({
          where: { id_phim: id },
        });
      }
      resolve(chitietloaiphim);
    } catch (e) {
      reject(e);
    }
  });
};

let handleTTVe_idchieu = (id_chieu) => {
  return new Promise(async (resolve, reject) => {
    try {
      let ve = "";
      if (id_chieu === "ALL") {
        ve = await db.ves.findAll({
        });
      }

      if (id_chieu && id_chieu !== "ALL") {
        ve = await db.ves.findAll({
          where: { id_chieu: id_chieu },
        });
      }
      resolve(ve);
    } catch (e) {
      reject(e);
    }
  });
};

let handleThemTTCumrap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tentttt ||
        !data.diachi
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.qlcumraps.findOne({
          where: {
            ten_tttt: data.tentttt,
            diachi: data.diachi,
          },
        });
        if (!cumrap) {
          await db.qlcumraps.create({
            ten_tttt: data.tentttt,
            diachi: data.diachi,
          });
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin cụm rạp đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin cụm rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTCumrap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.id ||
        !data.tentttt ||
        !data.diachi
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.qlcumraps.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (cumrap) {
          cumrap.ten_tttt = data.tentttt;
          cumrap.diachi = data.diachi;
          await cumrap.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin cụm rạp mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin cụm rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};


let handleXoaTTCumrap = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let cumrap = await db.qlcumraps.findOne({
      where: { id: Id },
    });

    if (!cumrap) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy cụm rạp`,
      });
    }

    await db.qlcumraps.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin cụm rạp đã xóa",
    });
  });
};


let handleThemTTRap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenrap ||
        !data.id_cr ||
        !data.slg
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let cumrap = await db.raps.findOne({
          where: {
            ten_rap: data.tenrap,
            slghe: data.slg,
            id_cumrap: data.id_cr
          },
        });
        if (!cumrap) {
          await db.raps.create({
            ten_rap: data.tenrap,
            slghe: data.slg,
            id_cumrap: data.id_cr
          });
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin rạp đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTRap = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenrap ||
        !data.id_cr ||
        !data.id ||
        !data.slg
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let rap = await db.raps.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (rap) {
          rap.ten_rap = data.tenrap;
          rap.slghe = data.slg;
          rap.id_cumrap = data.id_cr;

          await rap.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin rạp mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin rạp mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTRap = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let rap = await db.raps.findOne({
      where: { id: Id },
    });

    if (!rap) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy rạp`,
      });
    }

    await db.raps.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin rạp đã xóa",
    });
  });
};


let handleThemTTGhe = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.maghe ||
        !data.loaighe ||
        !data.idr
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ghe = await db.ghes.findOne({
          where: {
            maGhe: data.maghe,
            loaiGhe: data.loaighe,
            id_rap: data.idr
          },
        });
        if (!ghe) {
          await db.ghes.create({
            maGhe: data.maghe,
            loaiGhe: data.loaighe,
            id_rap: data.idr
          });
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Thông tin ghế đã tồn tại",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin ghế mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTGhe = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.maghe ||
        !data.loaighe ||
        !data.idr ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ghe = await db.ghes.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (ghe) {
          ghe.maGhe = data.maghe;
          ghe.loaiGhe = data.loaighe;
          ghe.id_rap = data.idr;

          await ghe.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin ghế mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin ghế mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTGhe = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let ghe = await db.ghes.findOne({
      where: { id: Id },
    });

    if (!ghe) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy ghế`,
      });
    }

    await db.ghes.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin ghế đã xóa",
    });
  });
};


let handleThemTTPhim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Tenphim ||
        !data.Dieukien ||
        !data.Poster ||
        !data.Trailer ||
        !data.Dienvien ||
        !data.Ngonngu ||
        !data.Quocgia ||
        !data.Tomtat ||
        !data.Daodien ||
        !data.Thoiluong ||
        !data.Ngaychieu ||
        !data.Nsx ||
        !data.Trangthai
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.phims.create({
          // id_KH: 5,
          tenphim: data.Tenphim,
          dieukien: data.Dieukien,
          poster: data.Poster,
          trailer: data.Trailer,
          dienvien: data.Dienvien,
          ngonngu: data.Ngonngu,
          quocgia: data.Quocgia,
          tomtat: data.Tomtat,
          daodien: data.Daodien,
          thoiluong: data.Thoiluong,
          ngaychieu: data.Ngaychieu,
          nsx: data.Nsx,
          trangthai: data.Trangthai
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin phim thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTPhim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.maghe ||
        !data.loaighe ||
        !data.idr ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let ghe = await db.ghes.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (ghe) {
          ghe.maGhe = data.maghe;
          ghe.loaiGhe = data.loaighe;
          ghe.id_rap = data.idr;

          await ghe.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin ghế mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin ghế mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTPhim = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let ghe = await db.ghes.findOne({
      where: { id: Id },
    });

    if (!ghe) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy ghế`,
      });
    }

    await db.ghes.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin ghế đã xóa",
    });
  });
};


let handleThemTTLoaiphim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenloai
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.loaiphims.create({
          tenloai: data.tenloai
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin loại phim thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin loại phim thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTLoaiphim = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.tenloai ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let loaiphim = await db.loaiphims.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (loaiphim) {
          loaiphim.tenloai = data.tenloai
          await loaiphim.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin loại phim mới KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin loại phim mới thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTLoaiphim = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let loaiphim = await db.loaiphims.findOne({
      where: { id: Id },
    });

    if (!loaiphim) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy loại phim`,
      });
    }

    await db.loaiphims.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại phim đã xóa",
    });
  });
};


let handleThemTTSuatchieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.giobd ||
        !data.giokt

      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.suatchieus.create({
          giobatdau: data.giobd,
          gioketthuc: data.giokt
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin suất chiếu thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin suất chiếu KHÔNG thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTSuatchieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.giobd ||
        !data.giokt ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let suatchieu = await db.suatchieus.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (suatchieu) {
          suatchieu.giobatdau = data.giobd;
          suatchieu.gioketthuc = data.giokt;
          await suatchieu.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin suất chiếu KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin suất chiếu thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTSuatchieu = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let suatchieu = await db.suatchieus.findOne({
      where: { id: Id },
    });

    if (!suatchieu) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy suất chiếu`,
      });
    }

    await db.suatchieus.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại suất chiếu đã xóa",
    });
  });
};

let handleThemTTChieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ngaychieu ||
        !data.giave ||
        !data.idr ||
        !data.idp ||
        !data.idsc

      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.chieus.create({
          ngaychieu: data.ngaychieu,
          giave: data.giave,
          id_rap: data.idr,
          id_suatchieu: data.idsc,
          id_phim: data.idp
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin chiếu thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin chiếu KHÔNG thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};

let handleSuaTTChieu = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ngaychieu ||
        !data.giave ||
        !data.idr ||
        !data.idp ||
        !data.idsc ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let chieu = await db.chieus.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (chieu) {
          chieu.ngaychieu = data.ngaychieu;
          chieu.giave = data.giave;
          chieu.id_rap = data.idr;
          chieu.id_suatchieu = data.idsc;
          chieu.id_phim = data.idp;
          await chieu.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin chiếu KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin chiếu thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTChieu = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let chieu = await db.chieus.findOne({
      where: { id: Id },
    });

    if (!chieu) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy chiếu`,
      });
    }

    await db.chieus.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin loại chiếu đã xóa",
    });
  });
};

let handleThemTTDoan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Ten ||
        !data.Anhminhhoa ||
        !data.Loai ||
        !data.Mota ||
        !data.Gia ||
        !data.Size
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.doans.create({
          // id_KH: 5,
          ten: data.Ten,
          anhminhhoa: data.Anhminhhoa,
          loai: data.Loai,
          mota: data.Mota,
          gia: data.Gia,
          size: data.Size
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin đồ ăn thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin đồ ăn thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTDoan = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.Ten ||
        !data.Anhminhhoa ||
        !data.Loai ||
        !data.Mota ||
        !data.Gia ||
        !data.Size ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let doan = await db.doans.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (doan) {
          doan.ten = data.Ten;
          doan.anhminhhoa = data.Anhminhhoa;
          doan.loai = data.Loai;
          doan.mota = data.Gia;
          doan.size = data.Size;
          await doan.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin doan KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin doan thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTDoan = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let doan = await db.doans.findOne({
      where: { id: Id },
    });

    if (!doan) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy doans`,
      });
    }

    await db.doans.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin doan đã xóa",
    });
  });
};

let handleLayTTKhachhang = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let khachhang = "";
      if (key === "ALL") {
        khachhang = await db.khachhangs.findAll({
        });
      }

      if (key && key !== "ALL") {
        khachhang = await db.khachhangs.findAll({
          where: { Taikhoan_KH: key },
        });
      }
      resolve(khachhang);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThemTTKhuyenmai = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ten ||
        !data.tile ||
        !data.mota ||
        !data.dieukien ||
        !data.thoigianbatdau ||
        !data.thoigianketthuc
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        await db.khuyenmais.create({
          // id_KH: 5,
          ten_KM: data.ten,
          tile_KM: data.tile,
          mota_KM: data.mota,
          dieukien_KM: data.dieukien,
          thoigianbatdau: data.thoigianbatdau,
          thoigianketthuc: data.thoigianketthuc
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin khuyenmais thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin khuyenmais thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTKhuyenmai = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.ten ||
        !data.tile ||
        !data.mota ||
        !data.dieukien ||
        !data.thoigianbatdau ||
        !data.thoigianketthuc ||
        !data.id
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter",
        });
      } else {

        let khuyenmai = await db.khuyenmais.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (khuyenmai) {
          khuyenmai.ten_KM = data.ten;
          khuyenmai.tile_KM = data.tile;
          khuyenmai.mota_KM = data.mota;
          khuyenmai.dieukien_KM = data.dieukien;
          khuyenmai.thoigianbatdau = data.thoigianbatdau;
          khuyenmai.thoigianketthuc = data.thoigianketthuc;

          await khuyenmai.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin khuyenmai KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin khuyenmai thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTKhuyenmai = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let khuyenmai = await db.khuyenmais.findOne({
      where: { id: Id },
    });

    if (!khuyenmai) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy khuyenmais`,
      });
    }

    await db.khuyenmais.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin khuyenmais đã xóa",
    });
  });
};


let handleLayTTNhanvien = (key) => {
  return new Promise(async (resolve, reject) => {
    try {
      let nhanvien = "";
      if (key === "ALL") {
        nhanvien = await db.nhanviens.findAll({
        });
      }

      if (key && key !== "ALL") {
        nhanvien = await db.nhanviens.findAll({
          where: { Taikhoan_NV: key },
        });
      }
      resolve(nhanvien);
    } catch (e) {
      reject(e);
    }
  });
};


let handleThemTTNhanvien = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_nv ||
        !data.sdt_nv ||
        !data.ngaysinh_nv ||
        !data.tuoi_nv ||
        !data.diachi_nv ||
        !data.gioitinh_nv ||
        !data.cccd_nv ||
        !data.chucvu_nv ||
        !data.taikhoan_nv ||
        !data.matkhau_nv
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        await db.nhanviens.create({
          Hten_NV: data.hten_nv,
          Sdt_NV: data.sdt_nv,
          Ngaysinh_NV: data.ngaysinh_nv,
          Tuoi_NV: data.tuoi_nv,
          Diachi_NV: data.diachi_nv,
          Gioitinh_NV: data.gioitinh_nv,
          Cccd_NV: data.cccd_nv,
          Chucvu_NV: data.chucvu_nv,
          Taikhoan_NV: data.taikhoan_nv,
          Matkhau_NV: data.matkhau_nv,
        });

        resovle({
          errCode: 0,
          errMessage: "Thêm thông tin nhân viên thành công",
        });
      }
      resovle({
        errCode: 0,
        errMessage: "Thêm thông tin nhân viên thành công",
      });
      // }
    } catch (e) {
      reject(e);
    }
  });
};
let handleSuaTTNhanvien = (data) => {

  return new Promise(async (resovle, reject) => {
    try {
      if (
        !data.hten_nv ||
        !data.sdt_nv ||
        !data.ngaysinh_nv ||
        !data.tuoi_nv ||
        !data.diachi_nv ||
        !data.gioitinh_nv ||
        !data.cccd_nv ||
        !data.chucvu_nv ||
        !data.taikhoan_nv ||
        !data.matkhau_nv ||
        !data.id
        // 0 === 1
      ) {
        resovle({
          errCode: 1,
          errMessage: "Missing parameter nv",
        });
      } else {

        let nhanvien = await db.nhanviens.findOne({
          where: {
            id: data.id
          },
          raw: false,
        });
        if (nhanvien) {
          nhanvien.Hten_NV = data.hten_nv;
            nhanvien.Sdt_NV = data.sdt_nv;
            nhanvien.Ngaysinh_NV = data.ngaysinh_nv;
            nhanvien.Tuoi_NV = data.tuoi_nv;
            nhanvien.Diachi_NV = data.diachi_nv;
            nhanvien.Gioitinh_NV = data.gioitinh_nv;
            nhanvien.Cccd_NV = data.cccd_nv;
            nhanvien.Chucvu_NV = data.chucvu_nv;
            nhanvien.Taikhoan_NV = data.taikhoan_nv;
            nhanvien.Matkhau_NV = data.matkhau_nv;

            await nhanvien.save();
        }
        else {
          resovle({
            errCode: 1,
            errMessage: "Cập nhật thông tin nhân viên KHÔNG thành thông",
          });
        }
        resovle({
          errCode: 0,
          errMessage: "Cập nhật thông tin nhân viên thành thông",
        });
      }
    } catch (e) {
      reject(e);
    }
  });
};

let handleXoaTTNhanvien = async (Id) => {
  return new Promise(async (resolve, reject) => {
    let nhanvien = await db.nhanviens.findOne({
      where: { id: Id },
    });

    if (!nhanvien) {
      resolve({
        errCode: 2,
        errMessage: `Không tìm thấy nhân viên`,
      });
    }

    await db.nhanviens.destroy({
      where: { id: Id },
    });

    resolve({
      errCode: 0,
      message: "Thông tin nhân viên đã xóa",
    });
  });
};

module.exports = {
  handleDangnhap: handleDangnhap,
  handleDangky: handleDangky,
  handleDatve: handleDatve,
  handleTTchitietve: handleTTchitietve,
  handleTTGhe: handleTTGhe,
  handleTTChieu: handleTTChieu,
  handleTTKM: handleTTKM,
  handleTTDoan: handleTTDoan,
  handleTTPhim: handleTTPhim,
  handleTest: handleTest,
  // handleThemTTGhe: handleThemTTGhe,
  handleTTCumrap: handleTTCumrap,
  handleTTSuatchieu: handleTTSuatchieu,
  handleTTRap_idcumrap: handleTTRap_idcumrap,
  handleTTGhe_idrap: handleTTGhe_idrap,
  handleTTVe_idchieu: handleTTVe_idchieu,
  handleTTLoaiphim: handleTTLoaiphim,
  handleThemTTCumrap: handleThemTTCumrap,
  handleSuaTTCumrap: handleSuaTTCumrap,
  handleXoaTTCumrap: handleXoaTTCumrap,
  handleThemTTRap: handleThemTTRap,
  handleSuaTTRap: handleSuaTTRap,
  handleXoaTTRap: handleXoaTTRap,
  handleThemTTGhe: handleThemTTGhe,
  handleSuaTTGhe: handleSuaTTGhe,
  handleXoaTTGhe: handleXoaTTGhe,
  handleThemTTPhim: handleThemTTPhim,
  handleSuaTTPhim: handleSuaTTPhim,
  handleXoaTTPhim: handleXoaTTPhim,
  handleThemTTLoaiphim: handleThemTTLoaiphim,
  handleSuaTTLoaiphim: handleSuaTTLoaiphim,
  handleXoaTTLoaiphim: handleXoaTTLoaiphim,
  handleThemTTSuatchieu: handleThemTTSuatchieu,
  handleSuaTTSuatchieu: handleSuaTTSuatchieu,
  handleXoaTTSuatchieu: handleXoaTTSuatchieu,
  handleThemTTChieu: handleThemTTChieu,
  handleSuaTTChieu: handleSuaTTChieu,
  handleXoaTTChieu: handleXoaTTChieu,
  handleThemTTDoan: handleThemTTDoan,
  handleSuaTTDoan: handleSuaTTDoan,
  handleXoaTTDoan: handleXoaTTDoan,
  handleLayTTKhachhang: handleLayTTKhachhang,
  handleLayTTCTLoaiphim_idP: handleLayTTCTLoaiphim_idP,
  handleThemTTKhuyenmai: handleThemTTKhuyenmai,
  handleSuaTTKhuyenmai: handleSuaTTKhuyenmai,
  handleXoaTTKhuyenmai: handleXoaTTKhuyenmai,
  handleLayTTNhanvien: handleLayTTNhanvien,
  handleThemTTNhanvien: handleThemTTNhanvien,
  handleSuaTTNhanvien: handleSuaTTNhanvien,
  handleXoaTTNhanvien: handleXoaTTNhanvien



};
