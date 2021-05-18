const http = require('http');
const hostname = 'localhost';
const port = 8080;
function sumDigits(n)
{
    let numArr = n.toString().split("");
    let sum = numArr.reduce(function(a, b){
        return parseInt(a) + parseInt(b);
    }, 0);
    return sum;
}
const server = http.createServer(function(req,res)
{
    console.log('Request for ' + req.url + ' by method ' + req.method);
    if(req.url=='/coins')
    {
        let body = "";
        req.on('data', function(chunk)
        {
            body = body + chunk.toString();
        });
        req.on('end',function()
        {
            console.log(body);
            body=JSON.parse(body);
            var output= 
            {
                coins : sumDigits(parseInt(body.rollno))
            }
            console.log("JSON response to user : "+JSON.stringify(output));
            res.end(JSON.stringify(output));
        });
    }
});
server.listen(port,hostname,function(){
	console.log('Server running at http://localhost:8080')
});
