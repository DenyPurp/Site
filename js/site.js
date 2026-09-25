const RECIPES = [
  { title: "Борщ классический", url: "recipes/borscht.html", cat: "Первые блюда", time: 90, difficulty: "средняя", img: "assets/img/borscht.jpg", tags: ["суп", "борщ", "свекла"] },
  { title: "Куриный суп с лапшой", url: "recipes/chicken-soup.html", cat: "Первые блюда", time: 50, difficulty: "лёгкая", img: "assets/img/soup.jpg", tags: ["суп", "курица"] },
  { title: "Салат Оливье", url: "recipes/olivie.html", cat: "Салаты", time: 40, difficulty: "лёгкая", img: "assets/img/olivie.jpg", tags: ["салат", "оливье", "праздник"] },
  { title: "Салат Цезарь с курицей", url: "recipes/caesar.html", cat: "Салаты", time: 25, difficulty: "лёгкая", img: "assets/img/caesar.jpg", tags: ["салат", "цезарь", "быстрые"] },
  { title: "Блины на молоке", url: "recipes/bliny.html", cat: "Завтраки", time: 30, difficulty: "лёгкая", img: "assets/img/bliny.jpg", tags: ["блины", "завтрак"] },
  { title: "Сырники", url: "recipes/syrniki.html", cat: "Завтраки", time: 25, difficulty: "лёгкая", img: "assets/img/syrniki.jpg", tags: ["сырники", "завтрак", "быстрые"] },
  { title: "Торт Наполеон", url: "recipes/napoleon.html", cat: "Выпечка", time: 180, difficulty: "сложная", img: "assets/img/napoleon.jpg", tags: ["торт", "выпечка", "праздник"] },
  { title: "Шашлык из свинины", url: "recipes/shashlik.html", cat: "Вторые блюда", time: 180, difficulty: "средняя", img: "assets/img/shashlik.jpg", tags: ["шашлык", "мясо"] }
];

function prefix() {
  return document.body.dataset.base || "";
}

function withBase(path) {
  return prefix() + path;
}

function headerHTML(active) {
  const b = prefix();
  return `
    <header class="site-header">
      <div class="wrap header-inner">
        <a class="logo" href="${b}index.html">
          <span class="logo-mark">ВД</span>
          ВкусноДома
        </a>
        <nav class="nav">
          <a class="${active === "home" ? "active" : ""}" href="${b}index.html">Главная</a>
          <details>
            <summary>Рецепты</summary>
            <div class="mega">
              <a href="${b}recipes/index.html">Все рецепты</a>
              <a href="${b}recipes/soups.html">Первые блюда</a>
              <a href="${b}recipes/mains.html">Вторые блюда</a>
              <a href="${b}recipes/salads.html">Салаты</a>
              <a href="${b}recipes/baking.html">Выпечка и десерты</a>
              <a href="${b}recipes/breakfasts.html">Завтраки</a>
            </div>
          </details>
          <a class="${active === "collections" ? "active" : ""}" href="${b}collections/index.html">Подборки</a>
          <a class="${active === "articles" ? "active" : ""}" href="${b}articles/index.html">Статьи</a>
          <a class="${active === "about" ? "active" : ""}" href="${b}about.html">О проекте</a>
          <a class="${active === "contacts" ? "active" : ""}" href="${b}contacts.html">Контакты</a>
        </nav>
        <form class="search-form" action="${b}search.html" method="get">
          <input type="search" name="q" placeholder="Найти рецепт" aria-label="Поиск рецептов">
          <button type="submit">Найти</button>
        </form>
      </div>
    </header>`;
}

function footerHTML() {
  const b = prefix();
  return `
    <footer class="site-footer">
      <div class="wrap footer-grid">
        <div>
          <strong class="serif">ВкусноДома</strong>
          <p class="tiny">Домашние рецепты с понятной структурой: категории, подборки и пошаговые инструкции.</p>
        </div>
        <div>
          <strong>Разделы</strong><br>
          <a href="${b}recipes/index.html">Каталог рецептов</a><br>
          <a href="${b}collections/quick.html">Быстрые рецепты</a><br>
          <a href="${b}articles/index.html">Кулинарные статьи</a>
        </div>
        <div>
          <strong>Проект</strong><br>
          <a href="${b}about.html">О проекте</a><br>
          <a href="${b}faq.html">Вопросы и ответы</a><br>
          <a href="${b}contacts.html">Контакты</a>
        </div>
        <div>
          <strong>Служебное</strong><br>
          <a href="${b}sitemap.html">HTML-карта сайта</a><br>
          <a href="${b}sitemap.xml">XML-карта сайта</a><br>
          <a href="${b}search.html">Поиск</a>
        </div>
      </div>
    </footer>`;
}

function renderChrome() {
  const active = document.body.dataset.active || "";
  document.body.insertAdjacentHTML("afterbegin", headerHTML(active));
  document.body.insertAdjacentHTML("beforeend", footerHTML());
}

function renderSearch() {
  const box = document.querySelector("[data-search-results]");
  if (!box) return;
  const q = new URLSearchParams(location.search).get("q") || "";
  const field = document.querySelector('input[name="q"]');
  if (field) field.value = q;
  const query = q.trim().toLowerCase();
  const found = RECIPES.filter((item) => {
    const hay = (item.title + " " + item.cat + " " + item.tags.join(" ")).toLowerCase();
    return !query || hay.includes(query);
  });
  box.innerHTML = found.length
    ? found.map((item) => cardHTML(item)).join("")
    : `<div class="empty">Ничего не нашлось по запросу «${q}». Попробуйте «борщ», «салат» или «блин».</div>`;
}

function cardHTML(item) {
  return `
    <article class="card">
      <a href="${withBase(item.url)}"><img src="${withBase(item.img)}" alt="${item.title}"></a>
      <div class="card-body">
        <div class="meta"><span class="chip">${item.cat}</span><span>${item.time} мин</span><span>${item.difficulty}</span></div>
        <h3><a href="${withBase(item.url)}">${item.title}</a></h3>
      </div>
    </article>`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderChrome();
  renderSearch();
});
