var BME280 = require("node-bme280");
var http = require("http");

var bme280 = new BME280({address: 0x76});

http.createServer(function (request, response) {

    bme280.begin(function(err) {
        if (err) {
            console.error("bme280 initializing error",err);
            response.writeHead(500);
            return;
        }

        bme280.readPressureAndTemparature(function(err, pressure, temperature, humidity){
            var jsonData = {
                temperature: temperature,
                humidity: humidity,
                pressure: pressure
            };
            response.writeHead(200, {'Content-Type': 'application/json'});
            response.end(JSON.stringify(jsonData));
        });
	});
}).listen(3000);

console.info("http://localhost:3000/");
