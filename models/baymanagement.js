const { stringify } = require("jade/lib/utils");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { toJSON, paginate } = require('./plugins');

const bmManagementSchema = mongoose.Schema(
    {
      id: {
        type: String,
        generated: true,
        trim: true,
      },
      dealer_id: {
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
      },
      bay_id:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
      },
      nozzel_id:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
      },
      product_id:{
        type: mongoose.Schema.Types.ObjectId,
        trim: true,
        default: null,
      },
      opnning_ltr:{
        type: Number,
        trim: true,
        default: null,
      },
      remanning_ltr:{
        type: Number,
        trim: true,
        default: null,
      }
    },
    {
      //timestamps: true,
      timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
  );
   
  // add plugin that converts mongoose to json
  bmManagementSchema.set('toJSON', { getters: true, virtuals: true })
  // add plugin that converts mongoose to json
  bmManagementSchema.plugin(toJSON);
  bmManagementSchema.plugin(paginate);
  
  
const Bm = mongoose.model('Bm', bmManagementSchema);
  
module.exports = Bm;
//module.exports = mongoose.model("bm", baymanagement);
