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
  },
  {
    id: 2,
    name: "Площадка у Глобуса",
    lat: 55.792619,
    lng: 37.941212,
    address: "Московская область, г. Балашиха, между ТК 'Глобус' и школой",
    equipment: "Огромное колличество разновысотных перекладин и брусьев. Есть беговые дорожки с резиновым покрытием.",
    submittedBy: "Safrayt",
    history: [
      { year: 2023, event: "Открыта для посещений (найдена)" }
    ],
    photos: [
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/1.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/2.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/3.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/4.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/5.jpg",
      "https://cdn.jsdelivr.net/gh/Safrayt/BarBossMap@main/images/id2/6.jpg"
    ]
  }
];

window.placesData = places;