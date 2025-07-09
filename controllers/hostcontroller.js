const emp = require('../model/emp')
const contact = require('../model/contact')

exports.home = (req, res, next) => {
     emp.find().then((data) => {
          res.render('ehome', { Pagetitle: "Home", data: data, error:false })
     }).catch((er) => {
          console.log('Not Show Data', er)
     })
}

exports.alldata = async (req, res, next) => {
     try {
          let all = await emp.find()
          return res.render('alldata', { Pagetitle: "all data", data: all, error: false })
     }
     catch (er) {
          console.log('error:', er)
          return res.redirect('/host/alldata')
     }
}

exports.gethome = (req, res, next) => {
     let page = Number(req.query.page) || 1;
     let limit = Number(req.query.limit) || 5;
     let skip = (page - 1) * limit
     emp.find().skip(skip).limit(limit).then((data) => {
          res.render('uhome', { Pagetitle: "Home", data: data, error: false, pagenumber: page + 1, limit: limit })
     }).catch((er) => {
          console.log('Not Show Data', er)
     })
}

exports.getcontactpage = (req, res, next) => {
     res.render('ucontact', { Pagetitle: 'contact' })
}

exports.postontactpage = (req, res, next) => {
     const { name, email, subject, message } = req.body
     const c = new contact({ name, email, subject, message })
     c.save().then(() => {
          res.redirect('/host/contact')
     }).catch((er) => {
          console.log('data is not saved', er)
          res.redirect('/host/contact')
     })
}

exports.postcrud = async (req, res, next) => {
     try {
          const { name, email, mobile, department, role, Joining } = req.body
          let ans = name[0].toUpperCase() + name.slice(1,)
          const Emp = new emp({ name: ans, email, mobile, department, role, Joining })
          await Emp.save()
          res.redirect('/host/alldata')
     }
     catch (error) {
          if (error.message === 'email is already exist..') {
               emp.find().then((data) => {
                    return res.render('alldata', { Pagetitle: "all data", data: data, error: error.message })
               })
          }
          if (error.message === 'mobile number is already exists..') {
               emp.find().then((data) => {
                    return res.render('alldata', { Pagetitle: "all data", data: data, error: error.message })
               })
          }
          else {
               console.log(error)
               return res.status(500).json({ error: 'Internal server error' });
          }
     }
}

exports.posteditemp = async (req, res, next) => {
     try {
          const { name, email, mobile, department, role, Joining, eid } = req.body
          const finddata = await emp.findByIdAndUpdate({ _id: eid }, req.body, {
               new: true, // Return the updated document
               runValidators: true, // Run Mongoose validation
          })
          res.redirect('/host/alldata')
     }
     catch (error) {
          if (error.message === 'email is already exist..') {
               emp.find().then((data) => {
                    res.render('alldata', { Pagetitle: "all data", data: data, error: error.message })
               })
          }
          if(error.message === 'mobile number is already exists..'){
                 emp.find().then((data) => {
                    res.render('alldata', { Pagetitle: "all data", data: data, error: error.message })
               })
          }
          else{
               console.log(error)
               res.status(500).json({ error: 'Internal server error' });
          }
     }
}

exports.geteditemp = (req, res, next) => {
     emp.findById({ _id: req.params.Id }).then((data) => {
          res.render('editmodal', { Pagetitle: "emp data", f: data, error: false })
     })
}

exports.getdelete = (req, res, next) => {
     emp.findByIdAndDelete({ _id: req.params.Id }).then(() => {
          res.redirect('/host')
     }).catch((er) => {
          console.log('not delete id:', er)
          res.redirect('/host')
     })
}

exports.getsearch = (req, res, next) => {
     let sname = req.body.name
     let t=sname.trim()
     let ans = t[0].toUpperCase() + t.slice(1,)
     emp.findOne({ name: ans }).then((data) => {
          if (data == null) {
               res.render('s', { Pagetitle: "emp not find", v: data, e: false })
          }
          else {
               res.render('s', { Pagetitle: "emp find", v: data, e: true })
          }
     }).catch((er) => {
          console.log("Not Find Data...", er)
          res.render('s', { Pagetitle: "emp find", v: data })
     })
}
