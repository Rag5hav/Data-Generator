const express = require('express')
const app = express()
const mongoose = require('mongoose');
const Employee = require("./models/employee");
mongoose.connect('mongodb://localhost:27017/company');



const port = 3000


app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', { foo: 'FOO' });
})
app.get('/generate',async (req, res) => {

    await Employee.deleteMany({});

    const getRandom=(arr)=>{
        let ran=Math.random();
        let rno=(ran<0.77)?(Math.floor(ran*(arr.length-1))):arr.length-1;
        return arr[rno];
    }

    let randomNames=["Ram","Sham","Raghav"];
    let randomLang=["New York","Delhi","Saharanpur"];
    let randomCities=["python","java","c++"]

    console.log(getRandom(randomCities))

    for (let index = 0; index < 10; index++) {
        let e = await Employee.create({
            name: getRandom(randomNames),
            salary: Math.floor(Math.random()*100000),
            language:getRandom(randomLang),
            city: getRandom(randomCities),
            isManager: (Math.random()>0.5)?true:false
        })
        console.log(e);

    }

    res.render('index', { foo: 'FOO' });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})