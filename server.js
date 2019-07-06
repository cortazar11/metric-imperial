const express=require('express');
const helmet=require('helmet');
const cors = require('cors');
const bodyParser=require('body-parser');
const axios=require('axios');

const app=express();
app.use(cors());

app.use(bodyParser.json())

// User story 1
app.use(helmet.noSniff())

// User story 2
app.use(helmet.xssFilter())

const operator=(param)=>{
    let obj={}
    const input=param;
    const re=/(\d)/g
    const arr=input.split(re)
    const type=arr.splice(arr.length-1).toString()
    let returnNum=0;
    let num=eval(arr.join(''))
   
    switch(type){
        case 'gal':
            returnNum=num/0.26417;
            
            obj={
                initNum: num,
                initUnit:'gal',
                returnNum: returnNum,
                returnUnit:'l',
                string: `${num} gallons convert to ${returnNum} liters`
               
            }
            
            break;
        case 'L':
            returnNum=num * 0.26417;
            obj={
                initNum: num,
                initUnit:'l',
                returnNum: returnNum,
                returnUnit:'gal',
                string: `${num} liters convert to ${returnNum} gallons`
               
            }
            break;
        case 'lbs':
            returnNum=num/2.2046
            obj={
                initNum: num,
                initUnit:'lbs',
                returnNum: returnNum,
                returnUnit:'kg',
                string: `${num} pounds convert to ${returnNum} kilograms`
               
            }
            break;

        case 'kg':
            returnNum= num * 2.2046
            obj={
                initNum: num,
                initUnit:'kg',
                returnNum: returnNum,
                returnUnit:'lbs',
                string: `${num} kilograms convert to ${returnNum} pounds`
               
            }
            break;
        case 'mi':
            returnNum=num * 1.609344;
            obj={
                initNum: num,
                initUnit:'mi',
                returnNum: returnNum,
                returnUnit:'lbs',
                string: `${num} miles convert to ${returnNum} kilometers`
               
            }
            break;
        case 'km':
            returnNum=num /1.609344;
            obj={
                initNum: num,
                initUnit:'km',
                returnNum: returnNum,
                returnUnit:'mi',
                string: `${num} kilometers convert to ${returnNum} miles`
               
            }
            break;
        default:
            obj={
                error: 'invalid unit'
            }
        
    }

    return obj;
}







// User story 5
app.post('/api/convert',(req,res)=>{
    const input=req.body.input;
    if(input){
        const result=operator(input)
        
        res.send(result)
    }
    
})

app.get('/api/convert', (req,res)=>{
    const input=req.query.input;
    if(input){
        const result=operator(input)
        
        res.send(result)
    }
    
})

if(process.env.NODE_ENV==="production"){
    app.use(express.static('client/build'))

    const path=require('path');
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('Server running')
})