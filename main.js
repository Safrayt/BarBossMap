(function() {
  // ------ Разбор хэша ------
  function getRoute() {
    const hash = window.location.hash.slice(1); // убираем #
    if (hash === 'map') return { route: 'map' };
    if (hash === 'list') return { route: 'list' };
    const match = hash.match(/^place\/(\d+)$/);
    if (match) {
      return { route: 'place', id: parseInt(match[1]) };
    }
    return { route: 'map' }; // по умолчанию карта
  }

  let globalMap = null;       // карта на главной
  let detailMap = null;       // мини-карта на странице места

  function destroyMap(mapInstance) {
    if (mapInstance && typeof mapInstance.remove === 'function') {
      mapInstance.remove();
    }
  }

  // Экранирование для защиты от XSS
  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/[&<>]/g, function(m) {
      if (m === '&') return '&amp;';
      if (m === '<') return '&lt;';
      if (m === '>') return '&gt;';
      return m;
    });
  }

  // ------ Вид: карта со всеми маркерами (с фото в попапе) ------
  function showMap() {
    const content = document.getElementById('content');
    content.innerHTML = '<div id="mapContainer" style="height: 70vh; width: 100%;"></div>';
    
    if (globalMap) {
      destroyMap(globalMap);
      globalMap = null;
    }
    if (detailMap) {
      destroyMap(detailMap);
      detailMap = null;
    }

    const map = L.map('mapContainer');
    globalMap = map;
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    const bounds = [];
    window.placesData.forEach(place => {
      const marker = L.marker([place.lat, place.lng]).addTo(map);
      
      // Первая фотография (если есть) в попапе
      let photoHtml = '';
      if (place.photos && place.photos.length > 0) {
        photoHtml = `
          <div style="text-align: center; margin: 6px 0 10px 0;">
            <a href="#place/${place.id}" style="display: inline-block;">
              <img src="${escapeHtml(place.photos[0])}" alt="Фото" style="display: block; margin: 0 auto; max-width: 200px; width: auto; height: auto; border-radius: 12px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);">
            </a>
          </div>
        `;
    }
      
      const popupContent = `
        <div style="text-align: center;">
        <b style="font-size: 1.15rem; display: block; margin-bottom: 4px;">${escapeHtml(place.name)}</b>
        <span style="font-size: 0.85rem; color: #4a627a;">${escapeHtml(place.address)}</span>
        ${photoHtml}
        <a href="#place/${place.id}" class="popup-button" style="display: inline-block; background: #2c6e9e; color: white; text-decoration: none; padding: 6px 20px; margin-top: 6px; border-radius: 40px; font-weight: 600; font-size: 0.9rem;">Подробнее →</a>
      </div>
    `;
      marker.bindPopup(popupContent);
      bounds.push([place.lat, place.lng]);
    });

    if (bounds.length) {
      map.fitBounds(bounds);
    } else {
      map.setView([20, 0], 2);
    }
  }

  // ------ Вид: список всех площадок (с миниатюрой фото) ------
  function showList() {
    const content = document.getElementById('content');
    let html = '<div class="places-list"><h2>🗺️ Все турниковые площадки</h2><div class="list-grid">';
    window.placesData.forEach(place => {
      let thumbnail = '';
      if (place.photos && place.photos.length > 0) {
        thumbnail = `<div style="margin-bottom: 10px;"><img src="${escapeHtml(place.photos[0])}" alt="Фото" style="width: 100%; height: 160px; object-fit: cover; border-radius: 12px;"></div>`;
      }
      html += `
        <div class="place-card">
          ${thumbnail}
          <h3>${escapeHtml(place.name)}</h3>
          <p><strong>📍 Адрес:</strong> ${escapeHtml(place.address)}</p>
          <p><strong>🏋️ Снаряды:</strong> ${escapeHtml(place.equipment)}</p>
          <p><strong>👤 Добавил:</strong> ${escapeHtml(place.submittedBy)}</p>
          <a href="#place/${place.id}">Посмотреть детали →</a>
        </div>
      `;
    });
    html += '</div></div>';
    content.innerHTML = html;

    // Уничтожаем карты, чтобы не висели в памяти
    if (globalMap) {
      destroyMap(globalMap);
      globalMap = null;
    }
    if (detailMap) {
      destroyMap(detailMap);
      detailMap = null;
    }
  }

  // ------ Детальная страница одной площадки (с галереей) ------
  function showPlace(id) {
    const place = window.placesData.find(p => p.id === id);
    if (!place) {
      showMap();
      return;
    }

    // Строим временную шкалу из history
    let timelineHtml = '<ul class="timeline">';
    if (place.history && place.history.length) {
      const sorted = [...place.history].sort((a,b) => a.year - b.year);
      sorted.forEach(item => {
        timelineHtml += `<li><strong>${item.year}:</strong> ${escapeHtml(item.event)}</li>`;
      });
    } else {
      timelineHtml += '<li>История не добавлена</li>';
    }
    timelineHtml += '</ul>';

    // Галерея фотографий
    let galleryHtml = '';
    if (place.photos && place.photos.length > 0) {
      galleryHtml = '<div class="photo-gallery"><h3>📸 Фотографии площадки</h3><div class="gallery-grid">';
      place.photos.forEach(photoUrl => {
        galleryHtml += `
          <a href="${escapeHtml(photoUrl)}" target="_blank" class="gallery-item">
            <img src="${escapeHtml(photoUrl)}" alt="Фото" loading="lazy">
          </a>
        `;
      });
      galleryHtml += '</div></div>';
    } else {
      galleryHtml = '<p><em>Фотографии не добавлены</em></p>';
    }

    const html = `
      <div class="place-detail">
        <button class="back-button" onclick="window.location.hash='map'">← На карту</button>
        <h2>${escapeHtml(place.name)}</h2>
        <p><strong>📍 Адрес / описание:</strong> ${escapeHtml(place.address)}</p>
        <p><strong>🏋️ Снаряды:</strong> ${escapeHtml(place.equipment)}</p>
        <p><strong>👤 Информацию прислал(а):</strong> ${escapeHtml(place.submittedBy)}</p>
        <p><strong>🗺️ Координаты:</strong> ${place.lat}, ${place.lng} &nbsp;
          <a href="https://www.openstreetmap.org/?mlat=${place.lat}&mlon=${place.lng}&zoom=16" target="_blank">Открыть в OSM</a>
        </p>
        <h3>📅 История площадки</h3>
        ${timelineHtml}
        ${galleryHtml}
        <div id="placeMiniMap" style="height: 280px; width: 100%; margin-top: 20px; border-radius: 16px; overflow: hidden;"></div>
      </div>
    `;

    const content = document.getElementById('content');
    content.innerHTML = html;

    // Уничтожаем старые карты перед созданием мини-карты
    if (globalMap) {
      destroyMap(globalMap);
      globalMap = null;
    }
    if (detailMap) {
      destroyMap(detailMap);
      detailMap = null;
    }

    const container = document.getElementById('placeMiniMap');
    if (container) {
      const miniMap = L.map(container).setView([place.lat, place.lng], 15);
      detailMap = miniMap;
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OSM'
      }).addTo(miniMap);
      L.marker([place.lat, place.lng]).addTo(miniMap).bindPopup(place.name).openPopup();
    }
  }

  // ------ Маршрутизатор ------
  function router() {
    const route = getRoute();
    if (route.route === 'map') {
      showMap();
    } else if (route.route === 'list') {
      showList();
    } else if (route.route === 'place') {
      showPlace(route.id);
    }
  }

  window.addEventListener('hashchange', router);
  // Если хэша нет — ставим #map
  if (!window.location.hash) {
    window.location.hash = '#map';
  } else {
    router();
  }
})();