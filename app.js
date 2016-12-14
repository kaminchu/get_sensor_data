var path = require('path');
var exec = require('child_process').exec;
var http = require('http');
var child;

var workDir = path.dirname(process.argv[1]);

http.createServer(function (request, response) {

	child = exec("python " + workDir + "/denpa-gardening/get_sensor_data.py", function (error, stdout, stderr) {
		var splitData = stdout.trimRight().split(",");
		var jsonData = {
			date: splitData[0],
			temp: parseFloat(splitData[1]),
			hum: parseFloat(splitData[2]),
			pressure: parseFloat(splitData[3])
		}
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify(jsonData));
	});
}).listen(3000);




