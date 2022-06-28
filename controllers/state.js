const State = require('../models/state');
const satetdata = require('../state.json');

exports.allstate = async (req, res) => {
    // await State.remove();
    // for (const state of satetdata) {
    //     await State.create({
    //         state:state.state,
    //         districts:state.districts
    //     });        
    // }
    // res.status(400).json({
    //     status: false,
    //     msg: "error",
    //     error: "error"
    // })
    const findall = await State.find(req.body).select('state')
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


exports.addstate = async (req, res) => {
    const { iso_code, country_id, name } = req.body
    console.log("hello")
    const newState = new State({
        iso_code: iso_code,
        country_id: country_id,
        name: name,
    });

    const findexist = await State.findOne({name:name})
    if(findexist){
        res.status(400).json({
            status: false,
            msg: "Already Exists",
            data: {}
        })
    } else {
        newState.save()
        .then(
            res.status(200).json({
                status: true,
                msg: "success",
                data: newState
            })
        )
        .catch(error => {
            res.status(400).json({
                status: false,
                msg: "error",
                error: error
            })
        })
    }
    
}

// exports.editstate = async (req, res) => {

//     const findandUpdateEntry = await State.findOneAndUpdate({ _id: req.params.id }, { $set: req.body },{new: true})

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


// exports.onestate = async (req, res) => {
//     const findone = await State.findOne({ _id: req.params.id }).populate('country')
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




// exports.deletestate = async (req, res) => {
//     try {
//         const deleteentry = await State.deleteOne({ _id: req.params.id })
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
