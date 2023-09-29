import http from 'k6/http'
import {sleep, check} from 'k6'

export const options ={
    stages: [
        { duration: '1m', target: 2000 },
        
        {duration: '30s', target: 0}
    ]
}


export default function(){
    const url = 'http://localhost:4600/user/login'
    const body = JSON.stringify({
        Email: 'david.mwangi@thejitu.com',
        PasswordHash: '12345678'
    })

    const params = {
        headers: {
            'Content-Type': 'application/json'
        }   
    }

    const response = http.post(url, body, params)

    check(response, {
        'if the status is 200': (res)=>res.status === 200,
        'if user logged in': (res)=> res.body.includes('Logged in Succesful')
    })
    sleep(1)
}