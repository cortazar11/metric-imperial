import React from 'react';
import axios from 'axios';

class App extends React.Component{

    state={
        input: ''
    }

    onChange=(e)=>{
        e.preventDefault()
        const value=e.target.value;
        this.setState({
            input: value
        })
    }

    onSubmit=(e)=>{
        e.preventDefault()
        console.log('submit: '+this.state.input)
        axios.post("/api/convert",{input:this.state.input})
            .then((res)=>{
                console.log('axios result: '+res)
            }).catch(console.error)
    }
    

    render(){
        return (
            <div>
                <h2>ISQA_2 - Metric/Imp Converter</h2>
                <h3>User Stories</h3>
                <ol>
                        <li>I will help prevent the client from trying to guess(sniff) the MIME type.</li>
                        <li>I will prevent cross-site scripting (XSS) attacks.</li>
                        <li>I can GET /api/convert with a single parameter containing an accepted number and unit and have it converted.</li>
                        <li>Hint: Split the input by looking for the index of the first character.</li>
                        <li>I can convert 'gal' to 'L' and vice versa. (1 gal to 3.78541 L)</li>
                        <li>I can convert 'lbs' to 'kg' and vice versa. (1 lbs to 0.453592 kg)</li>
                        <li>I can convert 'mi' to 'km' and vice versa. (1 mi to 1.60934 km)</li>
                        <li>If my unit of measurement is invalid, returned will be 'invalid unit'.</li>
                        <li>If my number is invalid, returned with will 'invalid number'.</li>
                        <li>If both are invalid, return will be 'invalid number and unit'.</li>
                        <li>I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.</li>
                        <li>My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format </li>
                        <li>All 16 unit tests are complete and passing.</li>
                        <li>All 5 functional tests are complete and passing.</li>
                    </ol>
                    <h3>Example usage:</h3>
                            /api/convert?input=4gal<br/>
                            /api/convert?input=1/2km<br/>
                            /api/convert?input=5.4/3lbs<br/>
                            /api/convert?input=kg<br/>
                    <h3>Example return:</h3>
                    <h2>Front-End:</h2>
                    <form onSubmit={this.onSubmit}>
                        <input type="text" name="input" onChange={this.onChange} value={this.state.input} />
                        <button type="submit">Convert!</button>
                    </form>
                    <div id="result"></div>
            </div>
                    
        )
    }
    
}

export default App;