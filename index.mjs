const API_URL = 'https://swapi.dev/api'
const POKE_API = 'https://pokeapi.co/api/v2'

const res = await fetch(`${API_URL}/people/1`)
const person = await res.json()

// personas
const { name: personaName, gender } = person
console.log(personaName, gender)

const ST_ACCPTED_RESOURCES = ['people', 'films', 'species', 'vehicles', 'starships']
const POKEMON_ACCPTED_RESOURCES = ['pokemon', 'pokemon-species']

const createApi = (url, listResources) => {
  return new Proxy({}, {
    get: (target, prop) => {
      return async (id, queryParams) => {
        if(!listResources.includes(prop)){
          return  Promise.reject(`${prop} is not a valid resource`)
        }

        const qs = queryParams
          ? `?${new URLSearchParams(queryParams).toString()}`
          : ''

        const resource = `${url}/${prop}/${id}${qs}`
        console.log('GET', resource)
        const res = await fetch(resource)
        
        if(res.ok) return res.json()
        return Promise.reject({ error: 'No se encontro la informacion' }) 

      }

    }
  })
}

const api = createApi(API_URL, ST_ACCPTED_RESOURCES)
const cosa = await api.people(10)


const pokeApi = createApi(POKE_API, POKEMON_ACCPTED_RESOURCES)
const pokemon = await pokeApi.pokemon('pikachu', { limit: 10 })
console.log(pokemon)