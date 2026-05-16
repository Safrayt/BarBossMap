// Массив всех площадок. Фотографии можно хранить:
// - либо ссылками на внешние изображения
// - либо в папке images/ в репозитории (например, "images/place1.jpg")
const places = [
  {
    id: 1,
    name: "Площадка BarBoss'ов",
    lat: 55.791920,
    lng: 37.976751,
    address: "Московская область, г. Балашиха, ул. Твардовского, между домами 10 и 13",
    equipment: "2 рукохода, 2 низкие перекладины, брусья",
    submittedBy: "Safrayt",
    history: [
      { year: 2016, event: "Открыта для посещений (найдена)" }
    ],
    photos: [
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id1/1.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id1/2.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id1/3.jpg"
    ]
  }
];

window.placesData = places;