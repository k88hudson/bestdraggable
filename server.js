var express = require('express'),
    lessMiddleware = require('less-middleware'),
    app = express.createServer(express.logger()),
    port = 1989,
    dirname = __dirname;

 app.use(lessMiddleware({
        src: dirname,
        compress: false
    }));

app.use(express.static(dirname));

app.listen(port, function() {
  console.log("serving on port " + port + " files in " + dirname);
});
