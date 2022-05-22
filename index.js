async function getData() {
  try {
    let dataFromFile = await fetch("data.json");
    let dataJson = await dataFromFile.json();
    return dataJson;
  } catch (e) {
    console.log("fetching data err", e);
    return [];
  }
}

function createCard(repo) {
  const { name, link, stack, level } = repo;

  let li = document.createElement("li");
  li.className = "repo";
  let p = document.createElement("p");
  p.textContent = name;
  let a = document.createElement("a");
  a.href = link;
  a.target = "_blank";
  a.text = "View";
  li.appendChild(p);
  li.appendChild(a);

  let stackContainer = document.createElement("ul");
  stackContainer.classList.add("stack-container");
  stack.forEach((item, idx) => {
    let stackItem = document.createElement("li");
    stackItem.classList.add("stack-item");
    stackItem.textContent = item;
    stackContainer.appendChild(stackItem);
  });
  li.appendChild(stackContainer);
  return li;
}

async function createRepos() {
  let data = await getData();
  let reposContainer = document.getElementById("repos-container");
  let ul = document.createElement("ul");
  ul.classList.add("repos-container-ul");
  data.forEach((item, idx) => {
    let repo = createCard(item);
    ul.appendChild(repo);
  });

  reposContainer.appendChild(ul);
}

createRepos();
