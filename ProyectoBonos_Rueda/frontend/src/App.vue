<template>
  <div>
    <form @submit.prevent="buscarBonos" class="px-10 py-2">
      <div class="py-2">
        <h1>Fecha Inicio</h1>
        <input type="date" v-model="fechaInit">
      </div>
      <div>
        <h1>Fecha Fin</h1>
        <input type="date" v-model="fechaFin">
      </div>
    <br>
    <button type="submit" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> Buscar Bonos </button>
    </form>
    
    <table class="rounded-t-lg w-5/6 mx-auto text-gray-100 bg-green-300">
        <tr class="text-left border-b-2 border-green-100">
          <th class="px-4 py-3">Fecha</th>
          <th class="px-4 py-3">Motivo</th>
          <th class="px-4 py-3">Cantidad</th>
          <th class="px-4 py-3">Usuario</th>
        </tr>
        <tr v-for="bono in listaBonos" :key="bono._id" class="border-b border-green-200">
          <td class="px-4 py-3">{{changeFecha(bono.bonoFecha)}}</td>
          <td class="px-4 py-3">{{bono.bonoMotivo}}</td>
          <td class="px-4 py-3">{{bono.bonoCantidad}}</td>
          <td class="px-4 py-3">{{bono.usuario.empleadoNombre}}</td>
        </tr>
    </table>

    <h2 class="px-10 py-2">El total de bonos repartidos entre esas fechas es de: <b>{{sumaBonos}}</b> </h2>

  </div>
</template>

<script>

export default {
  data(){
      return {
        listaBonos:[],
        sumaBonos:'',
        fechaInit:'',
        fechaFin:''
      }
    },
  methods: {
    buscarBonos(){
      this.axios.post('/bono/fecha/', { fechaInit:this.fechaInit,fechaFin:this.fechaFin})
      .then(res=>{
        console.log("lista bonos",res.data);
        this.listaBonos = res.data;
        this.sumaBonos = res.data.reduce((sum, value) => (typeof value.bonoCantidad == "number" ? sum + value.bonoCantidad : sum), 0);
      })
      .catch(err =>{ 
        console.log(err.response.data);
        this.message = err.response.data.message;
      })
    },
    changeFecha(date){
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        return new Date(date).toLocaleDateString(undefined, options)
    },
  }
}
</script>


<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #2c3e50;
  margin-top:50px;
}

</style>
