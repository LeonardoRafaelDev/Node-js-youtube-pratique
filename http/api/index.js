const http = require('http')
const URL = require('url')
const fs = require('fs')
const path = require('path')

const data = require('./urls.json')

function writeFile(cb){
      fs.writeFile(
            //caminho
            path.join(__dirname, "urls.json"), 
            //dados
            JSON.stringify(data,null,2)),
            //callback
            err => {
                  if(err) throw err

                  cb(JSON.stringify({message: 'ok'}))
            }
}

http.createServer((req, res) => {
      const {name, url, del} = URL.parse(req.url, true).query

      res.writeHead(200,{
            'Acess-Control-Allow-Origin': '*',
      })
      // todos caminhos 
      if(!name || !url)
            return res.end(JSON.stringify(data))

      if(del){
            data.urls = data.urls.filter(item => String(item.url) !== String(url))
            //return pois se nao ele segue o codigo e nao aparece o ok 
            // ou seja o callback fica na espera
            return writeFile((message) => res.end(message))
      }

      data.urls.push({name, url})

      return writeFile((message) => res.end(message))

}).listen(3000, () => console.log('api ta on '))

// urls
// /?name=Nome&url=http://www.link.com    (adicionar)
// /?name=Nome&url=http://www.link.com&del=1 (deletar)