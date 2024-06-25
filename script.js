
// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 1.3295506705767453, lng: 103.80166533360403 }; 
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  
  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "HQ: Bukit Timah",
  });

  for (const property of properties) {
    const AdvancedMarkerElement = new google.maps.marker.AdvancedMarkerElement({
      map,
      content: buildContent(property),
      position: property.position,
      title: property.description,
    });

    AdvancedMarkerElement.addListener("click", () => {
      toggleHighlight(AdvancedMarkerElement, property);
    });
  }

  for (const city in citymap) {
    // Add the circle for this city to the map.
    const cityCircle = new google.maps.Circle({
      strokeColor: "#FF0000",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "#FF0000",
      fillOpacity: 0.35,
      map,
      center: citymap[city].center,
      radius: Math.sqrt(citymap[city].population) * 100,
    });
  }
}



function toggleHighlight(markerView, property) {
  if (markerView.content.classList.contains("highlight")) {
    markerView.content.classList.remove("highlight");
    markerView.zIndex = null;
  } else {
    markerView.content.classList.add("highlight");
    markerView.zIndex = 1;
  }
}

function buildContent(property) {
  const content = document.createElement("div");

  content.classList.add("property");
  content.innerHTML = `
    <div class="icon">
        <i aria-hidden="true" class="fa fa-icon fa-${property.type}" title="${property.type}"></i>
        <span class="fa-sr-only">${property.type}</span>
    </div>
    <div class="details">
        <div class="price">${property.price}</div>
        <div class="address">${property.address}</div>
        <div class="features">
        <div>
            <i aria-hidden="true" class="fa fa-bed fa-lg bed" title="bedroom"></i>
            <span class="fa-sr-only">bedroom</span>
            <span>${property.bed}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-bath fa-lg bath" title="bathroom"></i>
            <span class="fa-sr-only">bathroom</span>
            <span>${property.bath}</span>
        </div>
        <div>
            <i aria-hidden="true" class="fa fa-ruler fa-lg size" title="size"></i>
            <span class="fa-sr-only">size</span>
            <span>${property.size} ft<sup>2</sup></span>
        </div>
        </div>
    </div>
    `;
  return content;
}
const citymap = {
  jurongeast: {
    center: { lat: 1.3327258783816158, lng: 103.74175518076083 },
    population: 350,
  },
  hougang: {
    center: { lat: 1.3611808321076198, lng: 103.8863884798605 },
    population: 400,
  },
  bukitmerah: {
    center: { lat: 1.2824113067364602, lng: 103.82410519239063 },
    population: 100,
  },
  tampines: {
    center: { lat: 1.350252521528766, lng: 103.9579440494231 },
    population: 550,
  },
};


const properties = [
  {
    address: "Moulmein Road, Novena, SG",
    description: "Safe House 1",
    price: "Safe House 1",
    type: "home",
    bed: 20,
    bath: 4,  
    size: 700,
    position: {
      lat: 1.3189281674392372,
      lng: 103.84501346437838,
    },
  },

  {
    address: "Holland Rd, Holland Village, SG",
    description: "Safe House 2",
    price: "Safe House 2",
    type: "home",
    bed: 10,
    bath: 5,  
    size: 500,
    position: {
      lat: 1.3119392070437312,
      lng: 103.79736179592632,
    },
  },

  {
    address: "Thomson Ridge Estate, Bishan, SG",
    description: "Safe House 3",
    price: "Safe House 3",
    type: "home",
    bed: 30,
    bath: 10,  
    size: 1000,
    position: {
      lat: 1.3519608695738856,
      lng: 103.83370855355248,
    },
  },
];


initMap();




