const request = require('request')

const forecast = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=fbb67e0cab01405a82ac597d26c74640&query=' + encodeURIComponent(lat) + ',' + encodeURIComponent(long) + '&units=f'


    request({ url, json: true }, (error, response) => {

        const { body } = response
        const { current } = body

        if (error) {
            callback('Unable to connect to weather service!')
        } else if (body.error) {
            callback('Unable to find location')
        } else {
            callback(undefined, {
                temp: current.temperature,
                feelsLike: current.feelslike,
                forecast: 'The temperature is ' + current.temperature + ' degrees. It feels like ' + current.feelslike + ' degrees out.'
            })
        }
})
}

module.exports = forecast