const apiKey = 'c334765a';


async function fetchMonsters() {
    try {

        const response = await fetch(`https://api.hyrule-compendium.com/v3/compendium/category/monsters`);
        const data = await response.json();
        sessionStorage.setItem('monsters', JSON.stringify(data.data || []));

        return data.data || [];
    } catch (error) {
        console.error('Error fetching monsters:', error);
        return [];
    }
}

function searchMonsters(query) {
    const monsters = JSON.parse(sessionStorage.getItem('monsters') || '[]');
    if (query.length < 3) return;
    const results = monsters.filter((monster) => monster.name.toLowerCase().includes(query.toLowerCase()));

    sessionStorage.setItem('monsters', JSON.stringify(results));

    const monsterList = document.querySelector('.monster__list');
    monsterList.innerHTML = results.map(monster => `
        <div class="monster">
            <h2>${monster.name}</h2>
            <p>Description: ${monster.description}</p>
            <figure>
                <img src="${monster.image}" alt="${monster.name}">
            </figure>
        </div>
    `).join('');


}

async function resetMonsters() {
    const monsters = await fetchMonsters();
    const monsterList = document.querySelector('.monster__list');
    monsterList.innerHTML = monsters.map(monster => `
        <div class="monster">
            <h2>${monster.name}</h2>
            <p>Description: ${monster.description}</p>
            <figure>
                <img src="${monster.image}" alt="${monster.name}">
            </figure>
        </div>
    `).join('');
}

function sortMonsters(order) {
    const monsters = JSON.parse(sessionStorage.getItem('monsters') || '[]');
    if (order === 'a-to-z') {
        monsters.sort((a, b) => a.name.localeCompare(b.name));
    } else if (order === 'z-to-a') {
        monsters.sort((a, b) => b.name.localeCompare(a.name));
    }


    const monsterList = document.querySelector('.monster__list');
    monsterList.innerHTML = monsters.map(monster => `
        <div class="monster">
            <h2>${monster.name}</h2>
            <p>Description: ${monster.description}</p>
            <figure>
                <img src="${monster.image}" alt="${monster.name}">
            </figure>
        </div>
    `).join('');
}



async function main() {
    const monsters = await fetchMonsters();
    const monsterList = document.querySelector('.monster__list');
    monsterList.innerHTML = monsters.map(monster => `
        <div class="monster">
            <h2>${monster.name}</h2>
            <p>Description: ${monster.description}</p>
            <figure>
                <img src="${monster.image}" alt="${monster.name}">
            </figure>
        </div>
    `).join('');
}

main();