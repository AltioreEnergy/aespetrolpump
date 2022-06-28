const bm = require("../models/baymanagementold");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
const Nozzle = require("../models/nozzle_map");
const _ = require("lodash");

let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${date}-${month}-${year}`;
};
//console.log(getCurrentDate());

exports.addbm = async (req, res) => {
  const {
    dealer_Id,
    dsm__Id,
    date,

    nozzel,
    product,
    opening_total,

    closing_Entry,
    closing_Entry_MS,
    closing_Entry_HSD,
    closing_total_MS,
    closing_total_HSD,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });
  let rs1 = rsp.rsp1;
  let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log("date dsm", de);
  console.log("date bay mangment", de);
  let msclsoing = 0;
  let hsdclosing = 0;
  //let obj2 = JSON.parse(hsdclosing);
  let Nozz = await Nozzle.findOne({ _id: req.body.nozzel }).populate([
    {
      path: "tank_map",
      populate: [
        {
          path: "Product",
        },
      ],
    },
  ]);
  /////
  let pro = Nozz.tank_map.Product;
  if ("ms" == pro.toLowerCase()) {
    msclsoing = req.body.closing_Entry;
    hsdclosing = 0;
  } else {
    hsdclosing = req.body.closing_Entry;
    msclsoing = 0;
  }
  let d = await bm.find({
    $and: [
      { dsm: req.body.dsm__Id },
      { date: de },
      { nozzel: req.body.nozzel },
    ],
  });
  //console.log("bay managment", d)
  //let op=d.closing_Entry

  var newarr = d.map(function (value) {
    return value.closing_Entry;
  });
  console.log(newarr);
  let sumMs1 = _.sum([msclsoing, ...newarr]);
  console.log(sumMs1);
  var newarr2 = d.map(function (value) {
    return value.closing_Entry;
  });

  var sumHsd1 = _.sum([hsdclosing, ...newarr2]);
  console.log("sumHsd1", sumHsd1);
  ///
  let openentry = await bm
    .findOne({ $and: [{ nozzel: req.body.nozzel }, { date: de }] })
    .sort({ createdAt: -1 });
  // .limit(1, 1);
  // console.log("dataaa", openentry);
  if (openentry == null) {
    let bmobject = {
      dealer_Id: dealer_Id,
      dsm__Id: dsm__Id,
      date: de,
      nozzel: nozzel,
      product: pro,
      closing_Entry: parseFloat(closing_Entry),
      opening_total: parseFloat(closing_Entry),
      closing_Entry_MS: parseFloat(msclsoing),
      closing_Entry_HSD: parseFloat(hsdclosing),

      sumMS: parseFloat(sumMs1),
      sumHSD: parseFloat(sumHsd1),
    };
    const findexist = await bm.findOne({
      $and: [
        { closing_Entry: closing_Entry },
        { dealer_Id: req.body.dealer_Id },
        { date: de },
      ],
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "not enter same entry again enter gretr value",
        data: {},
      });
    } else {
      /////////////////////
      let result = await bm.create(bmobject);
      resp.successr(res, result);
      // console.log(result)
    }
  } else {
    console.log(openentry);
    const openingtotal = openentry.opening_total;
    console.log("openingtotal", openingtotal);
    //console.log(pro=="MS")

    //process.exit();
    if ("ms" == pro.toLowerCase()) {
      msclsoing = req.body.closing_Entry - openingtotal;
      hsdclosing = 0;
    } else {
      hsdclosing = req.body.closing_Entry - openingtotal;
      msclsoing = 0;
    }
    // let rsp0 = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    //   createdAt: -1,
    // });
    // let rs1 = rsp.rsp1;
    // let rs2 = rsp.rsp2;
    // let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    //   createdAt: -1,
    // });
    // let rs1 = rsp.rsp1;
    // let rs2 = rsp.rsp2;
    // let de = rsp.date;
    // console.log("open1",open.closing_total_MS)
    // console.log("open2",open.closing_total_MS)

    //console.log("2022-04-01"==getCurrentDate())
    let d = await bm.find({
      $and: [
        { dsm: req.body.dsm__Id },
        { date: de },
        { nozzel: req.body.nozzel },
      ],
    });
    //console.log("bay managment", d)
    //let op=d.closing_Entry

    var newarr = d.map(function (value) {
      return value.closing_Entry_MS;
    });
    console.log(newarr);
    let sumMs1 = _.sum([msclsoing, ...newarr]);
    console.log("sumMs1", sumMs1);
    var newarr2 = d.map(function (value) {
      return value.closing_Entry_HSD;
    });

    var sumHsd1 = _.sum([hsdclosing, ...newarr2]);
    console.log("sumHsd1", sumHsd1);

    ///rsp

    // let opnig1=rsp.opneing_liter1
    // let opnig2=rsp.opneing_liter2
    // console.log("opnig1",opnig1)
    // console.log("opnig2",opnig2)

    var dateOpen = new Date();

    //save
    const newbm = new bm({
      dealer_Id: dealer_Id,
      dsm__Id: dsm__Id,
      date: de,
      nozzel: nozzel,
      product: pro,
      closing_Entry: parseFloat(closing_Entry),
      opening_total: parseFloat(closing_Entry),

      closing_Entry_MS: parseFloat(msclsoing),
      closing_Entry_HSD: parseFloat(hsdclosing),
      closing_total_MS: parseFloat(sumMs1),
      closing_total_HSD: parseFloat(sumHsd1),
      sumMS: parseFloat(sumMs1),
      sumHSD: parseFloat(sumHsd1),
    });
    const findexist = await bm.findOne({
      $and: [
        { closing_Entry: closing_Entry },
        { dealer_Id: req.body.dealer_Id },
        { date: de },
        { nozzel: nozzel },
      ],
    });
    if (findexist) {
      res.status(400).json({
        status: false,
        msg: "not enter same entry again enter grater value",
        data: {},
      });
    } else {
      newbm
        .save()
        .then((data) => {
          res.status(200).json({
            status: true,
            msg: "success",
            data: data,
          });
        })
        .catch((error) => {
          res.status(400).json({
            status: false,
            msg: "error",
            error: error,
          });
        });
    }
  }
};
exports.allbm = async (req, res) => {
  //await bm.remove();

  await bm
    .find()
    .populate([
      {
        path: "nozzel",
        populate: [
          {
            path: "tank_map",
            populate: [
              {
                path: "Product",
                select: "product",
                populate: [
                  {
                    path: "capacity",
                    select: "capacity",
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
    .populate("dealer_Id")
    .populate("dsm__Id")
    .sort({ createdAt: -1 })
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  // .then((data) => {
  //   res.status(200).json({
  //     status: true,
  //     msg: "sucsses",
  //     data: data,
  //   });
  // });
};

exports.allbmApp = async (req, res) => {
  //await bm.remove();

  await bm
    .find({ dealer_Id: req.params.dealer_Id })
    .populate([
      {
        path: "nozzel",
        populate: [
          {
            path: "tank_map",
          },
        ],
      },
    ])
    .populate("dealer_Id")
    .populate("dsm__Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonebm = async (req, res) => {
  await bm
    .findOne({ _id: req.params.id })
    .populate([
      {
        path: "nozzel",
        populate: [
          {
            path: "tank_map",
            populate: [
              {
                path: "Product",
                select: "product",
                populate: [
                  {
                    path: "capacity",
                    select: "capacity",
                  },
                ],
              },
            ],
          },
        ],
      },
    ])
    .populate("dealer_Id")
    .populate("dsm__Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletebm = async (req, res) => {
  await bm
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatebm = async (req, res) => {
  // const {
  //   dealer_Id,
  //   dsm__Id,
  //   date,

  //   nozzel,
  //   product,
  //   opening_total,

  //   closing_Entry,
  //   closing_Entry_MS,
  //   closing_Entry_HSD,
  //   closing_total_MS,
  //   closing_total_HSD,
  // } = req.body;
  // data = {};
  // if (dealer_Id) {
  //   data.dealer_Id = dealer_Id;
  // }
  // if (dsm__Id) {
  //   data.dsm__Id = dsm__Id;
  // }
  // if (date) {
  //   data.date = date;
  // }
  // if (dealer_Id) {
  //   data.dealer_Id = dealer_Id;
  // }
  // if (nozzel) {
  //   data.nozzel = nozzel;
  // }
  // if (product) {
  //   data.product = product;
  // }
  // if (opening_total) {
  //   data.opening_total = opening_total;
  // }
  //   if (closing_Entry) {

  //   let msclsoing = 0;
  //   let hsdclosing = 0;
  //   //let obj2 = JSON.parse(hsdclosing);
  //   let Nozz = await Nozzle.findOne({ _id: req.body.nozzel })
  //     .populate([{
  //       path: 'tank_map',
  //       populate: [{
  //         path: 'Product',
  //         populate: [{
  //           path: 'product'
  //         }]
  //       }]
  //     }
  //     ])
  //   /////
  //   let pro = Nozz.tank_map.Product;
  //   if ("MS" == pro || "ms" == pro || "Ms" == pro) {
  //     msclsoing = req.body.closing_Entry;
  //     hsdclosing = 0;
  //   } else {
  //     hsdclosing = req.body.closing_Entry;
  //     msclsoing = 0;
  //   }
  //   let d = await bm.find({ $and: [{ "dsm": req.body.dsm__Id }, { "date": getCurrentDate() }, { 'nozzel': req.body.nozzel }] })
  //  // console.log("bay managment", d)
  //   //let op=d.closing_Entry

  //   var newarr = d.map(function (value) {
  //     return value.closing_Entry
  //   })
  //   console.log(newarr)
  //   let sumMs1 = (_.sum([msclsoing, ...newarr]))
  //   console.log(sumMs1)
  //   var newarr2 = d.map(function (value) {
  //     return value.closing_Entry
  //   })

  //   var sumHsd1 = (_.sum([hsdclosing, ...newarr2]))
  //   console.log(sumHsd1)
  //   ///
  //   let openentry = await bm.findOne({ 'nozzel': req.body.nozzel }).limit(2,3)
  //   console.log("dataaa  update", openentry)
  //   if (openentry == null) {
  //     let bmobject = {
  //       dealer_Id: dealer_Id,
  //       dsm__Id: dsm__Id,
  //       date: getCurrentDate(),
  //       nozzel: nozzel,
  //       product: pro,
  //       closing_Entry: closing_Entry,
  //       opening_total: closing_Entry,
  //       closing_Entry_MS: msclsoing,
  //       closing_Entry_HSD: hsdclosing,

  //       sumMS: sumMs1,
  //       sumHSD: sumHsd1
  //     }

  //     /////////////////////
  //     let result = await bm.create(bmobject);
  //     resp.successr(res, result)
  //     //console.log(result)
  //   } else {
  //     console.log(openentry)
  //     const openingtotal = openentry.opening_total
  //     console.log("openingtotal", openingtotal)
  //     //console.log(pro=="MS")

  //     //process.exit();
  //     if ("MS" == pro || "ms" == pro || "Ms" == pro) {
  //       msclsoing = req.body.closing_Entry - openingtotal;
  //       hsdclosing = 0;
  //     } else {
  //       hsdclosing = req.body.closing_Entry - openingtotal;
  //       msclsoing = 0;
  //     }

  //     let open = await bm.findOne({ 'date': getCurrentDate() }).sort({ createdAt: -1 })

  //     // console.log("open1",open.closing_total_MS)
  //     // console.log("open2",open.closing_total_MS)

  //     //console.log("2022-04-01"==getCurrentDate())
  //     let d = await bm.find({ $and: [{ "dsm": req.body.dsm__Id }, { "date": getCurrentDate() }, { 'nozzel': req.body.nozzel }] })
  //     //console.log("bay managment", d)
  //     //let op=d.closing_Entry

  //     var newarr = d.map(function (value) {
  //       return value.closing_Entry_MS
  //     })
  //     console.log(newarr)
  //     let sumMs1 = (_.sum([msclsoing, ...newarr]))
  //     console.log(sumMs1)
  //     var newarr2 = d.map(function (value) {
  //       return value.closing_Entry_HSD
  //     })

  //     var sumHsd1 = (_.sum([hsdclosing, ...newarr2]))
  //     console.log(sumHsd1)

  //     ///rsp
  //     let rsp = await RSP.findOne().sort({ createdAt: -1 })
  //     let rs1 = rsp.rsp1;
  //     let rs2 = rsp.rsp2;
  //     // let opnig1=rsp.opneing_liter1
  //     // let opnig2=rsp.opneing_liter2
  //     // console.log("opnig1",opnig1)
  //     // console.log("opnig2",opnig2)
  //     data.closing_Entry=closing_Entry

  //   }

  //// if (data) {
  const findandUpdateEntry = await bm
    .findOneAndUpdate(
      {
        _id: req.params.id,
      },
      { $set: req.body },
      { new: true }
    )
    .populate("dealer_Id");

  if (findandUpdateEntry) {
    res.status(200).json({
      status: true,
      msg: "success",
      // data: findandUpdateEntry,
    });
  } else {
    res.status(400).json({
      status: false,
      msg: "error",
      error: "error",
    });
  }
};
//}
