const express = require('express')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())

const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/test')
.then(()=> console.log("mongodb connected"))
.catch((err)=> console.log("error occured",err))

const itemSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  }
})
const collection = new mongoose.model('items', itemSchema);
module.exports = collection



app.get('/', async (req, res) => {
  console.log("default route");
  try {
    const result = await collection.find();  
    console.log("data", result);
    res.json(result);  
  } catch (err) {
    console.log("error occurred", err);
    res.status(500).send("Error occurred");
  }
});

app.put('/edit-items', async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) return res.status(400).send("Missing data");

  try {
    const updated = await collection.findByIdAndUpdate(id, { name }, { new: true });
    if (!updated) return res.status(404).send("Item not found");
    res.status(200).send("Updated successfully");
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).send("Server error");
  }
});


app.delete('/delete-item/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const deletedItem = await collection.findByIdAndDelete(id);
    if (!deletedItem) {
      return res.status(404).send('Todo not found');
    }
    res.status(200).send('Todo deleted successfully');
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).send('Server error');
  }
});

app.listen(3000,()=>{
    console.log("server started running on port 3000")
})


app.post('/add-item', async (req, res) => {
  try {
    const newItem = await collection.create({ name: req.body.name });
    console.log("Added successfully:");
    res.send("Added successfully");
  } catch (err) {
    console.error("Error occurred:");
    res.send("Error");
  }
});
































// const express = require('express')
// const cors = require('cors')
// const app = express()
// app.use(cors())
// app.use(express.json())

// const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/test')
// .then(()=> console.log("mongodb connected"))
// .catch((err)=> console.log("error occured",err))

// const itemSchema = new mongoose.Schema({
//   name:{
//     type:String,
//     required:true
//   }
// })
// const collection = new mongoose.model('items', itemSchema);
// module.exports = collection



// app.get('/', async (req, res) => {
//   console.log("default route");
//   try {
//     const result = await collection.find();  
//     console.log("data", result);
//     res.json(result);  
//   } catch (err) {
//     console.log("error occurred", err);
//     res.status(500).send("Error occurred");
//   }
// });

// app.put('/edit-items', async (req, res) => {
//   const { id, name } = req.body;
//   if (!id || !name) return res.status(400).send("Missing data");

//   try {
//     const updated = await collection.findByIdAndUpdate(id, { name }, { new: true });
//     if (!updated) return res.status(404).send("Item not found");
//     res.status(200).send("Updated successfully");
//   } catch (err) {
//     console.error("Update error:", err);
//     res.status(500).send("Server error");
//   }
// });



// app.listen(3000,()=>{
//     console.log("server started running on port 3000")
// })
// app.post('/add-item', async (req, res) => {
//   try {
//     const newItem = await collection.create({ name: req.body.name });
//     console.log("Added successfully:");
//     res.send("Added successfully");
//   } catch (err) {
//     console.error("Error occurred:");
//     res.send("Error");
//   }
// });



















































































































































