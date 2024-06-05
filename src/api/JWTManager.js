import * as SecureStore from 'expo-secure-store';

class JWTManager {
  #jwt = null;

  async getJWT() {
    return await SecureStore.getItemAsync('token');
  }

  setJWT(jwt) {
    this.#jwt = jwt;
    this.saveToken(jwt);
  }

  validateJWT() {
    // Verificar la estructura y firma del JWT aquí
  }

  async saveToken(token) {
    await SecureStore.setItemAsync('token', token);
    console.log('se guardo el token');
  }

  async getToken() {
    const token = await SecureStore.getItemAsync('token');
    return token;
  }
}

export default JWTManager;
