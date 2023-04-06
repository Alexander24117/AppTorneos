import { API_HOST } from "../utils/constans"
import RNSecureKeyStore, { ACCESSIBLE } from "react-native-secure-key-store"
import axios from "axios"

let token = ""
async function postData(url, data) {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function putData(url, data) {
  try {
    const response = await axios.put(url, data)
    // console.log(response.data);
    return response.data
  } catch (error) {
    console.error(error)
  }
}

async function getData(url, tokenA) {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: "Bearer " + tokenA,
      },
    })
    return response.data
  } catch (error) {
    console.error(error)
  }
}
/**
 * Consumo de la api dado la url,
 * no usar a menos de que la url este determinada como se debe
 * @returns aun no se especifica
 */
export async function getTorneosApi() {
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
export async function getJugadores() {
  try {
    const url = `${API_HOST}/participant/read/all`
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function saveJugador(jugador, token) {
  try {
    const url = `${API_HOST}/participant/create`
    const response = await axios.post(url, {
      headers: {
        Authorization: `Bearer ${tokenY}`,
      },
      params: jugador,
    })
    const result = await response.json()
    return result
  } catch (error) {
    throw error
  }
}

export async function login(data) {
  try {
    const url = `${API_HOST}/auth/login`
    const response = await putData(
      url,
      data /**{
            email:"2qwe@asd.com",
            password: "qweqwe"
        }*/
    )
    token = response.access_token
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function departamentos(token) {
  try {
    const url = `${API_HOST}/department/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function ciudades(token) {
  try {
    const url = `${API_HOST}/city/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
export async function ciudadesPorDepartment(tokenY, departamento) {
  try {
    const url = `${API_HOST}/city/read/department`
    const response = await axios.put(
      url,
      {
        department_id: departamento,
      },
      {
        headers: {
          Authorization: `Bearer ${tokenY}`,
        },
      }
    )
    const result = response.data
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

export async function crearParticipantes(tokenP, cuerpo) {
  try {
    const url = `${API_HOST}/participant/create/identification`
    const response = await axios.post(url, cuerpo, {
      headers: {
        Authorization: `Bearer ${tokenP}`,
      },
    })
    const result = response
    console.log(response.data.message)
    return result
  } catch (error) {
    throw error
  }
}

export async function traerInstituciones(token) {
  try {
    const url = `${API_HOST}/institution/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function crearEquipo(tokenP, cuerpo) {
  try {
    const url = `${API_HOST}/team/create`
    const response = await axios.post(url, cuerpo, {
      headers: {
        Authorization: `Bearer ${tokenP}`,
      },
    })
    const result = response
    console.log(response.data.message)
    return result
  } catch (error) {
    throw error
  }
}

export async function traerEquipos(token) {
  try {
    const url = `${API_HOST}/sport/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
export async function traerEquiposs(token) {
  try {
    const url = `${API_HOST}/team/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
export async function traerDeportess(token) {
  try {
    const url = `${API_HOST}/sport/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
export async function traerEquipoById(token, idequipo) {
  try {
    const url = `${API_HOST}/team/read/id`
    const response = await axios.put(
      url,
      { id: idequipo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerJugadores(token) {
  try {
    const url = `${API_HOST}/participant/read/all`
    const response = await getData(url, token)
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerJugadorById(token, idjugador) {
  try {
    const url = `${API_HOST}/participant/read/id`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        id: idjugador,
      },
    })
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerJugadorById2(token, idejugador) {
  try {
    const url = `${API_HOST}/participant/read/id`
    const response = await axios.put(
      url,
      { id: idejugador },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function ActuEquipo(token, equipo) {
  try {
    const url = `${API_HOST}/team/update`
    const response = await axios.put(url, equipo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerEquipoByInsti(token, idInst) {
  try {
    const url = `${API_HOST}/team/read/with/institution`
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { id_institution: idInst },
    })
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
export async function traerTorneos(token) {
  try {
    const url = `${API_HOST}/tournaments/read/front/filter`
    const response = await axios.put(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { stage_id: "", institution_id: "", team_id: "" },
    })
    const result = response.data
    return result
  } catch (error) {
    throw error
  }
}

export async function ActuJugador(token, equipo) {
  try {
    const url = `${API_HOST}/participant/update`
    const response = await axios.put(url, equipo, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerTablaPuntosTorneo(token, idTorneo) {
  try {
    const url = `${API_HOST}/tournaments/read/table/team/points`
    const response = await axios.put(
      url,
      { tournament_id: idTorneo },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const result = response.data
    return result
  } catch (error) {
    throw error
  }
}

export async function traerTorneoById(token, idTorneo) {
  try {
    const url = `${API_HOST}/tournaments/read/id`
    const response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
      params: { id: idTorneo },
    })
    const result = response
    return result
  } catch (error) {
    throw error
  }
}

export async function traerTipoTorneo(token, tipoTorneo) {
  try {
    console.log(tipoTorneo)
    const url = `${API_HOST}/type/tournament/read/all`
    const response = await axios.put(
      url,
      { id_sport_selected: tipoTorneo },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    )
    const result = response
    return result
  } catch (error) {
    throw error
  }
}
