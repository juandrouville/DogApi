import  server  from '../src/app.js'
import { sequelize } from '../src/db.js';
import dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 5432;

async function initializeApp() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexão com o banco estabelecida');

    
    await sequelize.sync({ force: false });
    console.log('✅ Modelos sincronizados');

    
    server.listen(port, () => {
      console.log(`🚀 Servidor rodando em http://localhost:${port}`);
    });

  } catch (error) {
    console.error('❌ Falha na inicialização:', error);
    process.exit(1); 
  }
}


process.on('unhandledRejection', (err) => {
  console.error('⚠️ Erro não tratado:', err);
});

initializeApp();
export default server;