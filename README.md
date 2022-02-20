## CREANDO UN SERVIDOR CON PROXY Y EXPERIMENTAL API NODE 17.5.0

<hr/>
<p>Para usar el experimental fetch</p>
<p>
  node --experimental-fetch index.mjs
</p>

````javascript
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
````