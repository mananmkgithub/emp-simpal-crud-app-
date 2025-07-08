const emp = require('../model/emp')
const contact = require('../model/contact')

exports.home=(req,res,next)=>{
     emp.find().then((data) => {
        res.render('ehome', { Pagetitle: "Home", data: data, error: false })
    }).catch((er) => {
        console.log('Not Show Data', er)
    })
}

exports.getemp = (req, res, next) => {
     emp.find().then((data) => {
          res.render('u', { Pagetitle: "emp data", data: data })
     }).catch((er) => {
          console.log('Not Show Data', er)
     })
}


exports.gethome = (req, res, next) => {
     emp.find().then((data) => {
          res.render('uhome', { Pagetitle: "Home", data: data, error: false })
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
          const data = await Emp.save()
          return res.render('uhome', { Pagetitle: "emp data", data: data, error: false })
     }
     catch (error) {
          if (error.message === 'email is already exist..') {
               emp.find().then((data) => {
                    return res.render('uhome', { Pagetitle: "emp data", data: data, error: error.message })
               })
          } else if (error.message === 'mobile number is already exists.') {
               emp.find().then((data) => {
                    return res.render('uhome', { Pagetitle: "emp data", data: data, error: error.message })
               })
          }
          else {
               res.status(500).json({ error: 'Internal server error' });
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
          res.redirect('/host/crud')
     }
     catch (error) {
            if (error.message === 'email is already exist..') {
               emp.findById({ _id: req.body.eid }).then((data) => {
                    res.render('editmodal', { Pagetitle: "emp data", f: data, error: error.message })
               })
          } else if (error.message === 'mobile number is already exists.') {
               emp.find().then((data) => {
                    return res.render('uhome', { Pagetitle: "emp data", data: data, error: error.message })
               })
          }
          else {
               res.status(500).json({ error: 'Internal server error' });
          }
     }
}

exports.geteditemp = (req, res, next) => {
     emp.findById({ _id: req.params.Id }).then((data) => {
          res.render('editmodal', { Pagetitle: "emp data", f: data, error:false })
     })
}

exports.getdelete = (req, res, next) => {
     emp.findByIdAndDelete({ _id: req.params.Id }).then(() => {
          res.redirect('/host/crud')
     }).catch((er) => {
          console.log('not delete id:', er)
          res.redirect('/host/crud')
     })
}

exports.getsearch = (req, res, next) => {
     let sname = req.body.name
     let ans = sname[0].toUpperCase() + sname.slice(1,)
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
