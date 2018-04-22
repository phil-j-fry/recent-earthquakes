const ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

const mainApp = async() =>{
  console.log('Document loaded!')

  let eqData = await fetchEqData(ENDPOINT);
  console.log('Creating elements from ' + eqData.features.length + ' array objects.')

  let eqDivArray = await createElementsFromEqData(eqData.features)
  /*console.log(eqDivArray)*/

  let eqElement = document.getElementById('the-eq-events')
  console.log('Rendering to element: #' + eqElement.id)

  renderEqData(eqDivArray, eqElement)
  /*console.log(eqData.features)*/

  console.log('All done!')

}


const fetchEqData = async(usgsUrl) => {
  let dataArray = []
  console.log('Downloading from: ' + usgsUrl)

  let response = await fetch(usgsUrl)
  console.log('  ...finished downloading!')

  return await response.json()
}


const createElementsFromEqData = async(eqData) => {
	//create blank array
    let elementArray = []

    //iterate through to find number of elements to create
    for(let i=0, alen=eqData.length; i < alen; i++){
        let f = eqData[i]
        
        // create HTML elements from array
        let el = document.createElement("div")
        el.innerHTML = createEqHtml(f)
        elementArray.push(el)
    }
    return elementArray;

}


const createEqHtml = function(eq){
  return `
      <h3>Magnitude ${eq.properties.mag}</h3>
       <div class="row">
          <div class="offset-sm-1 col-sm-4"><strong>Time</strong></div>
          <div class="col-sm-6">${eq.properties.time}</div>
       </div>
       <div class="row">
          <div class="offset-sm-1 col-sm-4"><strong>Place</strong></div>
          <div class="col-sm-6">${eq.properties.place}</div>
       </div>
       <div class="row">
          <div class="col-sm-6"><a href= ${eq.properties.url}> USGS link</a></div>
       </div>`
}

const renderEqData = async(eqDivArray, eqElement) => {
    for(let i=0, alen=eqDivArray.length; i < alen; i++){
        let el = eqDivArray[i]
        el.className = 'data-item col-sm-4'
        eqElement.appendChild(el)
    }
}


window.onload = async() => { mainApp() }


