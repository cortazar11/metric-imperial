const express=require('express');
const helmet=require('helmet');
const bodyParser=require('body-parser');

const app=express();

app.use(express.static('public'))

app.use(bodyParser.urlencoded({extended: true}))

// User story 1
app.use(helmet.noSniff())

// User story 2
app.use(helmet.xssFilter())

// User story 5
app.get('/api/convert',(req,res,next)=>{
        const input=req.query.input
         console.log('input: '+input)       
        const re=/\d*[\.|\/]*\d*/g

        const result=re.exec(input)
        const index=re.lastIndex;
        const type=input.substring(index);
        
       
        let num=0;
        if (result===null){
            num=1
        } else {
            num=eval(result[0])
        }
        
        let returnNum=0;
        let initUnit, returnUnit,  str1, str2, error='';
        let obj={};
       
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
        
        res.send(obj)
})

app.post('/',(req,res,next)=>{
    const data=req.body.data
    console.log(data)
    res.redirect('/api/convert')
})

app.listen(8080,()=>{
    console.log('Server running')
})