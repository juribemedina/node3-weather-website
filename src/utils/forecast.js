const request = require('request')

const forecast = (long, lat, callback) =>{
    const url = 'http://api.weatherstack.com/current?&access_key=ddb0a4b7a9ff145278c68fd79e9fb753&query=' + lat + ',' + long

    request({url, json: true}, (error, { body }) => {
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if(body.error){
            callback('Incorrect location', undefined)
        } else {
            callback(undefined, {
                temp: body.current.temperature,
                feel: body.current.feelslike,
                desc: body.current.weather_descriptions[0]
            })
        }
    })
}

module.exports = forecast
