
var express = require("express");
var router = express.Router();
const bcrypt = require("bcryptjs");
//const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
// Load User model
const User = require("../models/Users");
const Jobs = require("../models/Jobs");
const Recruiter = require("../models/Recruiter");

const validateRegister = require("../validation/register");
const validateProfileA = require("../validation/Profile_A");
const validateLogin = require("../validation/login");
const validatejobs = require("../validation/jobs");
const validateRegister_R = require("../validation/register_R");
const editProfileR = require("../validation/editProfile_R");
const Application = require("../models/Application");
const { application } = require("express");
// GET request 
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
            console.log(err);
        } else {
            res.json(users);
        }
    })
});

router.post("/Jlist", (req, res) => {
    Jobs.find({ email: req.body.email }).then(job => {
        if( job.rempositions !== 0 )
            res.json(job);
    })
})

router.post("/Jlist_A", (req, res) => {
    Jobs.find().then(job => {
        res.json(job);
    })
})


router.post("/editprofile_R", function (req, res) {
    const { errors, isValid } = editProfileR(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
     Recruiter.updateOne({email: req.body.email}, { $set: { name: req.body.name, contactno: req.body.contactno, bio: req.body.bio }})
    .then(data =>{
        res.json(data);
        console.log(data);
    } )
    .catch(err =>{res.status(400).send(err)
    console.log(err);})    
})

router.post("/Profile_R")
router.post("/Profile_A", function (req,res)
{
    const { errors, isValid } = validateProfileA(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    User.updateOne({email: req.body.email}, { $set: { name: req.body.name, skills: req.body.skills, education: req.body.education }})
    .then(data =>{
        res.json(data);
    } )
    .catch(err =>{res.status(400).send(err)
    console.log(err);})
})



router.post("/Jobs", (req, res) => {

    const { errors, isValid } = validatejobs(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log(req.body);
    const newUser = new Jobs({
        name: req.body.name,
        email: req.body.email,
        JobTitle: req.body.JobTitle,
        salary: req.body.salary,
        applications: req.body.applications,
        jobtype: req.body.jobtype,
        positions: req.body.positions,
        duration: req.body.duration,
        deadline: req.body.deadline,
        postdate: req.body.postdate,
        skills: req.body.skills,
        rating:req.body.rating,
        rempositions: req.body.positions,
        remapplications: req.body.applications,
    });
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
    });

router.post("/appnocheck", (req, res) => {
    var size = 0;
    console.log(req.body);
    Application.find({ useremail:req.body.email}).then(application => {
        console.log(application);
        console.log("ayushgoti");
        var i;
        for(i=0;i<application.length;i++)
        {
            if(application[i].stageofapplication === 'applied' || application[i].stageofapplication === 'shortlisted')
             {
                 size = size + 1;
             }
         }
         if(size > 10)
         {
             res.json("No");
         }
         else
         {
             res.json("Yes");
         }
    })
    .catch(err => {
        res.status(400).send(err);
    });
    console.log("kartik")
    console.log(size);  
   
}); 
router.post("/Alist_R",(req,res) => {
// var appl = [];
// Application.find({ jobid: req.body.id}).then(application => {
//  for(var i=0;i<application.length;i++)
//  {  
// if(application[i].stageofapplication !== 'rejected' && application[i].stageofapplication !== 'accepted')
//         appl.push(application[i]);
//  }    
//     res.json(appl);
var appl = [],cpyappl = [],resarr = [],resarr2 = [];
Application.find().then(application => {
    appl = application;
    cpyappl = application;
    var i;
    console.log(req.body.id);
    for (i = 0; i < appl.length; i++) {
        if (appl[i].jobid == req.body.id) {
            console.log("sex");
            if (appl[i].stageofapplication !== "accepted" && appl[i].stageofapplication !== "rejected") {
                var user = appl[i].useremail;
                var j, count = 0, sum = 0;
                for (j = 0; j < cpyappl.length; j++) {
                    if (cpyappl[j].useremail === user && cpyappl[j].stageofapplication === "accepted") {
                        if (cpyappl[j].recrating !== 0) {
                            sum = sum + cpyappl[j].recrating;
                            count = count + 1;
                        }
                    }
                }
                if (count !== 0)
                    sum = sum / count;
                
                resarr2.push(sum);
                resarr.push(appl[i]);
                console.log(resarr2);
                //resarr.push(temp);
            }
        }
    }
    let data = {
        application: resarr,
        rating: resarr2
    }
    console.log("daler");
    console.log(data)
    res.json(data);
});
});

router.post("/Alist_A",(req,res) => {
var jobs = [];
console.log(req.body.email);
Application.find({useremail: req.body.email}).then(application => {
    res.json(application);
})
.catch(err => {
    res.status(400).send(err);
});
});   

router.post("/applicationcheck", (req, res) => {
 
Application.find({ useremail:req.body.email}).then(Application => {

    res.json(Application);
})
.catch(err => {
    res.status(400).send(err);
});
});

router.post("/delete",(req,res)=> {
     Jobs.deleteOne({_id: req.body.id}).then(res=> {console.log(res.data)})
     .catch(err => {
        res.status(400).send(err);
    });
})

router.post("/updatestage",(req,res) => {
Application.updateOne({ _id: req.body.id },{$set: {stageofapplication: req.body.upstage}}).then(res=> {res.json("ok")}).catch(err => {
    res.status(400).send(err);
});
Application.find({_id: req.body.id }).then (application => {
    if(application.stageofapplication === 'accepted')
    Jobs.updateOne({_id: application.jobid}, { $inc: { rempositions: -1 }}).then(r =>{ console.log(r)}).catch(err => console.log(err));
}).catch(err => {
    res.status(400).send(err);
});    

})

router.post("/employee", (req, res) => {
    var appl = [],cpyappl = [],resarr = [],resarr2 = [];
    Application.find().then(application => {
        appl = application;
        cpyappl = application;
        var i;
        for (i = 0; i < appl.length; i++) {
            if (appl[i].recemail === req.body.email) {
                if (appl[i].stageofapplication === "accepted") {
                    var user = appl[i].useremail;
                    var j, count = 0, sum = 0;
                    for (j = 0; j < cpyappl.length; j++) {
                        if (cpyappl[j].useremail === user && cpyappl[j].stageofapplication === "accepted") {
                            if (cpyappl[j].recrating !== 0) {
                                sum = sum + cpyappl[j].recrating;
                                count = count + 1;
                            }
                        }
                    }
                    if (count !== 0)
                        sum = sum / count;
                    
                    resarr2.push(sum);
                    resarr.push(appl[i]);
                    console.log(resarr2);
                    //resarr.push(temp);
                }
            }
        }
        let data = {
            application: resarr,
            rating: resarr2
        }
        console.log("daler");
        console.log(data)
        res.json(data);
    });
});
// router.post("/employee",(req,res) => {
//     const appl = [];
//     Application.find({ recemail:req.body.email}).then(application => {
//         console.log(application);
//         for(var i=0;i<application.length;i++)
//         {
//         let arr1 = application[i];    
//         arr1['applrating'] = 0;
//         console.log("Sexy booty");
//         console.log(arr1);    
//         if(application[i].stageofapplication === 'accepted')
//         {
//             Application.find({ useremail: application[i].useremail }).then( app =>{
//                 var avgrating = 0 ;
//                 var sumrating = 0;
//                 var count = 0;
//                 for(var j=0;j<app.length;j++)
//                 {
//                  if(app[j].stageofapplication === 'accepted')
//                  {    
//                     sumrating = sumrating + app[j].recrating;
//                     count = count + 1;
//                  }
//                 }
//                 if(count !== 0)
//                 {
//                 avgrating = sumrating/count;
//                 arr1['applrating'] = avgrating;
//                 } 
//             }).catch(err => {
//                 res.status(400).send(err);
//             });
//             console.log("lamba");
//             console.log(arr1); 
//             appl.push(arr1);
//         }
//         }   
//         res.json(appl);
//     })
//     .catch(err => {
//         res.status(400).send(err);
//     });
// });

router.post("/editjob",(req,res) => {

    Jobs.updateOne({_id: req.body.id},{$set: {applications: req.body.applications,positions: req.body.positions,deadline: req.body.deadline, remapplications: req.body.applications, rempositions: req.body.positions}}).then( res => {console.log(res.data)}) .catch(err => {
        res.status(400).send(err);
    });
});
router.post("/applicationrating", (req,res) =>{
    console.log(req.body.rating);
    Application.updateOne({_id: req.body.id},{$set: {rating: req.body.rating}}).then(r => console.log(r)).catch(err => console.log(err));
})

router.post("/recrating", (req,res) =>{
    console.log(req.body.rating);
    Application.updateOne({_id: req.body.id},{$set: {recrating: req.body.rating}}).then(r => console.log(r)).catch(err => console.log(err));
})
router.post("/application", (req, res) => {

    // const { errors, isValid } = validateSOP(req.body);
    // if (!isValid) {
    //     return res.status(400).json(errors);
    // }
    User.findOne({ email:req.body.email}).then(user => {
    //console.log(user.email);
    var newUser = new Application({
        name: user.name,
        useremail: user.email,
        education: user.education,
        skills: user.skills,
        rating:req.body.rating,
    }); 
    Jobs.updateOne({_id: req.body.id}, { $inc: { remapplications: -1 }}).then(r => console.log(r)).catch(err => console.log(err));
    Jobs.findOne({_id:req.body.id}).then( job=>{
        // console.log(job);
        // console.log("shreyash");
        newUser['recemail'] = job.email;
        newUser['recname'] = job.name;
        newUser['JobTitle'] = job.JobTitle;
        newUser['salary'] = job.salary; 
        newUser['jobid'] = req.body.id;    
        newUser['SOP'] = req.body.SOP;
        newUser['jobtype'] = job.jobtype;
        newUser.save()
                .then(user => {
                    res.status(200).json(user);
                    console.log(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
    }).catch(err => {
        res.status(400).send(err);
    });
    //Jobs.updateOne({_id: req.body.id}, { $inc: { remapplications: -1 }});
            
    });
});
// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request 
// Add a user to db
router.post("/register_r", (req, res) => {

    const { errors, isValid } = validateRegister_R(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log(req.body);
    const newUser = new Recruiter({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        contactno: req.body.contactno,
        bio: req.body.bio,
        UserType: req.body.UserType
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err; }
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        });
    });
});

router.post("/register", (req, res) => {

    const { errors, isValid } = validateRegister(req.body);
    if (!isValid) {
        return res.status(400).json(errors);
    }
    console.log(req.body);
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        skills: req.body.skills,
        UserType: req.body.UserType,
    });
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) { throw err; }
            newUser.password = hash;
            newUser.save()
                .then(user => {
                    res.status(200).json(user);
                })
                .catch(err => {
                    res.status(400).send(err);
                });
        });
    });
});

// POST request 
// Login
router.post("/login", (req, res) => {
    const { errors, isValid } = validateLogin(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const email = req.body.email;
    const password = req.body.password;

    User.findOne({ email })
        .then(user => {
            if (!user) {

                Recruiter.findOne({ email })
                    .then(recruiter => {
                        if (!recruiter) {
                            return res.status(404).json({ emailnotfound: "this email is not registered.You can register by going to registration page" });
                        }

                        bcrypt.compare(password, recruiter.password).then(isMatch => {
                            if (isMatch) {
                                const payload = {
                                    id: recruiter.id,
                                    name: recruiter.name,
                                    email: recruiter.email,
                                    password: recruiter.password,
                                    rating: recruiter.rating,
                                    bio: recruiter.bio,
                                    contactno: recruiter.contactno,
                                    UserType: recruiter.UserType
                                };
                                return res.json(payload);
                            }
                            else {
                                return res.status(400).json({ passwordincorrect: "Incorrect Password" });
                            }
                        });
                    });
            }
            // console.log("yoyoyoyo");
            bcrypt.compare(password, user.password).then(isMatch => {
                if (isMatch) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        education: user.education,
                        email: user.email,
                        password: user.password,
                        rating: user.rating,
                        skills: user.skills,
                        UserType: user.UserType
                    };
                    res.json(payload);
                }
                else {
                    return res.status(400).json({ passwordincorrect: "Incorrect Password" });
                }
            });

        }
        );
}
);


module.exports = router;

