function parseBody(req) {
  return new Promise((resolve, reject) => {
    let body = "";
    //na
    //body="{na",
    //me
    //&body="{name:"
    //am
    //body={name:am}
    //body={name:amine},
   // {"name":"amine"}

    req.on("data", (chunk) => {
      body += chunk.toString();
    });

    req.on("end", () => {
      try {
        const parsed = JSON.parse(body);
        resolve(parsed);
      } catch (err) {
        reject("Invalid JSON");
      }
    });
  });
}

module.exports = parseBody;
