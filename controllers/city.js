const State = require('../models/state');

exports.allcity = async (req, res) => {
    const findall = await State.find(req.body)
    if (findall) {
        res.status(200).json({
            status: true,
            msg: "success",
            data: findall
        })
    } else {
        res.status(400).json({
            status: false,
            msg: "error",
            error: "error"
        })
    }
}
//

// exports.addcity = async (req, res) => {
//     const {state, name } = req.body

//     const newCity = new City({
//         state: state,
//         name: name,
//     });

//     const findexist = await City.findOne({name:name})
//     if(findexist){
//         res.status(400).json({
//             status: false,
//             msg: "Already Exists",
//             data: {}
//         })
//     } else {
//         newCity.save()
//         .then(
//             res.status(200).json({
//                 status: true,
//                 msg: "success",
//                 data: newCity
//             })
//         )
//         .catch(error => {
//             res.status(400).json({
//                 status: false,
//                 msg: "error",
//                 error: error
//             })
//         })
//     }
    
// }

// exports.editcity = async (req, res) => {

//     const findandUpdateEntry = await City.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },{new: true}).populate('state')

//     if (findandUpdateEntry) {
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findandUpdateEntry
//         })
//     }
//     else {
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error"
//         })
//     }
// }


// exports.onecity = async (req, res) => {
//     const findone = await City.findOne({ _id: req.params.id })
//     if (findone) {
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: findone
//         })
//     }
//     else {
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: "error"
//         })
//     }
// }




// exports.deletecity = async (req, res) => {
//     try {
//         const deleteentry = await City.deleteOne({ _id: req.params.id })
//         res.status(200).json({
//             status: true,
//             msg: "success",
//             data: deleteentry
//         })
//     } catch (error) {
//         res.status(400).json({
//             status: false,
//             msg: "error",
//             error: error
//         })
//     }
// }
