const creditgiven = require("../models/creditgivento");
exports.credit_report = async (req, res) => {
  const { dsm_Id, dealer_Id } = req.body;
  let record = [];
  let credit = await creditgiven
    .find({ $and: [{ dealer_Id: dealer_Id }, { dsm_name: dsm_Id }] })
    .populate("dsm_name")
    .populate("name_of_customer");
  console.log(credit);
  if (credit == null) {
    res.status(400).json({
      status: false,
      msg: "record not found",
    });
  } else {
    for (const iterator of credit) {
      record.push(iterator.date);
      record.push(iterator.name_of_customer.name_of_customer);
      record.push(iterator.credit_limit);
      record.push(iterator.credit_available);
      record.push(iterator.credit_given_today_amount);
      record.push(iterator.dsm_name.dsm_name);
    }
  }
  let data = {
    record: record,
  };
  res.status(200).json({
    status: true,
    data: data,
  });
};
