var ObjectID = require('mongodb').ObjectID;
module.exports = function(app, db) {

  app.get('/admin', function(req,res){
    const data = db.collection('subjects').find().toArray((err, subjects) => {
      if (err){
        res.send({'error':'An error has occurred'});
      } else {
        // res.send(units);
        const tutorData = db.collection('tutors').find().toArray((err, tutors)=>{
          if (err){
            res.send({'error':'An error has occurred'});
          }else {
              res.render('index.ejs', { "subjects": subjects, "tutors":tutors })
          }
        })

      }
  });});



 app.get('/units/:id', (req, res) => {
   const id = req.params.id;
   const details = { '_id': new ObjectID(id) };
   db.collection('units').findOne(details, (err, item) => {
     if (err) {
       res.send({'error':'An error has occurred'});
     } else {
       res.send(item);
     }
   });
 });

app.get('/gg', (req, res)=> {
  const data = db.collection('units').find({}).toArray((err, units) => {
    if (err){
      res.send({'error':'An error has occurred'});
    } else {
      // res.send(units);
      res.render('hi.ejs', { "units": units })
    }
  });
})

 app.delete('/units/:id', (req, res) => {
    const id = req.params.id;
    const unitDetails = { '_id': new ObjectID(id) };
    db.collection('units').remove(unitDetails, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Unit ' + id + ' deleted!');
      }
    });
  });

  app.put('/units/:id', (req, res) => {
     const id = req.params.id;
     const details = { '_id': new ObjectID(id) };
     const note = { text: req.body.text, title: req.body.title };
     db.collection('units').update(details, note, (err, result) => {
       if (err) {
           res.send({'error':'An error has occurred'});
       } else {
           res.send(note);
       }
     });
   });

app.post('/units', (req, res) => {
   const note = { description: req.body.text, title: req.body.title, subjectid: req.body.subID, unitno: req.body.uniID, tutorid: req.body.teachID, urlid: req.body.urlID };
   console.log(note);
   db.collection('units').insert(note, (err, result) => {
     if (err) {
       res.send({ 'error': 'An error has occurred' });
     } else {
       res.send(result.ops[0]);
     }
   });
 });

var subid
 // subject page

 app.get('/subject', (req, res)=>{
   const data = db.collection('subjects').find({}).toArray((err, subjects) => {
     if (err){
       res.send({'error':'An error has occurred'});
     } else {
       // res.send(units);
       res.render('subject.ejs', { "subjects": subjects })
     }
   });
 });
 app.post('/subject',(req, res)=>{
   subid = req.body.subject;
   console.log(subid);
   console.log('hello22');
 });

 app.get('/tutor', (req, res)=>{
   const data = db.collection('tutors').find({subjectid:subid}).toArray((err, tutors) => {
     if (err){
       res.send({'error':'An error has occurred'});
     } else {
       // res.send(units);
       res.render('tutors.ejs', { "tutors": tutors })
     }
   });
 });

var tuid;

app.post('/tutor',(req, res)=>{
  tubid = req.body.tutor;
  console.log(tubid);
  console.log('hello2');
});


 app.get('/syllabus', (req, res)=>{
   var query = {'subjectid':subid,'tutorid':tubid}
   const data = db.collection('units').find({subjectid:subid}).toArray((err, units) => {
     if (err){
       res.send({'error':'An error has occurred'});
     } else {
       // res.send(units);
       res.render('syllabus.ejs', { "units": units })
     }
   });
 });


 app.get('/unit', (req, res)=>{
   const data = db.collection('units').find({subjectid:"sub01"}).toArray((err, units) => {
     if (err){
       res.send({'error':'An error has occurred'});
     } else {
       // res.send(units);
       res.render('units.ejs', { "units": units })
     }
   });
 });
 // app.post('/subject', (req, res)=>{
 //   console.log(req.body.School);
 // });

};
