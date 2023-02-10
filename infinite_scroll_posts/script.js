const postsContainer = document.getElementById("posts-container");
const loading = document.querySelector(".loader");
const filter = document.getElementById("filter");

let limit = 5;
let page = 1;

/**
 * Fetch posts from API
 */
async function getPosts() {
  const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`);
  const data = await res.json();

  return data;
}

/**
 * Show posts in DOM
 */
async function showPosts() {
  const posts = await getPosts();

  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <div class="number">${post.id}</div>
        <div class="post-info">
            <h2 class="post-title">${post.title}</h2>
            <p class="post-body">
                ${post.body}
            </p>
        </div>
    `;

    postsContainer.appendChild(postEl);
  });
}

// Show initial posts
showPosts();

/**
 * hide loader after fetching posts
 */
async function hideLoader() {
  loading.classList.remove("show");
}

/**
 * show loader & fetch more posts
 */
async function showLoading() {
  loading.classList.add("show");
  page++;

  await showPosts();
  await hideLoader();
}

/**
 * Filter posts by input
 */
function filterPosts(e) {
  const terms = e.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const title = post.querySelector(".post-title").innerText.toUpperCase();
    const body = post.querySelector(".post-body").innerText.toUpperCase();

    if (title.indexOf(terms) > -1 || body.indexOf(terms) > -1) {
      post.style.display = "flex";
    } else {
      post.style.display = "none";
    }
  });
}

/**
 * if window scroll to bottom
 */
window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 1) {
    showLoading();
  }
});

/**
 * Filter posts
 */
filter.addEventListener("input", filterPosts);
