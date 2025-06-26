import  server  from './src/app.js'
import { sequelize } from './src/db.js';
import dotenv from 'dotenv';
import serverless from 'serverless-http';

dotenv.config();

const port = process.env.PORT || 3000;

const vercelHandler = serverless(server);

async function initializeApp() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida');

    
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');

    if(process.env.VERCEL !== '1'){
      server.listen(port, () => {
        console.log(`🚀 Servidor rodando em http://localhost:${port}`);
      });
    }

  } catch (error) {
    console.error('❌ Falha na inicialização:', error);
    process.exit(1); 
  }
}


process.on('unhandledRejection', (err) => {
  console.error('⚠️ Erro não tratado:', err);
});

initializeApp();
export {vercelHandler};
export default server;