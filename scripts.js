const ENDPOINT = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson';

const mainApp = async() =>{
  console.log('Document loaded!')

  let eqs = await fetchEqData(ENDPOINT);
  console.log('Creating elements from ' + eqs.length + ' array objects.')

  let elfs = await createElementsFromEqData(eqs.features)
  console.log(elfs)

  let eqElement = document.getElementById('the-eq-events')
  console.log('Rendering to element: #' + eqElement.id)

  renderEqData(elfs, eqElement)

  console.log('All done!')
}


const fetchEqData = async(usgsUrl) => {
  let d = []
  console.log('Downloading from: ' + usgsUrl)

  let response = await fetch(usgsUrl)
  console.log('  ...finished downloading!')

  return await response.json()
}


const createElementsFromEqData = async(eqArray) => {
	//create blank array
    let elementArray = []

    //iterate through 
    for(let i=0, alen=eqArray.length; i < alen; i++){
        let f = eqArray[i]
        
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

const renderEqData = async(elementArray, parentEl) => {
    for(let i=0, alen=elementArray.length; i < alen; i++){
        let el = elementArray[i]
        el.className = 'data-item col-sm-4'
        parentEl.appendChild(el)
    }
}


window.onload = async() => { mainApp() }


