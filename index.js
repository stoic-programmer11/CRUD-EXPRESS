

const express = require('express');
const path = require('path');
const fs = require('fs/promises');



const app = express();
app.use(express.json());

const jsonPath = path.resolve('./file/todoList.json');

app.get('/tasks', async (req, res) => {

    const jsonFile = await fs.readFile(jsonPath, 'utf8');
    res.send(jsonFile);

})

app.post('/tasks', async (req, res) => {

    const task = req.body;
    const tasksArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

    // Para el indice
    const lastIndex = tasksArray.length - 1;
    const newId = tasksArray[lastIndex].id + 1;
    tasksArray.push({ ...task, id: newId });
    await fs.writeFile(jsonPath, JSON.stringify(tasksArray));
    res.end();
})


app.put('/tasks', async (req, res) => {

    const task = req.body;
    const idTask = task.id;
    const tasksArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

    const taskIndex = tasksArray.findIndex(task => task.id === idTask);

    // if (tasksArray[taskIndex].status === true) {
    //     tasksArray[taskIndex].status = false;
    // }
    // else {
    //     tasksArray[taskIndex].status = true;
    // }

    tasksArray[taskIndex].status === true ?
        tasksArray[taskIndex].status = false :
        tasksArray[taskIndex].status = true;

    await fs.writeFile(jsonPath, JSON.stringify(tasksArray));
    res.end();

})

app.delete('/tasks', async (req, res) => {
    const { id } = req.body;

    const tasksArray = JSON.parse(await fs.readFile(jsonPath, 'utf8'));

    const taskIndex = tasksArray.findIndex(task => task.id === id);
    tasksArray.splice(taskIndex, 1);

    await fs.writeFile(jsonPath, JSON.stringify(tasksArray));

    res.end()
})



const PORT = 8000;

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});