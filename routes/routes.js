const { error } = require("console");
const express = require("express");
const fs = require("fs");
const todoRoutes = express.Router();

todoRoutes.get("/todos", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      res.status(500).json({ Mess: "Internal server Error" });
    }
    {
      res.send(JSON.parse(data));
    }
  });
});

todoRoutes.post("/addTodo", (req, res) => {
  let newdata = req.body;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return;
    }
    let dbjsondata = JSON.parse(data);
    dbjsondata.todos.push(newdata);

    fs.writeFile("./db.json",JSON.stringify(dbjsondata, null, 2),"utf8",(err) => {
        if (err) {
          console.error("Error writing file:", err);
        } else {
          console.log("Data successfully appended to db.json");
          res.send("Created Succesfully");
        }
      }
    );
  });
});

todoRoutes.post('/updatetodo' , (req,res) => {

    fs.readFile("./db.json" , "utf-8" , (err,data) => {
      if(err){
        console.log(error)
      }

    let dbdata = JSON.parse(data)


    dbdata.todos.forEach(todo => {
      if(todo.status === false){
        todo.status = true
      }
    }) 

    fs.writeFile('./db.json' , JSON.stringify(dbdata ,null,2) ,"utf-8" ,(err) =>{
      if(err){
        console.error('Error writing file:', err);
        return res.status(500).json({ message: 'Error saving data' });
      }
      console.log('Todos updated successfully');
      res.status(200).json({ message: 'Todos updated successfully' });
    })
    })
})


todoRoutes.delete("/deletetodo", (req, res) => {
  fs.readFile('./db.json', 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ message: 'Internal server error' });
    }

    let dbjsondata = JSON.parse(data);
    const updatedTodos = dbjsondata.todos.filter(todo => !todo.status); 

    if (dbjsondata.todos.length === updatedTodos.length) {
      return res.status(404).json({ message: 'No completed todos found' });
    }

    dbjsondata.todos = updatedTodos;
    fs.writeFile('./db.json', JSON.stringify(dbjsondata, null, 2), 'utf8', (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error saving data' });
      }
      res.status(200).json({ message: 'Completed todos deleted successfully' });
    });
  });
});

module.exports = { todoRoutes };
