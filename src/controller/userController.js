import userService from "../services/userService";
import db from "../models/index";
// import Test from "../services/Test";


let handleDangnhap = async (req, res) => {
  let username = req.body.Taikhoan_KH;
  let password = req.body.Matkhau_KH;

  if (!username || !password) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing input",
    });
  }
  let userdata = await userService.handleDangnhap(username, password);
  console.log(userdata);
  //check email exist
  //compare password
  //return userInfor
  //accept_token: validate user: JWT: json web token
  return res.status(200).json({
    errCode: userdata.errCode,
    message: userdata.errMessage,
    khachhang: userdata.khachhang ? userdata.khachhang : {},
  });
};

let handleDangky = async (req, res) => {
  try {
    let infor = await userService.handleDangky(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleDatve = async (req, res) => {
  try {
    let infor = await userService.handleDatve(req.body);
    return res.status(200).json(infor);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleTTchitietve = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id
  let id_ve = req.query.keyword;

  if (!id_ve) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      chitietves: {},
    });
  }

  let chitietves = await userService.handleTTchitietve(id_ve);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    chitietves,
  });
};

let handleTTGhe = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      ghes: {},
    });
  }

  let ghes = await userService.handleTTGhe(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    ghes,
  });
};

// let handleTTChieu = async (req, res) => {
//   let id_rap = req.query.id_rap;
//   let id_phim = req.query.id_phim;
//   let id_suatchieu = req.query.id_suatchieu;


//   if (!id_suatchieu || !id_phim || !id_phim) {
//     return res.status(500).json({
//       errCode: 1,
//       message: "Missing ",
//     });
//   }


//   let TTChieu = await userService.handleTTChieu(id_rap, id_phim, id_suatchieu);
//   // console.log(TTChieu);
//   //check email exist
//   //compare password
//   //return userInfor
//   //accept_token: validate user: JWT: json web token
//   return res.status(200).json({
//     // errCode: TTChieu.errCode,
//     // message: TTChieu.errMessage,
//     // chieu: TTChieu.chieu ? TTChieu.chieu : {},
//     TTChieu,
//   });
// };

let handleTTChieu = async (req, res) => {
  // let id_rap = req.body.id_rap;
  let id_phim = req.body.id_phim;
  let ngaychieu = req.body.ngaychieu;
  let id_rap = req.body.id_rap;

  if ( !id_rap || !id_phim || !ngaychieu) {
    return res.status(500).json({
      errCode: 1,
      message: "Missing ",
    });
  }


  let ttchieu = await userService.handleTTChieu(ngaychieu, id_phim, id_rap);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    ttchieu,
  });
};

let handleTTKM = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      khuyenmais: {},
    });
  }

  let khuyenmais = await userService.handleTTKM(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    khuyenmais,
  });
};


let handleTTDoan = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      doans: {},
    });
  }

  let doans = await userService.handleTTDoan(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    doans,
  });
};
let handleTTPhim = async (req, res) => {
  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      phims: {},
    });
  }

  let phims = await userService.handleTTPhim(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    phims,
  });
};





let getHomepage = async (req, res) => {

try {
  let data = await db.phims.findAll();

  return res.render("index.ejs", { data: JSON.stringify(data) });
} catch (e) {
  console.log(e);
}
};


let handleTest = async (req, res) => {
  try {
    let test = await userService.handleTest(req.body);
    return res.status(200).json(test);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};





let handleTTGhe_idrap = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.id_rap;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      ghes: {},
    });
  }

  let ghes = await userService.handleTTGhe_idrap(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    ghes,
  });
};

let handleTTCumrap = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      cumraps: {},
    });
  }

  let cumraps = await userService.handleTTCumrap(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    cumraps,
  });
};

let handleTTSuatchieu = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      suatchieus: {},
    });
  }

  let suatchieus = await userService.handleTTSuatchieu(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    suatchieus,
  });
};

let handleTTRap_idcumrap = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      raps: {},
    });
  }

  let raps = await userService.handleTTRap_idcumrap(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    raps,
  });
};

let handleTTVe_idchieu = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.id_chieu;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      ves: {},
    });
  }

  let ves = await userService.handleTTVe_idchieu(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    ves,
  });
};

let handleTTLoaiphim = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.id;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      loaiphims: {},
    });
  }

  let loaiphims = await userService.handleTTLoaiphim(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    loaiphims,
  });
};

let handleLayTTCTLoaiphim_idP = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.id;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      chitietloaiphims: {},
    });
  }

  let chitietloaiphims = await userService.handleLayTTCTLoaiphim_idP(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    chitietloaiphims,
  });
};

let handleThemTTCumrap = async (req, res) => {
  try {
    let cumrap = await userService.handleThemTTCumrap(req.body);
    return res.status(200).json(cumrap);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTCumrap = async (req, res) => {
  try {
    let cumrap = await userService.handleSuaTTCumrap(req.body);
    return res.status(200).json(cumrap);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTCumrap = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTCumrap(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleThemTTRap = async (req, res) => {
  try {
    let cumrap = await userService.handleThemTTRap(req.body);
    return res.status(200).json(cumrap);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTRap = async (req, res) => {
  try {
    let cumrap = await userService.handleSuaTTRap(req.body);
    return res.status(200).json(cumrap);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTRap = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTRap(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleThemTTGhe = async (req, res) => {
  try {
    let ghe = await userService.handleThemTTGhe(req.body);
    return res.status(200).json(ghe);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTGhe = async (req, res) => {
  try {
    let ghe = await userService.handleSuaTTGhe(req.body);
    return res.status(200).json(ghe);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTGhe = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTGhe(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}



let handleThemTTPhim = async (req, res) => {
  try {
    let phim = await userService.handleThemTTPhim(req.body);
    return res.status(200).json(phim);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTPhim = async (req, res) => {
  try {
    let phim = await userService.handleSuaTTPhim(req.body);
    return res.status(200).json(phim);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTPhim = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTPhim(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}



let handleThemTTLoaiphim = async (req, res) => {
  try {
    let phim = await userService.handleThemTTLoaiphim(req.body);
    return res.status(200).json(phim);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTLoaiphim = async (req, res) => {
  try {
    let phim = await userService.handleSuaTTLoaiphim(req.body);
    return res.status(200).json(phim);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTLoaiphim = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTLoaiphim(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}


let handleThemTTSuatchieu = async (req, res) => {
  try {
    let suatchieu = await userService.handleThemTTSuatchieu(req.body);
    return res.status(200).json(suatchieu);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTSuatchieu = async (req, res) => {
  try {
    let suatchieu = await userService.handleSuaTTSuatchieu(req.body);
    return res.status(200).json(suatchieu);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTSuatchieu = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTSuatchieu(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleThemTTChieu = async (req, res) => {
  try {
    let chieu = await userService.handleThemTTChieu(req.body);
    return res.status(200).json(chieu);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleSuaTTChieu = async (req, res) => {
  try {
    let chieu = await userService.handleSuaTTChieu(req.body);
    return res.status(200).json(chieu);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTChieu = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTChieu(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleThemTTDoan = async (req, res) => {
  try {
    let doan = await userService.handleThemTTDoan(req.body);
    return res.status(200).json(doan);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleSuaTTDoan = async (req, res) => {
  try {
    let doan = await userService.handleSuaTTDoan(req.body);
    return res.status(200).json(doan);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTDoan = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTDoan(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleLayTTKhachhang = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      khachhangs: {},
    });
  }

  let khachhangs = await userService.handleLayTTKhachhang(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    khachhangs,
  });
};

let handleThemTTKhuyenmai = async (req, res) => {
  try {
    let khuyenmai = await userService.handleThemTTKhuyenmai(req.body);
    return res.status(200).json(khuyenmai);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleSuaTTKhuyenmai = async (req, res) => {
  try {
    let khuyenmai = await userService.handleSuaTTKhuyenmai(req.body);
    return res.status(200).json(khuyenmai);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTKhuyenmai = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTKhuyenmai(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

let handleLayTTNhanvien = async (req, res) => {
  // let Dienthoai = "ALL"; //req.query.id; //get all or id

  let key = req.query.keyword;

  if (!key) {
    return res.status(200).json({
      errCode: 1,
      errMessage: "missing require parameters",
      nhanviens: {},
    });
  }

  let nhanviens = await userService.handleLayTTNhanvien(key);

  return res.status(200).json({
    // errCode: 0,
    // errMessage: "ok",
    nhanviens,
  });
};


let handleThemTTNhanvien = async (req, res) => {
  try {
    let nhanvien = await userService.handleThemTTNhanvien(req.body);
    return res.status(200).json(nhanvien);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};
let handleSuaTTNhanvien = async (req, res) => {
  try {
    let nhanvien = await userService.handleSuaTTNhanvien(req.body);
    return res.status(200).json(nhanvien);
  } catch (e) {
    console.log(e);
    return res.status(200).json({
      errCode: -1,
      errMessage: "Error from the server",
    });
  }
};

let handleXoaTTNhanvien = async (req, res) => {
  if(!req.body.id){
      return res.status(200).json({
          errCode: 1,
          message: "missing require parameter",
      })
  }
  let message = await userService.handleXoaTTNhanvien(req.body.id);
  console.log(message);
  return res.status(200).json(message);
}

module.exports = {
  handleDangnhap: handleDangnhap,
  handleDangky: handleDangky,
  handleDatve: handleDatve,
  handleTTchitietve: handleTTchitietve,
  handleTTGhe: handleTTGhe,
  handleTTChieu: handleTTChieu,
  handleTTDoan: handleTTDoan,
  handleTTKM: handleTTKM,
  handleTTPhim: handleTTPhim,
  getHomepage: getHomepage,
  handleTest: handleTest,
  // handleThemTTGhe:handleThemTTGhe,
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
