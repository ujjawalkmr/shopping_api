const { type } = require('express/lib/response');
const mongoose = require('mongoose');
const { LoremIpsum } = require("lorem-ipsum");

const lorem = new LoremIpsum({
    sentencesPerParagraph: {
        max: 4,
        min: 2
    },
    wordsPerSentence: {
        max: 8,
        min: 4
    }
});

const productDetailsSchema = new mongoose.Schema({
  productName: { type: String },
  productImage: { type: [String], default: [] },
  productPrice: { type: String },
  productStoreLink: { type: String },
  productQuintity: { type: String },
   aboutProduct: {
  type: String,
  default: function () {
    // `this` refers to the document being created
    if (this.productName && typeof this.productName === 'string' && this.productName.trim() !== '') {
      return lorem.generateParagraphs(1);
    }
    return undefined; // or return ''; if you prefer an empty string
  },
  validate: {
    validator: function (val) {
      return typeof val === 'string' && val.trim() !== '';
    },
    message: 'aboutProduct must be a non-empty string'
  }
}

}, {
  _id: false,
  validate: {
    validator: function (details) {
      if (details.productName) {
        return (
          typeof details.productPrice === 'string' && details.productPrice.trim() !== '' &&
          typeof details.productStoreLink === 'string' && details.productStoreLink.trim() !== '' &&
          typeof details.productQuintity === 'string' && details.productQuintity.trim() !== '' &&
          Array.isArray(details.productImage) &&
          details.productImage.length >= 1 &&
          details.productImage.length <= 6
        );
      }
      return true;
    },
    message: 'If productName is provided, all other product details must be filled correctly'
  }
});




const shellerSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    productDetails: {
    type: productDetailsSchema,
    required: false
  },

    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    },
    shellItems: {
        type: String,
    }
}, { timestamps: true })

const Sheller = mongoose.model('shellere', shellerSchema);

module.exports = Sheller;


// const productDetailsSchema = new mongoose.Schema({
//   productName: { type: String ,required: true}, 
//    aboutProduct: {
//         type: String,
    
//         default: function () {
//             return lorem.generateParagraphs(1);
//         },
//     },
//        productQuintity: {
//         type: String,
//         validate:{
//             validator:function(quentity){
//                 if(this.productName){
//                 return typeof quentity==='string' && quentity.trim()!=='';
//             }
//             return true;
//         },
//         message : "If productName is provided, productPrice is required",
//         },
//     },
//  productImage: {
//     type: [String],
//     default: [],
//     validate: {
//       validator: function (images) {
//         if (this.productName) {
//           return Array.isArray(images) && images.length >= 1 && images.length <= 6;
//         }
//         return true;
//       },
//       message: 'If productName is provided, productImage must contain 1 to 6 URLs'
//     }
//   },

//   productStoreLink:{
//     type: String,
//     validate:{
//         validator:function(storeLink){
//             if(this.productName){
//                 return typeof storeLink==='string' && storeLink.trim()!=='';
//             }
//             return true;
//         },
//         message : "If productName is provided, storelink is required",
//     },
//   },

//   productPrice: {
//     type: String,
//     validate: {
//       validator: function (price) {
//         if (this.productName) {
//           return typeof price === 'string' && price.trim() !== '';
//         }
//         return true;
//       },
//       message: 'If productName is provided, productPrice is required'
//     }
//   }
// }, { _id: false });// disables _id for subdocument
