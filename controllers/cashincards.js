const cashincards = require("../models/cashincards");
const cashcollected = require("../models/cashcollected");
const resp = require("../helpers/apiresponse");
const RSP = require("../models/rsp");
let getCurrentDate = function () {
  const t = new Date();
  const date = ("0" + t.getDate()).slice(-2);
  const month = ("0" + (t.getMonth() + 1)).slice(-2);
  const year = t.getFullYear();
  return `${year}-${month}-${date}`;
};
exports.addcashincards = async (req, res) => {
  const {
    dealer_Id,
    cards,
    date,
    opening_Value,
    addition,
    payment_received,
    clsosing_value_Expected,
    actual_closing_value,
    difference,
  } = req.body;
  let rsp = await RSP.findOne({ dealer_Id: req.body.dealer_Id }).sort({
    createdAt: -1,
  });

  console.log(rsp);

  // let rs1 = rsp.rsp1;
  // let rs2 = rsp.rsp2;
  let de = rsp.date;
  console.log(de);
  let additionvalue = 0;
  let cs = await cashcollected.find({
    $and: [{ date: de }, { dealer_name: req.body.dealer_Id }],
  });
  for (const element of cs) {
    if (req.body.cards.toLowerCase() == "credit") {
      additionvalue = element.credit_cash;
    }
    if (req.body.cards.toLowerCase() == "debit") {
      additionvalue = element.debit_cash;
    }
    if (req.body.cards.toLowerCase() == "upi") {
      additionvalue = element.upi_Cash;
    }

    const newcashincards = new cashincards({
      dealer_Id: dealer_Id,
      date: de,
      cards: cards,
      opening_Value: opening_Value,
      addition: additionvalue,
      payment_received: payment_received,
      clsosing_value_Expected: opening_Value + additionvalue - payment_received,
      actual_closing_value: actual_closing_value,
      difference:
        actual_closing_value -
        (opening_Value + additionvalue - payment_received),
    });

    newcashincards
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
};

exports.allcashincards = async (req, res) => {
  // await cashincards.remove();
  await cashincards
    .find()

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.allcashincardsApp = async (req, res) => {
  await cashincards
    .find({ dealer_Id: req.params.dealer_Id })

    .populate("dealer_Id")
    .sort({ createdAt: -1 })
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.getonecashincards = async (req, res) => {
  await cashincards
    .findOne({ _id: req.params.id })
    .populate("dealer_Id")
    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.deletecashincards = async (req, res) => {
  await cashincards
    .deleteOne({ _id: req.params.id })
    .then((data) => resp.deleter(res, data))
    .catch((error) => resp.errorr(res, error));
};

exports.updatecashincards = async (req, res) => {
  console.log(req.params.id);
  await cashincards

    .findOneAndUpdate(
      {
        _id: req.params.id,
        //  console.log(req.params._id);
      },
      {
        $set: req.body,
      },
      { new: true }
    )

    .then((data) => resp.successr(res, data))
    .catch((error) => resp.errorr(res, error));
  console.log(req.params._id);
};
