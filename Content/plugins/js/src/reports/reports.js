/* Llamamos las variables de entorno */
const envReports = envirement();


/* Llamamos las variables glables */
let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let grafica = [];

/* Llamamos las variables glables fin */

const initialReport = () => {
    const currentDate = new Date().toLocaleDateString('es-MX').split('/');
    const formatDate = `${currentDate[2]}-${currentDate[1] > 9 ? currentDate[1] : '0' + currentDate[1]}-${currentDate[0] > 9 ? currentDate[0] : '0' + currentDate[0]}`;
    startDate.max = formatDate;
    endDate.max = formatDate;
    startDate.value = formatDate;
    endDate.value = formatDate;
}

setTimeout(initialReport,100);

const reportRecipes = ()=>{
    const { id, name } = JSON.parse(localStorage.getItem('clinic'));

    fetch(`${envReports.rutes.back}${envReports.controllers.reports}GetReportRecipes?DateStart=${startDate.value}&DateEnd=${endDate.value}&Shope=${id}`)
    .then(response=>response.json())
    .then(result=>{        
        const {ReportRecipesConsultation}=result.ReportRecipesConsultation[0]
        
        let csvStr = `FECHA,DERMATOLOGO,PACIENTE,EDAD,TELEFONO,CP,PROXIMA CONSULTA,LABORATORIO,ID CONSULTA,NUM RECETA,SKU,PRODUCTO,INDICACION \n`;
        ReportRecipesConsultation.map(({ Date,Derma,Patient,Phone,Code,Prox_Consultation,Laboratory,IdConsultation,Recipe,Sku,Product,Indications,Age }) => {
            const ageCurrent = moment().diff(moment(Age), 'years');
            const Indication = Indications ? Indications.replaceAll('\n',' ').replaceAll(',', ' ') : 'SIN INDICACIONES';
            csvStr += `${Date},${Derma},${Patient},${ageCurrent},${Phone},${Code},${Prox_Consultation},${Laboratory},${IdConsultation},${Recipe},${Sku},${Product},${Indication} \n`;
        });

        const exportName = `Reporte recetas ${name} del ` + startDate.value + ' al ' + endDate.value;
        var dataStr = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvStr);
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".csv");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
   })
}


const reportAppoimentsVsConsultations = ()=>{
    const { id, name } = JSON.parse(localStorage.getItem('clinic'));

    fetch(`${envReports.rutes.back}${envReports.controllers.reports}GetReportAppoimentConsultation?DateStart=${startDate.value}&DateEnd=${endDate.value}&Shope=${id}`)
    .then(response=>response.json())
    .then(result=>{        
        
        const {AppoimentConsultation}=result.AppoimentConsultation[0]
        
        let csvStr = `SUCURSAL,FECHA,DEMATÓLOGO,CITAS,CONSULTAS \n`;
        AppoimentConsultation.map(({ CantidadDeCitas,CantidadDeConsultas,Date,DermaName,Shope }) => {            
            csvStr += `${Shope},${Date},${DermaName},${CantidadDeCitas},${CantidadDeConsultas}, \n`;
        });

        const exportName = `Reporte citas vs consultas ${name} del ` + startDate.value + ' al ' + endDate.value;
        var dataStr = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvStr);
        var downloadAnchorNode = document.createElement('a');
        downloadAnchorNode.setAttribute("href", dataStr);
        downloadAnchorNode.setAttribute("download", exportName + ".csv");
        document.body.appendChild(downloadAnchorNode); // required for firefox
        downloadAnchorNode.click();
        downloadAnchorNode.remove();
   })
}

const reportCountRecipeVsConsultation = ()=>{
  const {id, name} = JSON.parse(localStorage.getItem('clinic'));

  fetch(`${envReports.rutes.back}${envReports.controllers.reports}GetCountConsultationRecipes?DateStart=${startDate.value}&DateEnd=${endDate.value}&id_Shope=${id}`)
  .then(response=>response.json())
  .then(result=>{
    
    const{CountConsultationsRecipes}=result.CountConsultationRecipes[0]
    let csvStr = `SUCURSAL,DEMATÓLOGO,CONSULTAS,RECETAS \n`;
    CountConsultationsRecipes.map(({ Shope,Dermatologist,Consultations,Recipes }) => {            
      csvStr += `${Shope},${Dermatologist},${Consultations},${Recipes}, \n`;
  });

  const exportName = `Reporte recetas vs consultas ${name} del ` + startDate.value + ' al ' + endDate.value;
  var dataStr = "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(csvStr);
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href", dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".csv");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
})
}

//----top de laboratorios

const toplab = () => {//se crea funcion de la logica de la grafica

    const GrafLab = document.getElementById('toplabarotarios'); // se manda llamar el elemento html donde se almacenara la grafica
    const graficalab = echarts.init(GrafLab,null,{//inicializamos la grafica
        width: 540,
        height: 250
    });

    // Specify the configuration items and data for the chart
    var option = {
        title: {
          text: ''
        },
        tooltip: {},
        legend: {
          data: ['Laboratorio']
        },
        xAxis: {
          data: ['Avene', 'Vichy', 'La Roche', 'Bioderma', 'Cerave', 'Remexa']
        },
        yAxis: {},
        series: [
          {
            name: 'Laboratorio',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
           
          }
        ]
      };

      graficalab.setOption(option);
     
      //
      setTimeout(()=>{
        grafica.push({nombre:"TopLab",grafica:graficalab}) 
      },2000)
  
      
}

const descargaGrafica = (nombreGrafica)=>{
  
   
  const indexGrafica = grafica.findIndex((element) => element.nombre === nombreGrafica)
  
  const base64 = grafica[indexGrafica].grafica.getDataURL({
    pixelRatio: 2,
    backgroundColor: "#FFF"
  });
 
  var a = document.createElement("a"); //Create <a>
        a.href = base64; //Image Base64 Goes here
        a.download = nombreGrafica; //File name Here
        a.click();
}

//---Top Categoria de servicios
const topCatSer = () =>{
  

  const grafCatSer = document.getElementById('topcatservicio');
  const grafiCatSer = echarts.init(grafCatSer,null,{
    width: 545,
    height: 250
  });

  option = {
    tooltip: {
      trigger: 'item'
    },
    legend: {
      top: '5%',
      left: 'center'
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2
        },
        label: {
          show: false,
          position: 'center'
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: 'bold'
          }
        },
        labelLine: {
          show: false
        },
        data: [
          { value: 1048, name: 'Consulta' },
          { value: 735, name: 'Facial' },
          { value: 580, name: 'Aparatologia' },
          { value: 484, name: 'Dermapen' },
          { value: 300, name: 'Curacion' },
          { value: 300, name: 'Estetica' }
        ]
      }
    ]
  };

  grafiCatSer.setOption(option);

  setTimeout(()=>{
    grafica.push({nombre:"TopCatSer",grafica:grafiCatSer}) 
  },2000)
}
//---Afluencia por turno
const AfluTur = () =>{
  console.log('okkk');

  const GrafAfluTur = document.getElementById('topturno')
  const GraficAfluTur = echarts.init(GrafAfluTur,null,{
    width : 540 ,
    height : 250
  });
  const data = [];
for (let i = 0; i < 2; ++i) {
  data.push(Math.round(Math.random() * 200));
  option = {
    xAxis: {
      max: 'dataMax'
    },
    yAxis: {
      type: 'category',
      data: ['Tarde','Mañana' ],
      inverse: true,
      animationDuration: 300,
      animationDurationUpdate: 300,
      max: 2 // only the largest 3 bars will be displayed
    },
    series: [
      {
        realtimeSort: true,
        name: 'Personas',
        type: 'bar',
        data: data,
        label: {
          show: true,
          position: 'right',
          valueAnimation: true
        }
      }
    ],
    legend: {
      show: true
    },
    animationDuration: 0,
    animationDurationUpdate: 3000,
    animationEasing: 'linear',
    animationEasingUpdate: 'linear'
  };
  function run() {
    for (var i = 0; i < data.length; ++i) {
      if (Math.random() > 0.9) {
        data[i] += Math.round(Math.random() * 2000);
      } else {
        data[i] += Math.round(Math.random() * 200);
      }
    }
    /*myChart.setOption({
      series: [
        {
          type: 'bar',
          data
        }
      ]
    });*/
  }
  setTimeout(function () {
    run();
  }, 0);
  setInterval(function () {
    run();
  }, 3000);

 GraficAfluTur.setOption(option);

 setTimeout(()=>{
  grafica.push({nombre:"AfluTur",grafica:GraficAfluTur})
 },2000)
}
}
//*******categoria PACIENTES Y CITAS*************
//---Medios
const PacGraMedios = () =>{ //se declara la funcion
  const grafMedios = document.getElementById('GraficaMedios'); //se indica el contenedor donde se dibujara la grafica
  const graficMedios = echarts.init(grafMedios,null,{ //se inicializa la grafica dentro del contenedor
    width: 600,
    height: 240
  });

  option = {
    backgroundColor: 'white',
    title: {
      
      left: 'center',
      top: 20,
      textStyle: {
        color: 'black'
      }
    },
    tooltip: {
      trigger: 'item'
    },
    visualMap: {
      show: false,
      min: 80,
      max: 600,
      inRange: {
        colorLightness: [0, 1]
      }
    },
    series: [
      {
        name: 'Access From',
        type: 'pie',
        radius: '55%',
        center: ['50%', '50%'],
        data: [
          { value: 335, name: 'Fisico' },
          { value: 310, name: 'CallCenter' },
          { value: 274, name: 'Instagram' },
          { value: 235, name: 'Facebook' },
          { value: 400, name: 'Whatsapp' },
           { value: 500, name: 'Tren' },
           { value: 500, name: 'Recomendacion' } 
        ].sort(function (a, b) {
          return a.value - b.value;
        }),
        roseType: 'radius',
        label: {
          color: 'black'
        },
        labelLine: {
          lineStyle: {
            color: 'black'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: 'blue',
          shadowBlur: 200,
          shadowColor: 'white'
        },
        animationType: 'scale',
        animationEasing: 'elasticOut',
        animationDelay: function (idx) {
          return Math.random() * 200;
        }
      }
    ]
  };

  graficMedios.setOption(option);

  setTimeout(()=>{
    grafica.push({nombre:"PacGraMedios",grafica:graficMedios}) 
  },2000)
}

//Religion
const PacGraReligion = ()=>{
  const grafReligion = document.getElementById('GraficaReligion');
  const graficReligion = echarts.init(grafReligion,null,{
   width: 600,
   height: 240
  });
 
option = {
  
  title: {
  
    textStyle: {
      color: 'black'
    }
  },
  tooltip: {},
  series: [
    {
      name: 'pie',
      type: 'pie',
      selectedMode: 'single',
      selectedOffset: 30,
      clockwise: true,
      label: {
        fontSize: 12,
        color: 'black'
      },
      labelLine: {
        lineStyle: {
          color: '#235894'
        }
      },
      data: [
        { value: 1048, name: 'Catolico' },
        { value: 735, name: 'Cristiano' },
        { value: 580, name: 'Islam' },
        { value: 484, name: 'Hindu' },
        { value: 300, name: 'Mormón' },
        { value: 1048, name: 'Evangélico' },
        { value: 735, name: 'Budista' },
        { value: 580, name: 'Testigo de Jehová' },
        { value: 484, name: 'Judio' },
        { value: 300, name: 'Chamánico' },
        { value: 1048, name: 'Rastafari' },
        { value: 735, name: 'Sin Religión' },
        { value: 580, name: 'Otras' }
      ],
      itemStyle: {
        opacity: 0.7,
        color: '',
        borderWidth: 3,
        borderColor: 'white'
      }
    }
  ]
};
  graficReligion.setOption(option);
  setTimeout(()=>{
    grafica.push({nombre:"PacGraReligion",grafica:graficReligion}) 
  },2000)
}
//******************Razas
const PacGraRaza = ()=>{
  const grafRaza = document.getElementById('GraficaRaza');
  const graficRaza = echarts.init(grafRaza,null,{
   width: 600,
   height: 270
  });
  // Specify the configuration items and data for the chart
  var option = {
    title: {
      text: ''
    },
    tooltip: {},
    legend: {
      data: ['Razas']
    },
    xAxis: {
      data: ['Africana', 'Caucasica', 'Asiatica', 'Mestizo', 'Indigena', 'Otras']
    },
    yAxis: {},
    series: [
      {
        name: 'Razas',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20],
       
      }
    ]
  };
  
  graficRaza.setOption(option);
  setTimeout(()=>{
    grafica.push({nombre:"PacGraRaza",grafica:graficRaza}) 
  },2000)

}
//********************Generos*****************************
const PacGraGene = ()=>{
  const grafGene = document.getElementById('GraficaGenero');
  const graficGene = echarts.init(grafGene,null,{
   width: 500,
   height: 270
  });
   
  const data = [];
for (let i = 0; i < 5; ++i) {
  data.push(Math.round(Math.random() * 200));
}
option = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: 'center'
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: 'Masculino' },
        { value: 735, name: 'Femenino' },
        { value: 580, name: 'No binario' }
      ]
    }
  ]
};

graficGene.setOption(option);

setTimeout(()=>{
  grafica.push({nombre:"PacGraGene",grafica:graficGene}) 
},2000)
}

toplab();
topCatSer();
AfluTur();
PacGraMedios();
PacGraReligion();
PacGraRaza();
PacGraGene();