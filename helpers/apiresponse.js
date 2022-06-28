exports.alreadyr = function (res, msg) {
  var data = {
    status: false,
    msg: `${msg} already in use `,
  };
  return res.status(400).json(data);
};

exports.successr = function (res, data) {
  var resData = {
    status: true,
    msg: "success",
    count: data.length,
    data: data,
  };
  return res.status(200).json(resData);
};

exports.errorr = function (res, error) {
  var data = {
    status: false,
    msg: "error",
    error: error,
  };
  return res.status(400).json(data);
};

exports.deleter = function (res, data) {
  var data = {
    status: true,
    msg: "deleted",
    deleteCount: data.deletedCount,
  };
  return res.status(200).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
  var resData = {
    status: false,
    msg: msg,
    data: data,
  };
  return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
  var data = {
    status: false,
    msg: msg,
  };
  return res.status(401).json(data);
};
