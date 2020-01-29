const pdf = require('html-pdf');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const student = {
    name: "divya", 
    rollno: "1611061"
};

const generateReport = student => {
    ejs.renderFile("./hallticket.ejs", {student: student}, (err, data) => {
        if(err) {
            console.log(err);
        }
        else {
            console.log(data);
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            const filename = `hallticket${new Date().getTime()}.pdf`;
            console.log(filename);
            pdf.create(data, options).toFile(filename, (err, data) => {
                if(err) {
                    console.log(err);
                }
                else {
                    console.log('file created');
                }
            });
        }
    })
} 



app.get('/download', (req, res) => {
    const student = req.body.student;
    ejs.renderFile("./hallticket.ejs", {student: student}, (err, data) => {
        if(err) {
            res.send(err);
        }
        else {
            let options = {
                "height": "11.25in",
                "width": "8.5in",
                "header": {
                    "height": "20mm"
                },
                "footer": {
                    "height": "20mm",
                },
            };
            const filename = `hallticket${new Date().getTime()}.pdf`;
            const absPath = path.join(__dirname + '/' + filename);
            const relPath = path.join(`./${filename}`);
            pdf.create(data, options).toFile(filename, (err, data) => {
                if(err) {
                    res.send(err);
                }
                else {
                    res.download(absPath, (err) => {
                        if(err) {
                            console.log(err);
                        }
                        fs.unlink(relPath, err => {
                            if(err) {
                                console.log(err);
                            }
                            console.log(`${filename} deleted!`);
                        })
                    })
                }
            });
        }
    })
})

app.post('/oauth/callback', (req, res) => {
    console.log(req.body);
    res.send('hello');
});
