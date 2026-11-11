/**
 * Nusantics Contact Page Interactions & Micro-Animations.
 * Handles the hero map (two locations), and scroll reveal animations.
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 2. Hero map: the two locations on Google Maps, as on nusantics.com/en/contact-us
  //    A browser key in <meta name="google-maps-api-key"> loads the Maps JavaScript API (map/satellite, street view,
  //    fullscreen, two pins with their info windows). Without a key the prototype shows the same two pins on Esri tiles.
  // =========================================================================
  const mapEl = document.getElementById('contact-map');
  if (mapEl) {
    const LOCATIONS = [
      { name: 'Nusantics Headquarters, and CeKolam by Nusantics', city: 'Jakarta', latlng: { lat: -6.1792575, lng: 106.8783248 }, url: 'https://maps.app.goo.gl/b1LLsiwowjc36SJc6' },
      { name: 'CeKolam by Nusantics', city: 'Banyuwangi', latlng: { lat: -8.1857854, lng: 114.3805349 }, url: 'https://maps.app.goo.gl/1CFiQC13AFwAHY5u9' }
    ];
    const key = (document.querySelector('meta[name="google-maps-api-key"]') || {}).content || '';

    const initJsApi = () => {
      const { Map, InfoWindow, Marker } = google.maps;
      const map = new Map(mapEl, {
        center: { lat: -7.2, lng: 110.6 },
        zoom: 5,
        minZoom: 3,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        gestureHandling: 'cooperative' // the page keeps scrolling; Ctrl + scroll or two fingers zoom the map
      });
      LOCATIONS.forEach((loc) => {
        const marker = new Marker({ map, position: loc.latlng, title: loc.name });
        const info = new InfoWindow({
          maxWidth: 200,
          content: `<div class="contact-map__info"><strong>${loc.name}</strong>${loc.city}<a href="${loc.url}" target="_blank" rel="noopener noreferrer">Go to maps</a></div>`
        });
        info.open({ map, anchor: marker });
        marker.addListener('click', () => info.open({ map, anchor: marker }));
      });
    };
    window.initContactMap = initJsApi;

    // Keyless prototype map: Leaflet on Esri street / imagery tiles, same pins, bubbles and Map / Satellite switch
    const initPrototypeMap = () => {
      if (!window.L) return;
      const map = L.map(mapEl, { center: [-7.2, 110.6], zoom: 5, minZoom: 3, zoomControl: false, scrollWheelZoom: false, dragging: !L.Browser.mobile, attributionControl: true });
      const esri = (name) => L.tileLayer(`https://server.arcgisonline.com/ArcGIS/rest/services/${name}/MapServer/tile/{z}/{y}/{x}`, {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri'
      });
      const street = esri('World_Street_Map');
      const imagery = esri('World_Imagery');
      street.addTo(map);
      new ResizeObserver(() => map.invalidateSize()).observe(mapEl); // the panel grows with the full-screen hero
      L.control.zoom({ position: 'bottomright' }).addTo(map);

      const type = document.createElement('div');
      type.className = 'contact-map__type';
      type.innerHTML = '<button type="button" data-type="map" aria-pressed="true">Map</button><button type="button" data-type="sat" aria-pressed="false">Satellite</button>';
      mapEl.appendChild(type);
      L.DomEvent.disableClickPropagation(type);
      type.addEventListener('click', (e) => {
        const btn = e.target.closest('button');
        if (!btn) return;
        const sat = btn.dataset.type === 'sat';
        type.querySelectorAll('button').forEach((x) => x.setAttribute('aria-pressed', String(x === btn)));
        if (sat) { map.removeLayer(street); imagery.addTo(map); } else { map.removeLayer(imagery); street.addTo(map); }
      });

      const icon = L.divIcon({
        className: 'contact-map__pin',
        html: '<svg width="27" height="43" viewBox="0 0 27 43" aria-hidden="true"><path d="M13.5 0C6 0 0 6 0 13.4c0 10.1 13.5 29.6 13.5 29.6S27 23.5 27 13.4C27 6 21 0 13.5 0Z" fill="#ea4335" stroke="#b31412" stroke-width="1"/><circle cx="13.5" cy="13.5" r="5" fill="#7b1411"/></svg>',
        iconSize: [27, 43],
        iconAnchor: [13.5, 43],
        popupAnchor: [0, -40]
      });
      LOCATIONS.forEach((loc) => {
        const marker = L.marker([loc.latlng.lat, loc.latlng.lng], { icon, title: loc.name, keyboard: true }).addTo(map);
        marker.bindPopup(`<div class="contact-map__info"><strong>${loc.name}</strong>${loc.city}<a href="${loc.url}" target="_blank" rel="noopener noreferrer">Go to maps</a></div>`, { autoClose: false, closeOnClick: false, maxWidth: 200, autoPan: false }).openPopup();
      });
    };

    if (key) {
      const s = document.createElement('script');
      s.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly&callback=initContactMap`;
      s.async = true;
      s.onerror = initPrototypeMap;
      document.head.appendChild(s);
    } else {
      initPrototypeMap();
    }
  }

  // =========================================================================
  // 4. Scroll Reveal Animations for Facility & Distributor Cards
  // =========================================================================
  if (!prefersReducedMotion && 'IntersectionObserver' in window) {
    const revealTargets = document.querySelectorAll('.facility-card, .distributor-card');

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // the stagger delay is only for the reveal; hover should respond immediately afterwards
            setTimeout(() => { entry.target.style.transitionDelay = ''; }, 1000);
            obs.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -40px 0px', threshold: 0.1 }
    );

    revealTargets.forEach((el, index) => {
      el.classList.add('reveal-ready');
      el.style.transitionDelay = `${(index % 2) * 0.15}s`;
      observer.observe(el);
    });
  }
})();
