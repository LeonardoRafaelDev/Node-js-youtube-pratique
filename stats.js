const os = require('os')

setInterval(() => {
      //"desempacontando" o os
      const { freemem, totalmem} = os
      // criando a varialvel e ja dividindo para dar mb direitinho
      const total = parseInt(totalmem() / 1024 / 1024)
      const mem = parseInt(freemem() / 1024 / 1024)
      const percents = parseInt((mem / total) * 100)
      // puxando as variaveis e setando para aprecer em mb e %
      const stats = {
            free: `${mem} MB`,
            total: `${total} MB`,
            usage: `${percents} %`
      }

      console.clear()
      console.log("===tua memoria man===")
      console.table(stats)

}, 1000)
