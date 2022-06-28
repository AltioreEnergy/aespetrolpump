const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const statutoryCertificate = new Schema(
    {
    
            Due_Date_of_Stamping: {type:String},
            Upload_5l: {type:Array},
            Class_A: {type:String},
            Class_B:{type:String},
            Due_Date_of_PESO:{type:String},
            Upload_PESO :{type:Array},

            scale: {type:String},
            Hydrometer_Due_Date:{type:String},
            Upload_Hydrometer: {type:Array},
    
            calibration_Due_date:{type:String} ,
            uplodad_thermameter:{type:Array},
            dur_date_air_gauage:{type:String},
            uplodad_air_gauage:{type:Array},


            DPSL_upload:{type:Array} ,
            due_date_DPSL:{type:String},
            
            due_date_outher:{type:Array},
            Remarks: {type:String},
            upload_outher:{type:Array},
        
 

    },
    { timestamps: true }
);

module.exports = mongoose.model("statutoryCertificate", statutoryCertificate);