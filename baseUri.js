const http = require("http");
const formidable = require("formidable");
const fs = require("fs");
const server = http.createServer((req, res) => {
  if (req.url === "/api/upload" && req.method.toLowerCase() === "post") {
    // parse a file upload
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      new Promise((resolv, rej) => {
        res.writeHead(200, { "content-type": "text/html" });
        const data = files.multipleFiles;
        res.write(
          "<title>Sharkbyteprojects BASEuri GENerator</title><h1>Sharkbyteprojects BASEuri GENerator</h1>\n"
        );
        if (Array.isArray(data)) {
          data.forEach((file) => {
            const syncr = fs.readFileSync(file.path);
            const base = `data:${file.type};base64,${syncr.toString("base64")}`;
            res.write(
              `<pre>${file.name}: <a href="${base}">${base}</a>\n\n</pre>`
            );
          });
        } else {
          const file = data;
          const syncr = fs.readFileSync(file.path);
          const base = `data:${file.type};base64,${syncr.toString("base64")}`;
          res.write(
            `<pre>${file.name}: <a href="${base}">${base}</a>\n\n</pre>`
          );
        }
        resolv();
      }).then(
        () => {
          res.end('<a href="/">Back</a>');
        },
        () => {}
      );
    });

    return;
  }

  // show a file upload form
  res.writeHead(200, { "content-type": "text/html" });
  res.end(`
    <title>Sharkbyteprojects BASEuri GENerator</title>
    <h1>Sharkbyteprojects BASEuri GENerator</h1>
    <form action="/api/upload" enctype="multipart/form-data" method="post">
      <div>File(s): <input type="file" name="multipleFiles" multiple="multiple" /></div>
      <input type="submit" value="Upload" />
    </form>
  `);
});

server.listen(8080, () => {
  console.log("Server listening on http://localhost:8080/ ...");
});
