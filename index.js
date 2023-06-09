import { server } from './src/app.js';
import { sequelize } from './src/db.js';
const port = process.env.PORT || 4000;

async function main(){
  try{ 
    server.listen(port);
    console.log('listen server port',port);
    await sequelize.sync({force:false});
  } catch(e){
    console.log(e);
  };
};

main();
