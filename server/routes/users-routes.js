const express = require('express');
const User = require('../models/user-model');
const router = express.Router();

router.get('/api/user', (req, res, next) => {
  if (req.isAuthenticated()) {
    res.status(200).json(req.user);
    return;
  }

// const username = req.body.username;
// const password = req.body.password;
// const avatarUrl = req.body.avatarUrl;
// const firstName = req.body.firstName;
// const lastName = req.body.lastName;
// const companyName = req.body.companyName;
// const primaryPhone = req.body.phonePrimary;
// const street1 = req.body.street;
// const street2 = req.body.street;
// const city = req.body.city;
// const province = req.body.province;
// const zip = req.body.province;
//
// const theUser = new UserModel({
//   firstName : firstName,
//   lastName : lastName,
//   companyName : companyName,
//   primaryphone : primaryPhone,
//   street1 : street1,
//   street2 : street2,
//   city : city,
//   province : province,
//   zip : zip,
//   user: _id
// });
//
// router.get('/api/userDetails', (req, res, next) => {
//     if (!req.user) {
//       res.status(401).json({ message: 'Log in to see user details.' });
//       return;
//     }
//       UserModel.findById(req.params.id)
//
//       // .find()
//
//       // retrieve all the info of the owners (needs "ref" in model)
//       .populate('user', { encryptedPassword: 0 })
//       // don't retrieve "encryptedPassword" though
//
//       .exec((err, allUserDetails) => {
//           if (err) {
//             res.status(500).json({ message: 'Something went wrong retrieving your info.' });
//             return;
//           }
//
//           res.status(200).json(allUserDetails);
//       });
// }); // close router.get('/api/camels', ...

// router.get("/api/theuser", (req, res, next) => {
//   UserModel.findById(req.params.id)
//     .populate("userClients")
//     .exec(
//       (err, userFromDb) => {
//         if (err) {
//           console.log("User details error. Please try again.", err);
//           res.status(500).json({
//             errorMessage: "Something went wrong loading your user details."
//           });
//           return;
//         }
//         res.status(200).json(userFromDb);
//       }
//     );
// });

// router.patch("/api/editUser", (req, res, next) => {
//   req.user.userDetails.push({
//         // avatarUrl : req.body.avatarUrl,
//         firstName : req.body.firstName,
//         lastName : req.body.lastName,
//         companyName : req.body.companyName,
//         primaryphone : req.body.primaryPhone,
//         street1 : req.body.street1,
//         street2 : req.body.street2,
//         city : req.body.city,
//         province : req.body.province,
//         zip : req.body.zip
//       });
//
//   req.user.save((err) => {
//     if (req.user.errors) {
//       res.status(400).json({
//         errorMessage: "Something went wrong, Could not update user details.",
//         validationErrors: req.user.errors
//       });
//       return;
//     }
//   });
//   res.status(200).json(req.user.userDetails);
// });
//
// // router.delete("/users/removeLanguageSkill/:language", (req, res, next) => {
// //
// // 			const deleteMatch = req.params.language.toLowerCase();
// //
// // 			req.user.update(
// // 				{ $pull: { languageSkills: { language: deleteMatch } } },
// // 				(err) => {
// //         if (err) {
// //           res.status(500).json({
// //             errorMessage: "Delete language skill validation failed" });
// //           return;
// //         }
// // 				res.status(200).json(req.user);
// //       });
// // });
//
// //-------------------------------------------------------- Delete account route
// router.delete('/api/delete/:id', (req, res) => {
//   // Checks if user ID is valid in the URL
//   if(!mongoose.Types.ObjectId.isValid(req.params.id)) {
//     res.status(400).json({ message: 'Specified id is not valid. Try another one.' });
//     return;
//   }
//
//   User.remove({ _id: req.params.id }, (err) => {
//     if (err) {
//       res.json(err);
//       return;
//     }
//
//     return res.json({
//       message: 'User has been deleted from the database.'
//     });
//   })
});
//
//
//
module.exports = router
