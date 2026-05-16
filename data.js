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
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQ5SyHpg5nPQcJgN4BDty9xWcBD7VSpNEnog&s",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRUuK5ipbL6YxvBaifa1I3u57pAsJAHoA5-6A&s"
    ]
  },
  {
    id: 2,
    name: "Пляжные турники",
    lat: 34.019,
    lng: -118.491,
    address: "Santa Monica Beach, California",
    equipment: "Два турника, параллельные брусья",
    submittedBy: "John Doe",
    history: [
      { year: 2015, event: "Установлены" },
      { year: 2019, event: "Ремонт турников" },
      { year: 2023, event: "Работают" }
    ],
    photos: [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQnU-zm5LBgl-C14xKfvSTCu1tPLtdKHJZ1bA&s"
    ]  // если фото нет, оставляем пустой массив
  }
];

window.placesData = places;