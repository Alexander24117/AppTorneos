<<<<<<< HEAD
import {API_HOST} from "../utils/constans";
=======
import {API_HOST} from "../utils/constanst";
>>>>>>> 4803a9a5afe26139c0ced8bdd73ce6dc574ac098
import axios from "axios";

async function postData(url, data) {
    try {
      const response = await axios.post(url, data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * Consumo de la api dado la url, 
   * no usar a menos de que la url este determinada como se debe
   * @returns aun no se especifica
   */
export async function getTorneosApi(){
    try {
        const url = `${API_HOST}/`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

/**
 * Consume la api para dar como response una lista de todos los participantes
 * @returns una lista de todos los participantes
 */
export async function getJugadores(){
    try {
        const url = `${API_HOST}/participant/read/all`
        const response = await fetch(url)
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

export async function saveJugador(jugador,identification){
    try {
        const url = `${API_HOST}/participant/create/identification`
        const response = postData(url, jugador);
        const result = await response.json()
        return result
    } catch (error) {
        throw error
    }
}

export async function login(data){
    try {
        const url = `${API_HOST}/auth/login`
        const response = postData(url, data);
        const result = await response.json()
<<<<<<< HEAD
        console.log(result)
=======
>>>>>>> 4803a9a5afe26139c0ced8bdd73ce6dc574ac098
        return result 
    } catch (error) {
        
    }
<<<<<<< HEAD
}
=======
}
>>>>>>> 4803a9a5afe26139c0ced8bdd73ce6dc574ac098
